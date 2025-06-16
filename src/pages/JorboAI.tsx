
import { Wand2, Image, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserGallery from "@/components/UserGallery";
import JobStatus from "@/components/JobStatus";
import { GallerySelector } from "@/components/GallerySelector";
import { MimAssetSelector } from "@/components/MimAssetSelector";
import { GenerationLimitModal } from "@/components/GenerationLimitModal";
import { GenerationStatus } from "@/components/GenerationStatus";
import DarkModeToggle from "@/components/DarkModeToggle";
import { JorboAIHeader } from "@/components/jorbo-ai/JorboAIHeader";
import { GenerationControls } from "@/components/jorbo-ai/GenerationControls";
import { GeneratedImageDisplay } from "@/components/jorbo-ai/GeneratedImageDisplay";
import { JorboAIFeatures } from "@/components/jorbo-ai/JorboAIFeatures";
import { useJorboAIState } from "@/hooks/useJorboAIState";

const JorboAI = () => {
  const {
    user,
    authLoading,
    prompt,
    setPrompt,
    selectedImages,
    setSelectedImages,
    selectedSize,
    setSelectedSize,
    selectedQuality,
    setSelectedQuality,
    showGallerySelector,
    setShowGallerySelector,
    showMimAssetSelector,
    setShowMimAssetSelector,
    showLimitModal,
    setShowLimitModal,
    galleryRefreshTrigger,
    isGenerating,
    generatedImageUrl,
    generationPhase,
    remainingGenerations,
    canGenerate,
    isOverrideUsed,
    limitsLoading,
    DAILY_LIMIT,
    handleGeneration,
    handleOverride,
    handleDownload,
    handleSignOut,
    handleGalleryImagesSelected,
    handleMimAssetsSelected,
    resetGeneration,
  } = useJorboAIState();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mim-cream via-mim-pink-light/30 to-mim-teal/20 dark:from-gray-900 dark:via-mim-pink-dark/20 dark:to-mim-teal-dark/10 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-mim-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mim-cream via-mim-pink-light/30 to-mim-teal/20 dark:from-gray-900 dark:via-mim-pink-dark/20 dark:to-mim-teal-dark/10">
      <DarkModeToggle />
      
      <div className="container mx-auto px-4 py-8">
        <JorboAIHeader userEmail={user?.email} onSignOut={handleSignOut} />

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
              <div className="space-y-6">
                <GenerationStatus
                  remainingGenerations={remainingGenerations}
                  dailyLimit={DAILY_LIMIT}
                  isOverrideUsed={isOverrideUsed()}
                  loading={limitsLoading}
                />

                <GenerationControls
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  selectedImages={selectedImages}
                  onImagesChange={setSelectedImages}
                  selectedSize={selectedSize}
                  onSizeChange={setSelectedSize}
                  selectedQuality={selectedQuality}
                  onQualityChange={setSelectedQuality}
                  isGenerating={isGenerating}
                  canGenerate={canGenerate()}
                  isOverrideUsed={isOverrideUsed()}
                  onGenerate={handleGeneration}
                  onShowGallerySelector={() => setShowGallerySelector(true)}
                  onShowMimAssetSelector={() => setShowMimAssetSelector(true)}
                />
              </div>

              <div className="space-y-6">
                <GeneratedImageDisplay
                  isGenerating={isGenerating}
                  generationPhase={generationPhase}
                  generatedImageUrl={generatedImageUrl}
                  selectedImagesCount={selectedImages.length}
                  onDownload={handleDownload}
                  onReset={resetGeneration}
                />

                <JorboAIFeatures />
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
        maxSelections={10}
        refreshTrigger={galleryRefreshTrigger}
      />

      <MimAssetSelector
        isOpen={showMimAssetSelector}
        onClose={() => setShowMimAssetSelector(false)}
        onSelectAssets={handleMimAssetsSelected}
        maxSelections={10}
      />

      <GenerationLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onOverride={handleOverride}
        remainingGenerations={remainingGenerations}
        dailyLimit={DAILY_LIMIT}
      />
    </div>
  );
};

export default JorboAI;
