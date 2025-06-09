
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMimAssetLibrary } from "@/hooks/useMimAssetLibrary";

interface MobileBackgroundSelectorProps {
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const MobileBackgroundSelector = ({ onBackgroundSelect }: MobileBackgroundSelectorProps) => {
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

  const handleBackgroundTypeChange = (value: string) => {
    setBackgroundType(value as 'all' | 'background' | 'user-generated');
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-blue-800/30 border-blue-500/30 text-blue-300 hover:bg-blue-700/50 h-12"
        >
          <span className="text-sm font-medium">Background Images</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-2">
        {/* Search and Filter Controls */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search backgrounds..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 bg-blue-800/20 border-blue-500/30 text-blue-100 text-sm h-10"
            />
          </div>
          
          <Select value={backgroundType} onValueChange={handleBackgroundTypeChange}>
            <SelectTrigger className="bg-blue-800/20 border-blue-500/30 text-blue-100 text-sm h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Backgrounds</SelectItem>
              <SelectItem value="background">MIM Backgrounds</SelectItem>
              <SelectItem value="user-generated">Your Gallery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredBackgrounds.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredBackgrounds.map((background) => (
              <Button
                key={background.id}
                onClick={() => onBackgroundSelect(background.url)}
                className="h-16 p-1 bg-blue-800/30 hover:bg-blue-700/50 border border-blue-500/30 flex flex-col items-center justify-center relative"
                variant="outline"
              >
                <img 
                  src={background.url} 
                  alt={background.name}
                  className="w-8 h-8 object-contain mb-1"
                />
                <span className="text-blue-200 text-xs text-center leading-tight">
                  {background.name.split(' ')[0]}
                </span>
                <span className="absolute top-1 right-1 text-xs">
                  {getBackgroundTypeIcon(background.type)}
                </span>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-blue-400 text-center py-4">
            No backgrounds found
          </p>
        )}
        <p className="text-xs text-blue-400 text-center">
          Click to use as background
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileBackgroundSelector;
