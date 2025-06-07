
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const BACKGROUND_MEMES = [
  {
    id: 'mim-wizard-money',
    name: 'MIM Wizard Money',
    url: '/lovable-uploads/849d406f-73f2-4990-b515-77693d496e1e.png'
  },
  {
    id: 'cast-only-up',
    name: 'Cast Only Up',
    url: '/lovable-uploads/4a0fe933-d8fc-4083-81c1-b982504cc458.png'
  },
  {
    id: 'wen-wizard',
    name: 'Wen Magic',
    url: '/lovable-uploads/1fd93b82-ebe6-4487-bf4c-92f934198a7d.png'
  },
  {
    id: 'join-magic',
    name: 'Join the Magic',
    url: '/lovable-uploads/f46ff143-79c2-4313-bc21-9dc65593c897.png'
  },
  {
    id: '25-miles-magic',
    name: '25 Miles to Magic',
    url: '/lovable-uploads/549a4bd7-bbf7-4a9c-87e9-9e01ede358fb.png'
  },
  {
    id: 'more-magic',
    name: 'More Magic Please',
    url: '/lovable-uploads/4aa465de-e873-44f8-80ff-6bfbf3663c14.png'
  }
];

interface MobileBackgroundSelectorProps {
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const MobileBackgroundSelector = ({ onBackgroundSelect }: MobileBackgroundSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-blue-800/30 border-blue-500/30 text-blue-300 hover:bg-blue-700/50 h-12"
        >
          <span className="text-sm font-medium">Background Memes</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-2">
        <div className="grid grid-cols-3 gap-2">
          {BACKGROUND_MEMES.map((meme) => (
            <Button
              key={meme.id}
              onClick={() => onBackgroundSelect(meme.url)}
              className="h-16 p-1 bg-blue-800/30 hover:bg-blue-700/50 border border-blue-500/30 flex flex-col items-center justify-center"
              variant="outline"
            >
              <img 
                src={meme.url} 
                alt={meme.name}
                className="w-8 h-8 object-contain mb-1"
              />
              <span className="text-blue-200 text-xs text-center leading-tight">
                {meme.name.split(' ')[0]}
              </span>
            </Button>
          ))}
        </div>
        <p className="text-xs text-blue-400 text-center">
          Click to use as background
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileBackgroundSelector;
