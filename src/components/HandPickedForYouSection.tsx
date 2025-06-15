
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";


interface HandPickedForYouSectionProps {
    onItemClick: (id: string) => void;
}

const workouts = [
  {
    id: 'wall-pilates-1',
    duration: "30 mins",
    title: "Wall Pilates",
    subtitle: "Fix back pain with wall support!",
    image: "/workout-image.svg",
  },
  {
    id: 'wall-pilates-2',
    duration: "30 mins",
    title: "Wall Pilates",
    subtitle: "Fix back pain with wall support!",
    image: "/workout-image.svg",
  },
  {
    id: 'wall-pilates-3',
    duration: "30 mins",
    title: "Wall Pilates",
    subtitle: "Fix back pain with wall support!",
    image: "/workout-image.svg",
  },
];

const HandPickedForYouSection = ({ onItemClick }: HandPickedForYouSectionProps) => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6 px-6">
        <h2 className="text-2xl font-bold text-healscape-text-primary">
          Hand Picked for you
        </h2>
        <a href="#" className="flex items-center text-sm font-semibold text-healscape-teal hover:underline">
          View all <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      <Carousel opts={{ align: "start", loop: false, skipSnaps: true }} className="pl-6">
        <CarouselContent className="-ml-4">
          {workouts.map((workout) => (
            <CarouselItem key={workout.id} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden card-hover border-none soft-shadow bg-white rounded-2xl">
                <CardContent className="p-0">
                  <img src={workout.image} alt={workout.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-healscape-gray-medium mb-2">{workout.duration}</p>
                    <h3 className="text-lg font-bold text-healscape-text-primary mb-1 leading-tight">{workout.title}</h3>
                    <p className="text-sm text-healscape-text-secondary mb-4">{workout.subtitle}</p>
                    <Link to={`/exercise/${workout.id}`} className="w-full bg-healscape-teal hover:bg-healscape-teal/90 text-white font-bold py-3 rounded-xl text-center inline-block">Join</Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HandPickedForYouSection;
