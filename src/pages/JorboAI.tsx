import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Upload, Image, Wand2, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { validateImageFile, downloadImage } from "@/utils/imageUtils";

const JorboAI = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedSize, setSelectedSize] = useState("1024x1024");
  const [selectedQuality, setSelectedQuality] = useState("high");
  
  const { isGenerating, generatedImageUrl, generateImage, resetGeneration } = useImageGeneration();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles: File[] = [];
      
      Array.from(files).forEach(file => {
        if (validateImageFile(file)) {
          validFiles.push(file);
        } else {
          toast.error(`Invalid file: ${file.name}. Please upload images under 10MB.`);
        }
      });

      const newImages = validFiles.slice(0, 10 - selectedImages.length);
      setSelectedImages(prev => [...prev, ...newImages]);
      
      if (newImages.length > 0) {
        toast.success(`Added ${newImages.length} image(s)`);
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

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

  const handleSaveToGallery = () => {
    // This will be implemented when Supabase is connected
    toast.info("Gallery save will be available after connecting to Supabase");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mim-cream via-mim-pink-light/30 to-mim-teal/20 dark:from-gray-900 dark:via-mim-pink-dark/20 dark:to-mim-teal-dark/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
              <p className="text-muted-foreground">Image Generator</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <Card className="cute-border cute-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-mim-teal">
                  <Wand2 className="w-5 h-5" />
                  Describe Your Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe the image you want to create or edit..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none border-mim-teal/30 focus:border-mim-teal"
                />
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="cute-border cute-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-mim-teal">
                  <Upload className="w-5 h-5" />
                  Upload Images (Optional)
                  <Badge variant="secondary">{selectedImages.length}/10</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={selectedImages.length >= 10}
                    className="w-full p-3 border border-mim-teal/30 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-mim-teal file:text-white hover:file:bg-mim-teal-dark"
                  />
                  
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-mim-teal/30"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Generation Settings */}
            <Card className="cute-border cute-shadow">
              <CardHeader>
                <CardTitle className="text-mim-teal">Settings</CardTitle>
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
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High (Best)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGeneration}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-mim-teal to-mim-gold hover:from-mim-teal-dark hover:to-mim-orange text-white font-semibold py-6 text-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Image
                </>
              )}
            </Button>

            {selectedImages.length > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                ✨ You've uploaded {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} - 
                JORBO AI will use {selectedImages.length > 0 ? 'image-to-image' : 'text-to-image'} generation
              </p>
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
                {generatedImageUrl ? (
                  <div className="space-y-4">
                    <img
                      src={generatedImageUrl}
                      alt="Generated by JORBO AI"
                      className="w-full rounded-lg border border-mim-teal/30"
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
                        onClick={handleSaveToGallery}
                        variant="outline"
                        className="flex-1 border-mim-gold text-mim-gold hover:bg-mim-gold hover:text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save to Gallery
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 border-2 border-dashed border-mim-teal/30 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Your generated image will appear here</p>
                      <p className="text-sm mt-1">
                        {selectedImages.length > 0 
                          ? "Image-to-image editing mode" 
                          : "Text-to-image generation mode"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="cute-border bg-mim-cream/50 dark:bg-mim-brown/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-mim-teal">🎨 JORBO AI Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✨ Text-to-image generation</li>
                    <li>🖼️ Image-to-image editing (up to 10 images)</li>
                    <li>🎯 Multiple size and quality options</li>
                    <li>💾 Save to your personal gallery</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    Connect to Supabase for full functionality including gallery save and advanced features.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JorboAI;
