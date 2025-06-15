
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  emoji: string;
}

interface RecentSectionProps {
  isChildMode: boolean;
  onItemClick: (id: string) => void;
}

const RecentSection = ({ isChildMode, onItemClick }: RecentSectionProps) => {
  const adultItems: RecentItem[] = [
    {
      id: "1",
      title: "Chair Stretch Routine",
      subtitle: "Lower back • 8 min",
      time: "2 hours ago",
      emoji: "🪑"
    },
    {
      id: "2", 
      title: "Wall Push Recovery",
      subtitle: "Shoulder tension • 5 min",
      time: "Yesterday",
      emoji: "🧱"
    },
    {
      id: "3",
      title: "Bottle Overhead Reach",
      subtitle: "Neck stiffness • 6 min", 
      time: "3 days ago",
      emoji: "🍼"
    }
  ];

  const childItems: RecentItem[] = [
    {
      id: "1",
      title: "Captain ColdBuster",
      subtitle: "Cough medicine story",
      time: "Last week",
      emoji: "🦸‍♂️"
    },
    {
      id: "2",
      title: "Vitamin Heroes",
      subtitle: "Daily vitamins adventure", 
      time: "2 weeks ago",
      emoji: "🌟"
    },
    {
      id: "3",
      title: "Tummy Trouble Solver",
      subtitle: "Stomach medicine tale",
      time: "Last month", 
      emoji: "🌈"
    }
  ];

  const items = isChildMode ? childItems : adultItems;
  const sectionTitle = isChildMode ? "Previous Stories" : "Get Back Into It";

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-healscape-text-primary">
          {sectionTitle}
        </h3>
        <Button variant="ghost" className="text-healscape-text-secondary text-sm">
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className="bg-white rounded-2xl p-4 soft-shadow card-hover cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-healscape-gray-light rounded-xl flex items-center justify-center text-xl">
                  {item.emoji}
                </div>
                <div>
                  <h4 className="font-medium text-healscape-text-primary text-sm">
                    {item.title}
                  </h4>
                  <p className="text-healscape-text-secondary text-xs">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={12} className="text-healscape-text-secondary" />
                    <span className="text-xs text-healscape-text-secondary">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
              <ArrowRight size={16} className="text-healscape-gray-medium" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSection;
