
import { Camera, Scan, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ScanCardProps {
  isChildMode: boolean;
  onScanClick: () => void;
}

const ScanCard = ({ isChildMode, onScanClick }: ScanCardProps) => {
  const [sliderValue, setSliderValue] = useState([0]);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (value[0] >= 95) {
      setIsCompleting(true);
      setTimeout(() => {
        onScanClick();
        setSliderValue([0]);
        setIsCompleting(false);
      }, 300);
    }
  };

  return (
    <div className="px-4 mb-8 mt-8">
      <div className="bg-white rounded-3xl p-6 soft-shadow card-hover relative"> {/* Added relative positioning */} 
        <div className="absolute inset-0 flex items-center justify-center opacity-10"> {/* Camera icon in background */} 
          <Camera size={96} className="text-healscape-gray-light" />
        </div>
        <div className="flex flex-col items-center gap-4"> {/* Changed to flex-col */} 
          {/* Removed camera placeholder div */}
          <div className="w-full"> {/* Changed to w-full to make it take full width */} 
            <h2 className="text-xl font-semibold text-healscape-text-primary mb-2">
              {isChildMode 
                ? "Let's discover what your medicine does!" 
                : "Turn your home into a recovery zone"
              }
            </h2>
            <p className="text-healscape-text-secondary mb-4 text-sm leading-relaxed">
              {isChildMode
                ? "Scan any medicine to hear a fun story about how it helps you feel better"
                : "We'll scan your space and create personalized routines using objects around you"
              }
            </p>
            
            <div className="relative">
              {/* Pill-shaped container */}
              <div className={`relative h-14 rounded-full border-2 transition-all duration-300 ${
                isChildMode 
                  ? "bg-healscape-coral/5 border-healscape-coral/20" 
                  : "bg-healscape-teal/5 border-healscape-teal/20"
              } ${isCompleting ? 'animate-pulse' : ''}`}>
                
                {/* Background fill that grows with slider */}
                <div 
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-200 ${
                    isChildMode 
                      ? "bg-healscape-coral/20" 
                      : "bg-healscape-teal/20"
                  }`}
                  style={{ width: `${sliderValue[0]}%` }}
                />
                
                {/* Text label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className={`text-sm font-medium transition-opacity duration-200 ${
                    sliderValue[0] > 50 ? 'opacity-0' : 'opacity-100'
                  } ${isChildMode ? 'text-healscape-coral' : 'text-healscape-teal'}`}>
                    {isChildMode ? "Slide to Start Story!" : "Slide to Start Scan"}
                  </span>
                  
                  {sliderValue[0] > 50 && (
                    <span className={`text-sm font-medium text-white transition-opacity duration-200 ${
                      sliderValue[0] > 50 ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {sliderValue[0] >= 95 ? "Starting..." : "Keep sliding!"}
                    </span>
                  )}
                </div>
                
                {/* Custom slider positioned absolutely */}
                <div className="absolute inset-0 px-1 py-1">
                  <Slider
                    value={sliderValue}
                    onValueChange={handleSliderChange}
                    max={100}
                    step={1}
                    className="w-full h-full [&>*]:h-full"
                  />
                </div>
              </div>
              
              {/* Sparkle effect for child mode */}
              {isChildMode && sliderValue[0] > 80 && (
                <div className="absolute -top-2 -right-2 text-healscape-coral animate-bounce">
                  ✨
                </div>
              )}
              
              {/* Success feedback */}
              {isCompleting && (
                <div className={`absolute inset-0 rounded-full flex items-center justify-center ${
                  isChildMode ? 'bg-healscape-coral' : 'bg-healscape-teal'
                } animate-scale-in`}>
                  <div className="text-white flex items-center gap-2">
                    <Scan size={20} className="animate-spin" />
                    <span className="font-medium">
                      {isChildMode ? "Creating story..." : "Starting scan..."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Removed the camera placeholder div from here */}
        </div>
      </div>
    </div>
  );
};

export default ScanCard;
