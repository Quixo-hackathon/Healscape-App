
import { Play, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuggestedItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  emoji: string;
  bodyPart: string;
}

interface SuggestedSectionProps {
  isChildMode: boolean;
  onItemClick: (id: string) => void;
}

const SuggestedSection = ({ isChildMode, onItemClick }: SuggestedSectionProps) => {
  const adultItems: SuggestedItem[] = [
    {
      id: "1",
      title: "Morning Mobility Flow",
      description: "Gentle stretches using your couch and coffee table",
      duration: "12 min",
      difficulty: "Easy",
      emoji: "☀️",
      bodyPart: "Full body"
    },
    {
      id: "2",
      title: "Desk Break Relief", 
      description: "Quick exercises with your chair and water bottle",
      duration: "8 min",
      difficulty: "Easy",
      emoji: "💻",
      bodyPart: "Neck & shoulders"
    },
    {
      id: "3",
      title: "Evening Wind Down",
      description: "Relaxing stretches using pillows and wall support",
      duration: "15 min", 
      difficulty: "Gentle",
      emoji: "🌙",
      bodyPart: "Back & legs"
    }
  ];

  const childItems: SuggestedItem[] = [
    {
      id: "1",
      title: "Superhero Sleep Medicine",
      description: "How sleepy time medicine helps you have wonderful dreams",
      duration: "5 min",
      difficulty: "Fun",
      emoji: "🦸‍♀️",
      bodyPart: "Bedtime story"
    },
    {
      id: "2",
      title: "Brave Little Bandage",
      description: "The story of how bandages protect and heal our boo-boos", 
      duration: "4 min",
      difficulty: "Gentle",
      emoji: "🩹",
      bodyPart: "Healing story"
    },
    {
      id: "3",
      title: "Vitamin Adventure Quest",
      description: "Join the vitamin squad as they strengthen your body",
      duration: "6 min",
      difficulty: "Exciting",
      emoji: "💊",
      bodyPart: "Health story"
    }
  ];

  const items = isChildMode ? childItems : adultItems;
  const sectionTitle = isChildMode ? "Top Stories Loved by Kids" : "Suggested Routines";

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-healscape-text-primary">
          {sectionTitle}
        </h3>
        <Button variant="ghost" className="text-healscape-text-secondary text-sm">
          More
        </Button>
      </div>
      
      <div className="grid gap-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-3xl p-5 soft-shadow card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-healscape-gray-light to-healscape-gray-medium rounded-2xl flex items-center justify-center text-2xl">
                  {item.emoji}
                </div>
                <div>
                  <h4 className="font-semibold text-healscape-text-primary text-base">
                    {item.title}
                  </h4>
                  <p className="text-healscape-text-secondary text-sm">
                    {item.bodyPart}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-healscape-text-secondary">
                <Clock size={12} />
                <span>{item.duration}</span>
              </div>
            </div>
            
            <p className="text-healscape-text-secondary text-sm mb-4 leading-relaxed">
              {item.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={12} className="text-healscape-text-secondary" />
                <span className="text-xs text-healscape-text-secondary">
                  {item.difficulty}
                </span>
              </div>
              
              <Button 
                onClick={() => onItemClick(item.id)}
                size="sm"
                className={`rounded-xl px-4 py-2 font-medium ${
                  isChildMode 
                    ? "bg-healscape-coral hover:bg-healscape-coral/90" 
                    : "bg-healscape-teal hover:bg-healscape-teal/90"
                }`}
              >
                <Play size={14} className="mr-2" />
                {isChildMode ? "Listen" : "Start"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedSection;
