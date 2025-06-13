
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Sparkles, Zap, Image, Download, Share2, Upload, Palette, ImagePlus, Gallery } from "lucide-react";
import { useEnhancedImageGeneration } from "@/hooks/useEnhancedImageGeneration";
import { useJobTracking } from "@/hooks/useJobTracking";
import { MultiImageUpload } from "@/components/MultiImageUpload";
import UserGallery from "@/components/UserGallery";
import MimeMeModal from "@/components/MimeMeModal";
import { GallerySelector } from "@/components/GallerySelector";
import { MimAssetSelector } from "@/components/MimAssetSelector";
import { toast } from "sonner";

const JorboAI = () => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [quality, setQuality] = useState("standard");
  const [showGallery, setShowGallery] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generationMode, setGenerationMode] = useState<'text_to_image' | 'image_edit'>('text_to_image');
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [showGallerySelector, setShowGallerySelector] = useState(false);
  const [showMimAssetSelector, setShowMimAssetSelector] = useState(false);

  const { 
    isGenerating, 
    generatedImageUrl, 
    generateImage, 
    generationPhase,
    limitExceeded,
    resetGeneration 
  } = useEnhancedImageGeneration();

  const { userImages, jobs } = useJobTracking();

  const textToImagePrompts = [
    "A magical wizard casting spells with glowing money coins floating around",
    "Digital art of a cryptocurrency token transforming into a mystical creature",
    "Futuristic DeFi trading interface with magical elements and floating charts",
    "A wise owl wearing a wizard hat, surrounded by blockchain symbols",
    "Magical internet money flowing through cyberspace like golden streams"
  ];

  const imageEditPrompts = [
    "Transform this into a magical fantasy scene with sparkles and ethereal lighting",
    "Add cyberpunk neon effects and futuristic elements to this image",
    "Convert this to a dreamy watercolor painting style",
    "Add magical creatures and mystical elements around the main subject",
    "Transform the background into a cosmic space scene with stars and galaxies"
  ];

  const currentPrompts = generationMode === 'text_to_image' ? textToImagePrompts : imageEditPrompts;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }

    if (generationMode === 'image_edit' && referenceImages.length === 0) {
      toast.error("Please upload reference images for image editing mode");
      return;
    }

    await generateImage({
      prompt,
      size,
      quality,
      jobType: generationMode,
      inputImages: generationMode === 'image_edit' ? referenceImages : undefined
    });
  };

  const handleExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleEditImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowEditor(true);
  };

  const handleDownloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `jorbo-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleShareImage = (imageUrl: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'My JORBO AI Creation',
        text: 'Check out this amazing image I created with JORBO AI!',
        url: imageUrl
      });
    } else {
      navigator.clipboard.writeText(imageUrl);
      toast.success("Image URL copied to clipboard!");
    }
  };

  const handleModeChange = (mode: string) => {
    setGenerationMode(mode as 'text_to_image' | 'image_edit');
    setPrompt(""); // Clear prompt when switching modes
    if (mode === 'text_to_image') {
      setReferenceImages([]); // Clear reference images for text-to-image mode
    }
  };

  const convertUrlToFile = async (imageUrl: string, filename: string): Promise<File | null> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (blob.size > 10 * 1024 * 1024) {
        toast.error(`Image ${filename} is too large (max 10MB)`);
        return null;
      }
      
      const file = new File([blob], filename, { type: blob.type || 'image/png' });
      Object.defineProperty(file, 'source', { value: 'gallery', writable: false });
      return file;
    } catch (error) {
      console.error(`Failed to convert ${filename}:`, error);
      toast.error(`Failed to add ${filename} as reference image`);
      return null;
    }
  };

  const handleGallerySelect = async (selectedImageUrls: string[]) => {
    const maxImages = 10;
    const availableSlots = maxImages - referenceImages.length;
    
    if (selectedImageUrls.length > availableSlots) {
      toast.error(`Can only add ${availableSlots} more images (max ${maxImages} total)`);
      return;
    }

    const newFiles: File[] = [];
    for (const imageUrl of selectedImageUrls) {
      const filename = `gallery_image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.png`;
      const file = await convertUrlToFile(imageUrl, filename);
      if (file) {
        newFiles.push(file);
      }
    }

    setReferenceImages(prev => [...prev, ...newFiles]);
    setShowGallerySelector(false);
    
    if (newFiles.length > 0) {
      toast.success(`Added ${newFiles.length} image${newFiles.length !== 1 ? 's' : ''} from gallery`);
    }
  };

  const handleMimAssetSelect = (assetFiles: File[]) => {
    const maxImages = 10;
    const availableSlots = maxImages - referenceImages.length;
    
    if (assetFiles.length > availableSlots) {
      toast.error(`Can only add ${availableSlots} more images (max ${maxImages} total)`);
      return;
    }

    // Mark files as coming from MIM assets
    const markedFiles = assetFiles.map(file => {
      Object.defineProperty(file, 'source', { value: 'mim-asset', writable: false });
      return file;
    });

    setReferenceImages(prev => [...prev, ...markedFiles]);
    
    if (assetFiles.length > 0) {
      toast.success(`Added ${assetFiles.length} MIM asset${assetFiles.length !== 1 ? 's' : ''} as reference`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-neutral-50 to-background dark:from-neutral-900 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 md:space-y-8">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="p-4 md:p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-magical-pulse">
                <Wand2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                🪄 JORBO AI Magic
              </h1>
              <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Create and edit stunning images with cutting-edge AI technology
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-neutral-500 dark:text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Transform your ideas into beautiful artwork or edit existing images using our advanced AI powered by GPT-Image-1.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Generation Interface */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  AI Image Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Generation Mode Tabs */}
                <Tabs value={generationMode} onValueChange={handleModeChange}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text_to_image" className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4" />
                      Text to Image
                    </TabsTrigger>
                    <TabsTrigger value="image_edit" className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Image Editing
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text_to_image" className="space-y-4 mt-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">✨ Text to Image Mode</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Describe your vision and JORBO AI will create an entirely new image from your imagination.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="image_edit" className="space-y-4 mt-6">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🎨 Image Editing Mode</h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Upload reference images and describe how you want to transform or edit them with AI magic.
                      </p>
                    </div>
                    
                    {/* Reference Images Upload with Browse Options */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 justify-between items-center">
                        <h3 className="text-lg font-semibold">Reference Images (up to 10)</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowGallerySelector(true)}
                            disabled={isGenerating || referenceImages.length >= 10}
                            className="flex items-center gap-2"
                          >
                            <Gallery className="w-4 h-4" />
                            Browse Gallery
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowMimAssetSelector(true)}
                            disabled={isGenerating || referenceImages.length >= 10}
                            className="flex items-center gap-2"
                          >
                            <ImagePlus className="w-4 h-4" />
                            MIM Assets
                          </Button>
                        </div>
                      </div>
                      
                      <MultiImageUpload
                        images={referenceImages}
                        onImagesChange={setReferenceImages}
                        maxImages={10}
                        disabled={isGenerating}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {generationMode === 'text_to_image' ? 'Describe your image' : 'Describe how to edit your images'}
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      generationMode === 'text_to_image' 
                        ? "Enter a detailed description of the image you want to create..."
                        : "Describe how you want to transform or edit the uploaded images..."
                    }
                    className="min-h-[100px]"
                    disabled={isGenerating}
                  />
                </div>

                {/* Generation Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Image Size
                    </label>
                    <Select value={size} onValueChange={setSize} disabled={isGenerating}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
                        <SelectItem value="1536x1024">Landscape (1536x1024)</SelectItem>
                        <SelectItem value="1024x1536">Portrait (1024x1536)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quality
                    </label>
                    <Select value={quality} onValueChange={setQuality} disabled={isGenerating}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hd">High Definition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim() || (generationMode === 'image_edit' && referenceImages.length === 0)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="mr-2 w-4 h-4 animate-spin" />
                      {generationMode === 'text_to_image' ? 'Generating Magic...' : 'Editing Images...'}
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 w-4 h-4" />
                      {generationMode === 'text_to_image' ? 'Generate Image' : 'Edit Images'}
                    </>
                  )}
                </Button>

                {/* Generation Status */}
                {isGenerating && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      ✨ {generationMode === 'text_to_image' ? 'Casting Your Spell...' : 'Weaving Image Magic...'}
                    </h3>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Generation Phase:</span>
                        <span className="text-sm text-purple-600 capitalize">{generationPhase}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: generationPhase === 'connecting' ? '25%' : 
                                   generationPhase === 'generating' ? '75%' : '100%' 
                          }}
                        />
                      </div>
                      {limitExceeded && (
                        <p className="text-sm text-amber-600 mt-2">
                          ⚠️ Daily limit reached - this may be your last generation today
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Generated Image Display */}
                {generatedImageUrl && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">✨ Your AI Creation</h3>
                    <div className="relative">
                      <img 
                        src={generatedImageUrl} 
                        alt="AI Generated" 
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                      />
                      <div className="flex justify-center gap-2 mt-4">
                        <Button
                          onClick={() => handleDownloadImage(generatedImageUrl)}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="mr-2 w-4 h-4" />
                          Download
                        </Button>
                        <Button
                          onClick={() => handleEditImage(generatedImageUrl)}
                          variant="outline"
                          size="sm"
                        >
                          <Image className="mr-2 w-4 h-4" />
                          Edit Meme
                        </Button>
                        <Button
                          onClick={() => handleShareImage(generatedImageUrl)}
                          variant="outline"
                          size="sm"
                        >
                          <Share2 className="mr-2 w-4 h-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">
                  ✨ Example Prompts {generationMode === 'text_to_image' ? '(Text to Image)' : '(Image Editing)'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {currentPrompts.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left h-auto p-4 justify-start"
                      onClick={() => handleExamplePrompt(example)}
                      disabled={isGenerating}
                    >
                      <Sparkles className="mr-2 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{example}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Image className="w-6 h-6" />
                    Your AI Gallery
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setShowGallery(!showGallery)}
                  >
                    {showGallery ? 'Hide' : 'Show'} Gallery
                  </Button>
                </CardTitle>
              </CardHeader>
              {showGallery && (
                <CardContent>
                  <UserGallery />
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Selector Modal */}
      <GallerySelector
        isOpen={showGallerySelector}
        onClose={() => setShowGallerySelector(false)}
        onSelect={handleGallerySelect}
        maxSelections={10 - referenceImages.length}
      />

      {/* MIM Asset Selector Modal */}
      <MimAssetSelector
        isOpen={showMimAssetSelector}
        onClose={() => setShowMimAssetSelector(false)}
        onSelectAssets={handleMimAssetSelect}
        maxSelections={10 - referenceImages.length}
      />

      {/* Meme Editor Modal */}
      <MimeMeModal 
        isOpen={showEditor} 
        onClose={() => {
          setShowEditor(false);
          setSelectedImage(null);
        }}
        initialBackgroundImage={selectedImage}
      />

      <Footer />
    </div>
  );
};

export default JorboAI;
