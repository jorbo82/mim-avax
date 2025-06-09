
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMimAssetLibrary } from "@/hooks/useMimAssetLibrary";

interface BackgroundSelectorProps {
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const BackgroundSelector = ({ onBackgroundSelect }: BackgroundSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [backgroundType, setBackgroundType] = useState<'all' | 'background' | 'user-generated'>('all');
  
  const { backgrounds, userGenerated } = useMimAssetLibrary();

  // Combine and filter backgrounds
  const allBackgrounds = backgroundType === 'all' 
    ? [...backgrounds, ...userGenerated]
    : backgroundType === 'background' 
      ? backgrounds 
      : userGenerated;

  const filteredBackgrounds = allBackgrounds.filter(bg =>
    bg.name.toLowerCase().includes(localSearch.toLowerCase())
  );

  const getBackgroundTypeIcon = (type: string) => {
    return type === 'user-generated' ? '🎨' : '🖼️';
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-mim-mint/20 border-mim-mint/50 text-mim-purple hover:bg-mim-mint/30 cute-border"
        >
          <span className="text-sm font-medium">Background Images</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 mt-2">
        {/* Search and Filter Controls */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search backgrounds..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 border-mim-mint/30 focus:border-mim-mint text-sm"
            />
          </div>
          
          <Select value={backgroundType} onValueChange={setBackgroundType}>
            <SelectTrigger className="border-mim-mint/30 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Backgrounds</SelectItem>
              <SelectItem value="background">MIM Backgrounds</SelectItem>
              <SelectItem value="user-generated">Your Gallery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Backgrounds Grid */}
        <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-mim-teal/50 scrollbar-track-mim-cream/30">
          {filteredBackgrounds.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 pr-2">
              {filteredBackgrounds.map((background) => (
                <Button
                  key={background.id}
                  onClick={() => onBackgroundSelect(background.url)}
                  className="h-16 p-2 bg-mim-cream/80 hover:bg-mim-pink/20 border border-mim-pink/30 flex flex-col items-center justify-center text-xs cute-border transition-all duration-200 hover:scale-105 relative"
                  variant="outline"
                >
                  <img 
                    src={background.url} 
                    alt={background.name}
                    className="w-8 h-8 object-contain mb-1"
                    style={{ filter: 'drop-shadow(0 0 2px rgba(255, 107, 157, 0.5))' }}
                  />
                  <span className="text-mim-purple truncate w-full text-center font-medium">
                    {background.name}
                  </span>
                  <span className="absolute top-1 right-1 text-xs">
                    {getBackgroundTypeIcon(background.type)}
                  </span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-mim-purple/70">
              <p className="text-sm">No backgrounds found</p>
              <p className="text-xs mt-1">Try adjusting your search or type</p>
            </div>
          )}
        </div>
        
        <p className="text-xs text-mim-purple/70 text-center">
          Click to use as background ✨
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BackgroundSelector;
