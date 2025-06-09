
import { useState, useEffect } from "react";
import { Heart, Download, Trash2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useJobTracking, UserImage } from "@/hooks/useJobTracking";
import { downloadImage } from "@/utils/imageUtils";

const UserGallery = () => {
  const { userImages, loading, toggleFavorite } = useJobTracking();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filteredImages, setFilteredImages] = useState<UserImage[]>([]);

  useEffect(() => {
    let filtered = userImages;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(image => 
        image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== "all") {
      if (filterType === "favorites") {
        filtered = filtered.filter(image => image.is_favorite);
      } else {
        filtered = filtered.filter(image => image.job_type === filterType);
      }
    }

    setFilteredImages(filtered);
  }, [userImages, searchTerm, filterType]);

  const handleDownload = (image: UserImage) => {
    downloadImage(image.image_url, `jorbo-ai-${image.id}.png`);
  };

  const handleToggleFavorite = async (image: UserImage) => {
    await toggleFavorite(image.id, !image.is_favorite);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-mim-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-mim-teal/30"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48 border-mim-teal/30">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Images</SelectItem>
            <SelectItem value="favorites">Favorites</SelectItem>
            <SelectItem value="text_to_image">Text-to-Image</SelectItem>
            <SelectItem value="image_edit">Image Edit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <Card className="cute-border">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              {userImages.length === 0 
                ? "No images generated yet. Start creating with JORBO AI!" 
                : "No images match your search criteria."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="cute-border cute-shadow group">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={image.image_url}
                    alt={image.prompt}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant={image.is_favorite ? "default" : "outline"}
                      className={`h-8 w-8 p-0 ${image.is_favorite ? 'bg-red-500 hover:bg-red-600' : ''}`}
                      onClick={() => handleToggleFavorite(image)}
                    >
                      <Heart className={`w-4 h-4 ${image.is_favorite ? 'fill-white' : ''}`} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.prompt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{image.size}</Badge>
                    <Badge variant="outline">{image.quality}</Badge>
                    <Badge variant={image.job_type === 'text_to_image' ? 'default' : 'secondary'}>
                      {image.job_type.replace('_', '-to-')}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDownload(image)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {new Date(image.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGallery;
