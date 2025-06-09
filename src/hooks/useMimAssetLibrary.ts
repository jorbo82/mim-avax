
import { useState, useEffect } from 'react';
import { useJobTracking } from './useJobTracking';

export interface MimAsset {
  id: string;
  name: string;
  url: string;
  type: 'mim-character' | 'background' | 'user-generated';
  category?: string;
}

// MIM character assets from the codebase
const MIM_CHARACTER_ASSETS: MimAsset[] = [
  {
    id: 'mim-wizard-1',
    name: 'MIM Wizard',
    url: '/lovable-uploads/0413f033-5398-4a7c-af37-142cfe888dc7.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-wizard-2',
    name: 'MIM Wizard Alt',
    url: '/lovable-uploads/07c77816-0782-438d-83d8-65eae6a60c4b.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-cute-1',
    name: 'Cute MIM',
    url: '/lovable-uploads/08a94be2-cbf9-456c-ab16-a7a907308145.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-happy',
    name: 'Happy MIM',
    url: '/lovable-uploads/1f93a159-f2dc-41b1-846c-a5536787979d.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-coin',
    name: 'MIM Coin',
    url: '/lovable-uploads/21460dcc-742c-4d8c-851f-b7524728600c.png',
    type: 'mim-character',
    category: 'icons'
  },
  {
    id: 'mim-golden',
    name: 'Golden MIM',
    url: '/lovable-uploads/31b1f47b-09b9-4b42-b4d2-b1b74f43c4ca.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-sparkle',
    name: 'Sparkle MIM',
    url: '/lovable-uploads/34792e5b-91a2-44f9-9653-12d177de8af1.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-wand',
    name: 'MIM with Wand',
    url: '/lovable-uploads/38a3afcd-7179-4eb4-b934-50ed64819bcf.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-crystal',
    name: 'MIM Crystal',
    url: '/lovable-uploads/3b4ae095-2460-46bc-bdf2-16bb509742a2.png',
    type: 'mim-character',
    category: 'icons'
  },
  {
    id: 'mim-magical',
    name: 'Magical MIM',
    url: '/lovable-uploads/4180231f-60f8-4690-995f-92ddfd1fcc8d.png',
    type: 'mim-character',
    category: 'characters'
  },
  // New uploaded MIM assets
  {
    id: 'mim-wizard-staff',
    name: 'MIM Wizard with Staff',
    url: '/lovable-uploads/1f57fa3a-dd7e-431f-ad9f-72b6ce19f17f.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-magical-creature',
    name: 'Magical Creature',
    url: '/lovable-uploads/9a47cbe4-dff4-4adf-9c3e-cadc9e5d16a4.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-green-coffee',
    name: 'Green MIM with Coffee',
    url: '/lovable-uploads/cbe3577c-34e8-4aff-8b58-8b1e68af7370.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-wise-owl',
    name: 'Wise Owl',
    url: '/lovable-uploads/c42985cf-358a-42a7-99bb-d6129ac0f560.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-bartender-fish',
    name: 'Bartender Fish',
    url: '/lovable-uploads/02fa9994-9e9a-432f-9b0f-c7ce5e64cd11.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-city-cat',
    name: 'City Cat',
    url: '/lovable-uploads/d0d82955-fe79-47bb-889b-f7f0eb04c75f.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-money-octopus',
    name: 'Money Octopus',
    url: '/lovable-uploads/34bf31a1-dfa5-4910-9fd6-9e4340819ccd.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-king-chicken',
    name: 'King Chicken',
    url: '/lovable-uploads/966cf004-a4aa-4ae2-8b7a-5acc39cb90df.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-defi-pepe',
    name: 'DeFi Pepe',
    url: '/lovable-uploads/72a1654f-9437-4826-9ee1-5ad8340dedf5.png',
    type: 'mim-character',
    category: 'characters'
  },
  {
    id: 'mim-blue-cat-warrior',
    name: 'Blue Cat Warrior',
    url: '/lovable-uploads/1efc08fe-13c3-43b5-9a4b-8d6d9c1ac9af.png',
    type: 'mim-character',
    category: 'characters'
  }
];

// Background memes from the existing background selector
const BACKGROUND_ASSETS: MimAsset[] = [
  {
    id: 'mim-wizard-money',
    name: 'MIM Wizard Money',
    url: '/lovable-uploads/849d406f-73f2-4990-b515-77693d496e1e.png',
    type: 'background',
    category: 'memes'
  },
  {
    id: 'cast-only-up',
    name: 'Cast Only Up',
    url: '/lovable-uploads/4a0fe933-d8fc-4083-81c1-b982504cc458.png',
    type: 'background',
    category: 'memes'
  },
  {
    id: 'wen-wizard',
    name: 'Wen Magic',
    url: '/lovable-uploads/1fd93b82-ebe6-4487-bf4c-92f934198a7d.png',
    type: 'background',
    category: 'memes'
  },
  {
    id: 'join-magic',
    name: 'Join the Magic',
    url: '/lovable-uploads/f46ff143-79c2-4313-bc21-9dc65593c897.png',
    type: 'background',
    category: 'memes'
  },
  {
    id: 'pixel-magic',
    name: 'Pixel Magic',
    url: '/lovable-uploads/09c6b040-c8cd-4e77-8b57-9863364ec316.png',
    type: 'background',
    category: 'memes'
  },
  {
    id: 'alchemy-lab',
    name: 'Alchemy Lab',
    url: '/lovable-uploads/283f2977-1a2f-49c7-b063-eaf23202c1f3.png',
    type: 'background',
    category: 'scenes'
  },
  {
    id: 'potion-brewing',
    name: 'Potion Brewing',
    url: '/lovable-uploads/6953ac9b-9c01-471a-91e2-5439c1aca199.png',
    type: 'background',
    category: 'scenes'
  },
  {
    id: 'wise-forest',
    name: 'Wise Forest',
    url: '/lovable-uploads/5406383c-c11d-4328-8a46-fa725fb174fc.png',
    type: 'background',
    category: 'scenes'
  }
];

export const useMimAssetLibrary = () => {
  const { userImages } = useJobTracking();
  const [allAssets, setAllAssets] = useState<MimAsset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<MimAsset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Only include MIM assets and backgrounds, NOT user gallery images
    const combined = [
      ...MIM_CHARACTER_ASSETS,
      ...BACKGROUND_ASSETS
    ];

    setAllAssets(combined);
  }, []); // Remove userImages dependency to keep gallery separate

  useEffect(() => {
    let filtered = allAssets;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(asset => 
        asset.type === selectedCategory || asset.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAssets(filtered);
  }, [allAssets, selectedCategory, searchTerm]);

  const getAssetsByType = (type: MimAsset['type']) => {
    return allAssets.filter(asset => asset.type === type);
  };

  // Remove 'user-generated' from categories since we're keeping gallery separate
  const categories = ['all', 'mim-character', 'background'];

  return {
    allAssets,
    filteredAssets,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    getAssetsByType,
    categories,
    mimCharacters: getAssetsByType('mim-character'),
    backgrounds: getAssetsByType('background'),
    userGenerated: [] // Empty since we're keeping gallery separate
  };
};
