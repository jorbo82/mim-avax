
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface GallerySelectorSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const GallerySelectorSearch = ({ searchTerm, onSearchChange }: GallerySelectorSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder="Search by prompt..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
