
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
  },
  {
    id: 'mim-is-way',
    name: 'MIM is the Way',
    url: '/lovable-uploads/e91f040a-44f2-4c34-b171-3cfd47998775.png'
  },
  {
    id: 'gmim-golden',
    name: 'GMIM Golden Magic',
    url: '/lovable-uploads/0767f171-a7a9-4a8f-871b-5643b0ae10a1.png'
  },
  {
    id: 'pixel-magic',
    name: 'Pixel Magic',
    url: '/lovable-uploads/09c6b040-c8cd-4e77-8b57-9863364ec316.png'
  },
  {
    id: 'building-defi',
    name: 'Building DeFi',
    url: '/lovable-uploads/fc68946c-623c-4d29-9c9e-1f5c348d87fc.png'
  },
  {
    id: 'chart-magic',
    name: 'Chart Magic',
    url: '/lovable-uploads/da42fa5e-a2da-45fc-a782-15ee26974ade.png'
  },
  {
    id: 'good-morning',
    name: 'Good Morning MIM',
    url: '/lovable-uploads/4ef9ea17-4aaa-40dd-92b7-5e72a1f5313b.png'
  },
  {
    id: 'alchemy-lab',
    name: 'Alchemy Lab',
    url: '/lovable-uploads/283f2977-1a2f-49c7-b063-eaf23202c1f3.png'
  },
  {
    id: 'potion-brewing',
    name: 'Potion Brewing',
    url: '/lovable-uploads/6953ac9b-9c01-471a-91e2-5439c1aca199.png'
  },
  {
    id: 'wise-forest',
    name: 'Wise Forest',
    url: '/lovable-uploads/5406383c-c11d-4328-8a46-fa725fb174fc.png'
  },
  {
    id: 'mim-conjurer',
    name: 'MIM Conjurer',
    url: '/lovable-uploads/42dfaa71-0754-41f4-83bf-c1db73884a01.png'
  },
  {
    id: 'all-mim-poker',
    name: 'All MIM Poker',
    url: '/lovable-uploads/9892e9b9-eab4-407b-a9c3-f24678d81277.png'
  },
  {
    id: 'basketball-magic',
    name: 'Basketball Magic',
    url: '/lovable-uploads/e39e2c30-7155-4d6a-b59c-7940b336f233.png'
  },
  {
    id: 'warehouse-wizard',
    name: 'Warehouse Wizard',
    url: '/lovable-uploads/93ef64eb-600b-4673-b4a7-f900acb30fed.png'
  }
];

interface BackgroundSelectorProps {
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const BackgroundSelector = ({ onBackgroundSelect }: BackgroundSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-mim-mint/20 border-mim-mint/50 text-mim-purple hover:bg-mim-mint/30 cute-border"
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
        <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-mim-teal/50 scrollbar-track-mim-cream/30">
          <div className="grid grid-cols-2 gap-2 pr-2">
            {BACKGROUND_MEMES.map((meme) => (
              <Button
                key={meme.id}
                onClick={() => onBackgroundSelect(meme.url)}
                className="h-16 p-2 bg-mim-cream/80 hover:bg-mim-pink/20 border border-mim-pink/30 flex flex-col items-center justify-center text-xs cute-border transition-all duration-200 hover:scale-105"
                variant="outline"
              >
                <img 
                  src={meme.url} 
                  alt={meme.name}
                  className="w-8 h-8 object-contain mb-1"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(255, 107, 157, 0.5))' }}
                />
                <span className="text-mim-purple truncate w-full text-center font-medium">
                  {meme.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
        <p className="text-xs text-mim-purple/70 text-center">
          Click to use as background ✨
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BackgroundSelector;
