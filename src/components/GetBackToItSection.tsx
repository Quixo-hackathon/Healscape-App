
import { ArrowRight, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface GetBackToItSectionProps {
  onItemClick: (id: string) => void;
}

const exercises = [
  {
    id: 'tennis-ball-rolls',
    title: "Tennis ball rolls",
    tag: "Low Pain",
    image: "/leg.png",
  },
  {
    id: 'towel-neck-pulls',
    title: "Towel neck pulls",
    tag: "Neck Pain",
    image: "/towel.png",
  },
  {
    id: 'chair-twists',
    title: "Chair Twists",
    tag: "Back Ache",
    image: "chair.png",
  },
  {
    id: 'wall-stretches',
    title: "Wall Stretches",
    tag: "Back Ache",
    image: "/recovery-image.svg",
  },
];

const GetBackToItSection = ({ onItemClick }: GetBackToItSectionProps) => {
  const navigate = useNavigate();

  const handleCardClick = (exerciseId: string) => {
    navigate(`/exercise/${exerciseId}`);
    onItemClick(exerciseId);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6 px-6">
        <h2 className="text-2xl font-bold text-healscape-text-primary">
          Get back to it
        </h2>
        <a href="#" className="flex items-center text-sm font-semibold text-healscape-teal hover:underline">
          View all <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      <Carousel opts={{ align: "start", loop: false, skipSnaps: true }} className="pl-6">
        <CarouselContent className="-ml-4">
          {exercises.map((exercise) => (
            <CarouselItem key={exercise.id} className="pl-4 basis-[60%] md:basis-1/3 lg:basis-1/4">
              <Card 
                className="overflow-hidden card-hover border-none soft-shadow bg-white rounded-2xl relative aspect-[4/5] cursor-pointer"
                onClick={() => handleCardClick(exercise.id)}
              >
                <img src={exercise.image} alt={exercise.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">{exercise.tag}</div>
                <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end">
                   <h3 className="text-white font-bold text-lg leading-tight">{exercise.title}</h3>
                   <Button size="icon" variant="ghost" className="bg-white/20 rounded-full h-10 w-10 hover:bg-white/30 shrink-0" onClick={(e) => { e.stopPropagation(); handleCardClick(exercise.id); }}>
                     <Play className="h-5 w-5 text-white" fill="white" />
                   </Button>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default GetBackToItSection;
