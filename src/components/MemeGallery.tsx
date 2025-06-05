
import { Image, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MemeGallery = () => {
  const memes = [
    {
      src: "/lovable-uploads/849d406f-73f2-4990-b515-77693d496e1e.png",
      alt: "$MIM Wizard with Money Magic",
      title: "Money Magic Master"
    },
    {
      src: "/lovable-uploads/4a0fe933-d8fc-4083-81c1-b982504cc458.png",
      alt: "I Cast Only Up Spell",
      title: "Cast Only Up!"
    },
    {
      src: "/lovable-uploads/1fd93b82-ebe6-4487-bf4c-92f934198a7d.png",
      alt: "Wen Wizard Meme",
      title: "Wen Magic?"
    },
    {
      src: "/lovable-uploads/f46ff143-79c2-4313-bc21-9dc65593c897.png",
      alt: "Magic Internet Money Join Us",
      title: "Join the Magic!"
    },
    {
      src: "/lovable-uploads/549a4bd7-bbf7-4a9c-87e9-9e01ede358fb.png",
      alt: "Magic Internet Money 25 Miles",
      title: "25 Miles to Magic"
    },
    {
      src: "/lovable-uploads/4aa465de-e873-44f8-80ff-6bfbf3663c14.png",
      alt: "Y'all Got Any More Magic Internet Money",
      title: "More Magic Please!"
    }
  ];

  return (
    <section className="relative z-10 container mx-auto px-4 pb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image className="w-8 h-8 text-yellow-400" />
          <h3 className="text-4xl font-bold text-yellow-400">Epic Meme Gallery 🖼️</h3>
          <Image className="w-8 h-8 text-yellow-400" />
        </div>
        <p className="text-xl text-purple-300">The funniest $MIM memes conjured by our wizard community!</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {memes.map((meme, index) => (
          <Card key={index} className="bg-black/20 backdrop-blur-md border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
            <CardContent className="p-4">
              <div className="relative overflow-hidden rounded-lg mb-3 group">
                <img 
                  src={meme.src} 
                  alt={meme.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h4 className="text-lg font-bold text-yellow-400 text-center">{meme.title}</h4>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-purple-300 mb-4">Got more magical memes? Share them with the community! 🪄</p>
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200"
          onClick={() => window.open('https://x.com/MoralGuideline', '_blank')}
        >
          <Twitter className="mr-2" />
          Share Your Memes
          <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};

export default MemeGallery;
