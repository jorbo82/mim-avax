
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Image, Wand2, Download, LogOut, History, ImageIcon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useEnhancedImageGeneration } from "@/hooks/useEnhancedImageGeneration";
import { downloadImage } from "@/utils/imageUtils";
import UserGallery from "@/components/UserGallery";
import JobStatus from "@/components/JobStatus";
import { MultiImageUpload } from "@/components/MultiImageUpload";
import { GallerySelector } from "@/components/GallerySelector";
import MagicalImageSkeleton from "@/components/MagicalImageSkeleton";

const JorboAI = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedSize, setSelectedSize] = useState("1024x1024");
  const [selectedQuality, setSelectedQuality] = useState("high");
  const [showGallerySelector, setShowGallerySelector] = useState(false);
  
  const { isGenerating, generatedImageUrl, generationPhase, generateImage, resetGeneration } = useEnhancedImageGeneration();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleGeneration = async () => {
    const jobType = selectedImages.length > 0 ? 'image_edit' : 'text_to_image';
    
    await generateImage({
      prompt,
      size: selectedSize,
      quality: selectedQuality,
      jobType,
      inputImages: selectedImages,
    });
  };

  const handleDownload = () => {
    if (generatedImageUrl) {
      downloadImage(generatedImageUrl, `jorbo-ai-${Date.now()}.png`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleGalleryImagesSelected = (imageFiles: File[]) => {
    setSelectedImages(prev => [...prev, ...imageFiles].slice(0, 10));
    toast.success(`Added ${imageFiles.length} image${imageFiles.length !== 1 ? 's' : ''} from gallery`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mim-cream via-mim-pink-light/30 to-mim-teal/20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-mim-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mim-cream via-mim-pink-light/30 to-mim-teal/20 dark:from-gray-900 dark:via-mim-pink-dark/20 dark:to-mim-teal-dark/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="text-mim-teal hover:text-mim-teal-dark"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-mim-teal to-mim-gold rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-mim-teal to-mim-gold bg-clip-text text-transparent">
                  JORBO AI
                </h1>
                <p className="text-muted-foreground">Advanced AI Image Generator</p>
                <p className="text-sm text-muted-foreground">Welcome back, {user.email}</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              My Gallery
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Job Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Controls Panel */}
              <div className="space-y-6">
                <Card className="cute-border cute-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-mim-teal">
                      <Wand2 className="w-5 h-5" />
                      Describe Your Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Describe the image you want to create or edit... e.g., 'A majestic dragon flying over a medieval castle at sunset'"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px] resize-none border-mim-teal/30 focus:border-mim-teal"
                    />
                  </CardContent>
                </Card>

                <Card className="cute-border cute-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-mim-teal">
                      <ImageIcon className="w-5 h-5" />
                      Reference Images
                      <Badge variant="secondary">{selectedImages.length}/10</Badge>
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowGallerySelector(true)}
                        className="flex items-center gap-2"
                      >
                        <Palette className="w-4 h-4" />
                        From Gallery
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MultiImageUpload
                      images={selectedImages}
                      onImagesChange={setSelectedImages}
                      maxImages={10}
                      disabled={isGenerating}
                    />
                  </CardContent>
                </Card>

                <Card className="cute-border cute-shadow">
                  <CardHeader>
                    <CardTitle className="text-mim-teal">Generation Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Image Size</label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger className="border-mim-teal/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1024x1024">Square (1024×1024)</SelectItem>
                          <SelectItem value="1536x1024">Landscape (1536×1024)</SelectItem>
                          <SelectItem value="1024x1536">Portrait (1024×1536)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Quality</label>
                      <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                        <SelectTrigger className="border-mim-teal/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Fastest)</SelectItem>
                          <SelectItem value="medium">Medium (Balanced)</SelectItem>
                          <SelectItem value="high">High (Best Quality)</SelectItem>
                          <SelectItem value="auto">Auto (AI Optimized)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleGeneration}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-mim-teal to-mim-gold hover:from-mim-teal-dark hover:to-mim-orange text-white font-semibold py-6 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                      JORBO AI is Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                {selectedImages.length > 0 && (
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      🎨 Using {selectedImages.length} reference image{selectedImages.length !== 1 ? 's' : ''} for image-to-image editing
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JORBO AI will intelligently blend and edit your reference images
                    </p>
                  </div>
                )}
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                <Card className="cute-border cute-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-mim-teal">
                      <Image className="w-5 h-5" />
                      Generated Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isGenerating ? (
                      <MagicalImageSkeleton phase={generationPhase} />
                    ) : generatedImageUrl ? (
                      <div className="space-y-4">
                        <img
                          src={generatedImageUrl}
                          alt="Generated by JORBO AI"
                          className="w-full rounded-lg border border-mim-teal/30 shadow-lg"
                        />
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleDownload}
                            variant="outline" 
                            className="flex-1 border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button 
                            onClick={resetGeneration}
                            variant="outline"
                            className="px-4"
                          >
                            New
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 border-2 border-dashed border-mim-teal/30 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p className="font-medium">Your AI masterpiece will appear here</p>
                          <p className="text-sm mt-1">
                            {selectedImages.length > 0 
                              ? "🎨 Image-to-image editing mode" 
                              : "✨ Text-to-image generation mode"}
                          </p>
                          <p className="text-xs mt-2 opacity-75">
                            Powered by JORBO AI Engine
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="cute-border bg-gradient-to-r from-mim-cream/50 to-mim-pink-light/30 dark:from-mim-brown/30 dark:to-mim-pink-dark/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <h3 className="font-semibold text-mim-teal">🚀 JORBO AI Features</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span>✨</span>
                          <span>Advanced AI Engine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🖼️</span>
                          <span>Multi-Image Editing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📊</span>
                          <span>Job Tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>💾</span>
                          <span>Smart Gallery</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <UserGallery />
          </TabsContent>

          <TabsContent value="jobs">
            <JobStatus />
          </TabsContent>
        </Tabs>
      </div>

      <GallerySelector
        isOpen={showGallerySelector}
        onClose={() => setShowGallerySelector(false)}
        onSelectImages={handleGalleryImagesSelected}
        maxSelections={5}
      />
    </div>
  );
};

export default JorboAI;
