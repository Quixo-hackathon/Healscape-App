
import { useState } from "react";
import { Play, Pause, SkipForward, ArrowLeft, Volume2, VolumeX, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface RoutineStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  image: string;
}

interface RoutinePlayerProps {
  isChildMode: boolean;
  detectedItem: string;
  onBack: () => void;
  onComplete: () => void;
}

const RoutinePlayer = ({ isChildMode, detectedItem, onBack, onComplete }: RoutinePlayerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const adultSteps: RoutineStep[] = [
    {
      id: 1,
      title: "Setup Position",
      description: `Place the ${detectedItem.toLowerCase()} in front of you. Stand with feet shoulder-width apart.`,
      duration: 30,
      image: "🏃‍♀️"
    },
    {
      id: 2,
      title: "Gentle Stretch",
      description: `Using the ${detectedItem.toLowerCase()}, perform slow, controlled movements to stretch the target area.`,
      duration: 45,
      image: "🧘‍♀️"
    },
    {
      id: 3,
      title: "Hold & Breathe",
      description: "Hold the position while taking deep, calming breaths. Focus on the relief you're feeling.",
      duration: 60,
      image: "🫁"
    },
    {
      id: 4,
      title: "Rest & Repeat",
      description: "Take a moment to rest, then repeat the movement 2-3 more times at your own pace.",
      duration: 45,
      image: "🔄"
    }
  ];

  const childSteps: RoutineStep[] = [
    {
      id: 1,
      title: "Meet Your Medicine Hero",
      description: `This is ${detectedItem}, your special health helper! They're here to make you feel better.`,
      duration: 30,
      image: "🦸‍♂️"
    },
    {
      id: 2,
      title: "The Adventure Begins",
      description: `${detectedItem} travels through your body, looking for the icky feelings to chase away!`,
      duration: 45,
      image: "🚀"
    },
    {
      id: 3,
      title: "Fighting the Yucky Germs",
      description: "Watch as your medicine hero uses their special powers to make the germs go away!",
      duration: 60,
      image: "⚡"
    },
    {
      id: 4,
      title: "Victory Celebration",
      description: "Hooray! Your medicine hero won! Now you can feel happy and healthy again!",
      duration: 30,
      image: "🎉"
    }
  ];

  const steps = isChildMode ? childSteps : adultSteps;
  const currentStepData = steps[currentStep];
  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
    } else {
      onComplete();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/50"
          >
            <ArrowLeft size={20} className="text-healscape-text-primary" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-healscape-text-primary">
              {isChildMode ? "Story Time" : "Routine Player"}
            </h1>
            <p className="text-sm text-healscape-text-secondary">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full hover:bg-white/50"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
        </div>

        <div className="bg-white rounded-3xl p-6 soft-shadow mb-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-healscape-gray-light to-healscape-gray-medium rounded-3xl flex items-center justify-center text-4xl mb-4 mx-auto">
              {currentStepData.image}
            </div>
            <h2 className="text-xl font-semibold text-healscape-text-primary mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-healscape-text-secondary leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          <div className="space-y-4">
            <Progress 
              value={progress} 
              className="w-full h-2"
            />
            
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePlayPause}
                className="rounded-full w-16 h-16 border-2 border-healscape-teal"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-healscape-text-secondary">
                {Math.floor(progress * currentStepData.duration / 100)}s
              </span>
              <span className="text-sm text-healscape-text-secondary">
                {currentStepData.duration}s
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 rounded-2xl py-3 border-healscape-gray-medium"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className={`flex-1 rounded-2xl py-3 font-medium ${
              isChildMode 
                ? "bg-healscape-coral hover:bg-healscape-coral/90" 
                : "bg-healscape-teal hover:bg-healscape-teal/90"
            }`}
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <CheckCircle size={18} className="mr-2" />
                Complete
              </>
            ) : (
              <>
                <SkipForward size={18} className="mr-2" />
                Next Step
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-4 soft-shadow">
          <h3 className="font-medium text-healscape-text-primary mb-3 text-sm">
            {isChildMode ? "Story Progress" : "Routine Progress"}
          </h3>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  index <= currentStep 
                    ? (isChildMode ? "bg-healscape-coral" : "bg-healscape-teal")
                    : "bg-healscape-gray-light"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutinePlayer;
