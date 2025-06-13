import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Sparkles, Zap, Image, Download, Share2 } from "lucide-react";
import { useEnhancedImageGeneration } from "@/hooks/useEnhancedImageGeneration";
import { useJobTracking } from "@/hooks/useJobTracking";
import { GenerationStatus } from "@/components/GenerationStatus";
import UserGallery from "@/components/UserGallery";
import MimeMeModal from "@/components/MimeMeModal";
import { toast } from "sonner";

const JorboAI = () => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [quality, setQuality] = useState("standard");
  const [showGallery, setShowGallery] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { 
    isGenerating, 
    generatedImageUrl, 
    generateImage, 
    generationPhase,
    limitExceeded,
    resetGeneration 
  } = useEnhancedImageGeneration();

  const { userImages, jobs } = useJobTracking();

  const examplePrompts = [
    "A magical wizard casting spells with glowing money coins floating around",
    "Digital art of a cryptocurrency token transforming into a mystical creature",
    "Futuristic DeFi trading interface with magical elements and floating charts",
    "A wise owl wearing a wizard hat, surrounded by blockchain symbols",
    "Magical internet money flowing through cyberspace like golden streams"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }

    await generateImage({
      prompt,
      size,
      quality,
      jobType: 'text_to_image'
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
                Create stunning images with cutting-edge AI technology
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-neutral-500 dark:text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Transform your ideas into beautiful artwork using our advanced AI image generation powered by GPT-Image-1.
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
                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Describe your image
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a detailed description of the image you want to create..."
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
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="mr-2 w-4 h-4 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 w-4 h-4" />
                      Generate Image
                    </>
                  )}
                </Button>

                {/* Generation Status */}
                {isGenerating && (
                  <GenerationStatus
                    phase={generationPhase}
                    limitExceeded={limitExceeded}
                  />
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
                <CardTitle className="text-xl">✨ Example Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {examplePrompts.map((example, index) => (
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
