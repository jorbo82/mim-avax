
import { Button } from "@/components/ui/button";

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
  }
];

interface BackgroundSelectorProps {
  onBackgroundSelect: (backgroundUrl: string) => void;
}

const BackgroundSelector = ({ onBackgroundSelect }: BackgroundSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-purple-300 mb-2">
        Choose Background Meme
      </label>
      <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-purple-900/30">
        <div className="grid grid-cols-2 gap-2 pr-2">
          {BACKGROUND_MEMES.map((meme) => (
            <Button
              key={meme.id}
              onClick={() => onBackgroundSelect(meme.url)}
              className="h-16 p-2 bg-blue-800/30 hover:bg-blue-700/50 border border-blue-500/30 flex flex-col items-center justify-center text-xs"
              variant="outline"
            >
              <img 
                src={meme.url} 
                alt={meme.name}
                className="w-8 h-8 object-contain mb-1"
              />
              <span className="text-blue-200 truncate w-full text-center">
                {meme.name}
              </span>
            </Button>
          ))}
        </div>
      </div>
      <p className="text-xs text-blue-400 mt-2">
        Click to use as background
      </p>
    </div>
  );
};

export default BackgroundSelector;
