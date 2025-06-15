
import { useState } from "react";
import { ArrowLeft, Play, CheckCircle, Clock, Volume2, VolumeX, Target, Home, Calendar, TrendingUp, Share, StickyNote, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

interface Session {
  id: number;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  description: string;
}

interface Exercise {
  id: string;
  title: string;
  object: string;
  bodyPart: string;
  icon: string;
  sessions: Session[];
  completedSessions: number;
  totalSessions: number;
  painReduction: number;
  weeklyStreak: number;
}

const exerciseData: Record<string, Exercise> = {
  'tennis-ball-rolls': {
    id: 'tennis-ball-rolls',
    title: 'Tennis Ball Rolls Recovery',
    object: 'Tennis Ball',
    bodyPart: 'Foot',
    icon: '🎾',
    completedSessions: 3,
    totalSessions: 6,
    painReduction: 65,
    weeklyStreak: 4,
    sessions: [
      { id: 1, title: 'Tennis Ball Rolls', duration: '3 mins', status: 'completed', description: 'Gentle foot massage with tennis ball' },
      { id: 2, title: 'Pressure Point Release', duration: '4 mins', status: 'completed', description: 'Target specific pressure points' },
      { id: 3, title: 'Arch Stretches', duration: '3 mins', status: 'completed', description: 'Stretch the arch using ball support' },
      { id: 4, title: 'Toe Flexion', duration: '5 mins', status: 'current', description: 'Improve toe flexibility and strength' },
      { id: 5, title: 'Heel Relief', duration: '4 mins', status: 'locked', description: 'Deep heel pressure release' },
      { id: 6, title: 'Final Integration', duration: '6 mins', status: 'locked', description: 'Complete foot recovery routine' }
    ]
  },
  'towel-neck-pulls': {
    id: 'towel-neck-pulls',
    title: 'Towel Neck Pulls Recovery',
    object: 'Towel',
    bodyPart: 'Neck',
    icon: '🏃‍♀️',
    completedSessions: 2,
    totalSessions: 5,
    painReduction: 45,
    weeklyStreak: 3,
    sessions: [
      { id: 1, title: 'Gentle Neck Stretch', duration: '4 mins', status: 'completed', description: 'Basic towel-assisted neck stretches' },
      { id: 2, title: 'Side Neck Release', duration: '3 mins', status: 'completed', description: 'Target side neck tension' },
      { id: 3, title: 'Deep Towel Pulls', duration: '5 mins', status: 'current', description: 'Deeper neck decompression' },
      { id: 4, title: 'Range Improvement', duration: '4 mins', status: 'locked', description: 'Increase neck mobility' },
      { id: 5, title: 'Strength Building', duration: '6 mins', status: 'locked', description: 'Build neck stability' }
    ]
  },
  'chair-twists': {
    id: 'chair-twists',
    title: 'Chair Twists Recovery',
    object: 'Chair',
    bodyPart: 'Back',
    icon: '🪑',
    completedSessions: 4,
    totalSessions: 6,
    painReduction: 70,
    weeklyStreak: 5,
    sessions: [
      { id: 1, title: 'Basic Spinal Twist', duration: '3 mins', status: 'completed', description: 'Gentle seated spinal rotation' },
      { id: 2, title: 'Lower Back Relief', duration: '4 mins', status: 'completed', description: 'Target lower back tension' },
      { id: 3, title: 'Upper Back Stretch', duration: '3 mins', status: 'completed', description: 'Release upper back tightness' },
      { id: 4, title: 'Deep Rotation', duration: '5 mins', status: 'completed', description: 'Deeper spinal mobility work' },
      { id: 5, title: 'Strength Integration', duration: '4 mins', status: 'current', description: 'Build core stability' },
      { id: 6, title: 'Full Back Recovery', duration: '6 mins', status: 'locked', description: 'Complete back health routine' }
    ]
  },
  'wall-stretches': {
    id: 'wall-stretches',
    title: 'Wall Stretches Recovery',
    object: 'Wall',
    bodyPart: 'Back',
    icon: '🧱',
    completedSessions: 1,
    totalSessions: 4,
    painReduction: 25,
    weeklyStreak: 2,
    sessions: [
      { id: 1, title: 'Wall Push Stretch', duration: '3 mins', status: 'completed', description: 'Basic wall-assisted stretching' },
      { id: 2, title: 'Corner Chest Stretch', duration: '4 mins', status: 'current', description: 'Open chest and shoulders' },
      { id: 3, title: 'Wall Slide Exercise', duration: '5 mins', status: 'locked', description: 'Improve posture alignment' },
      { id: 4, title: 'Full Body Integration', duration: '6 mins', status: 'locked', description: 'Complete wall routine' }
    ]
  },
  'wall-pilates-1': {
    id: 'wall-pilates-1',
    title: 'Wall Pilates: Core Strength',
    object: 'Wall',
    bodyPart: 'Core',
    icon: '🧘‍♀️',
    completedSessions: 0,
    totalSessions: 3,
    painReduction: 0,
    weeklyStreak: 0,
    sessions: [
      { id: 1, title: 'Introduction to Wall Pilates', duration: '10 mins', status: 'current', description: 'Learn the basics of wall pilates for core engagement.' },
      { id: 2, title: 'Wall Crunches & Leg Lifts', duration: '15 mins', status: 'locked', description: 'Strengthen your core with wall-assisted exercises.' },
      { id: 3, title: 'Advanced Wall Core Flow', duration: '20 mins', status: 'locked', description: 'Challenge your core with a dynamic wall pilates sequence.' }
    ]
  },
  'wall-pilates-2': {
    id: 'wall-pilates-2',
    title: 'Wall Pilates: Back Pain Relief',
    object: 'Wall',
    bodyPart: 'Back',
    icon: '🧘‍♀️',
    completedSessions: 0,
    totalSessions: 3,
    painReduction: 0,
    weeklyStreak: 0,
    sessions: [
      { id: 1, title: 'Gentle Wall Stretches for Back', duration: '10 mins', status: 'current', description: 'Relieve tension with gentle wall stretches.' },
      { id: 2, title: 'Spinal Mobility with Wall', duration: '15 mins', status: 'locked', description: 'Improve spinal flexibility and reduce stiffness.' },
      { id: 3, title: 'Full Back Release Flow', duration: '20 mins', status: 'locked', description: 'A complete routine for lasting back pain relief.' }
    ]
  },
  'wall-pilates-3': {
    id: 'wall-pilates-3',
    title: 'Wall Pilates: Flexibility & Balance',
    object: 'Wall',
    bodyPart: 'Full Body',
    icon: '🧘‍♀️',
    completedSessions: 0,
    totalSessions: 3,
    painReduction: 0,
    weeklyStreak: 0,
    sessions: [
      { id: 1, title: 'Wall-Assisted Flexibility Basics', duration: '10 mins', status: 'current', description: 'Enhance your flexibility with wall support.' },
      { id: 2, title: 'Balance Challenges at the Wall', duration: '15 mins', status: 'locked', description: 'Improve your balance and stability.' },
      { id: 3, title: 'Integrated Wall Flow for Balance', duration: '20 mins', status: 'locked', description: 'A comprehensive routine for flexibility and balance.' }
    ]
  }
};

const ExerciseRecoveryDetail = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const exercise = exerciseId ? exerciseData[exerciseId] : null;

  if (!exercise) {
    navigate('/');
    return null;
  }

  const currentSession = exercise.sessions.find(s => s.status === 'current');
  const progressPercentage = (exercise.completedSessions / exercise.totalSessions) * 100;

  const handleBack = () => {
    navigate('/');
  };

  const handleStartSession = (session: Session) => {
    console.log(`Starting session: ${session.title}`);
    // This would typically navigate to the actual exercise routine
  };

  const spaces = [
    { name: 'Living Room Setup', icon: '🛋️', description: 'Comfortable seating exercises' },
    { name: 'Bedroom Routine', icon: '🛏️', description: 'Gentle morning stretches' },
    { name: 'Kitchen Counter', icon: '🍳', description: 'Quick stretch breaks' }
  ];

  return (
    <div className="min-h-screen bg-healscape-off-white">
      {/* Header */}
      <div className="bg-white p-6 soft-shadow">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-healscape-gray-light"
          >
            <ArrowLeft size={20} className="text-healscape-text-primary" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-healscape-text-secondary">
              <Share size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="text-healscape-text-secondary">
              <StickyNote size={16} />
            </Button>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{exercise.icon}</div>
          <h1 className="text-2xl font-bold text-healscape-text-primary mb-1">
            {exercise.title}
          </h1>
          <p className="text-healscape-text-secondary">Using: {exercise.object}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-healscape-text-secondary">Progress</span>
            <span className="font-medium text-healscape-text-primary">
              {exercise.completedSessions} of {exercise.totalSessions} sessions completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-healscape-gray-light">
            <div 
              className="h-full bg-gradient-to-r from-healscape-teal to-healscape-teal/80 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </Progress>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Resume/Start Next Session CTA */}
        {currentSession && (
          <Card className="p-6 bg-gradient-to-br from-healscape-teal to-healscape-teal/90 text-white border-none">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{exercise.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  {exercise.completedSessions === 0 ? 'Start Your Journey' : 'Continue Session'}
                </h3>
                <p className="text-white/90 text-sm mb-2">{currentSession.title}</p>
                <p className="text-white/80 text-xs">Duration: {currentSession.duration}</p>
              </div>
              <Button 
                onClick={() => handleStartSession(currentSession)}
                className="bg-white text-healscape-teal hover:bg-white/90"
              >
                <Play size={16} className="mr-2" />
                Start
              </Button>
            </div>
          </Card>
        )}

        {/* Session Tracker */}
        <div>
          <h2 className="text-xl font-bold text-healscape-text-primary mb-4">Recovery Sessions</h2>
          <div className="space-y-3">
            {exercise.sessions.map((session, index) => (
              <Card 
                key={session.id} 
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  session.status === 'completed' 
                    ? 'bg-healscape-gray-light border-healscape-teal/30' 
                    : session.status === 'current'
                    ? 'border-2 border-healscape-teal bg-white shadow-lg'
                    : 'bg-white border-gray-200 opacity-60'
                }`}
                onClick={() => session.status !== 'locked' && setSelectedSession(session)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    session.status === 'completed' 
                      ? 'bg-healscape-teal text-white' 
                      : session.status === 'current'
                      ? 'bg-healscape-teal/20 border-2 border-healscape-teal'
                      : 'bg-gray-200'
                  }`}>
                    {session.status === 'completed' ? (
                      <CheckCircle size={16} />
                    ) : session.status === 'current' ? (
                      <Play size={16} className="text-healscape-teal" />
                    ) : (
                      <Clock size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-healscape-text-primary">
                      Session {session.id}: {session.title}
                    </h3>
                    <p className="text-sm text-healscape-text-secondary">{session.duration}</p>
                  </div>
                  {session.status === 'current' && (
                    <div className="w-3 h-3 bg-healscape-teal rounded-full animate-pulse" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Voice Guidance Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-healscape-text-primary">Voice Guidance</h3>
              <p className="text-sm text-healscape-text-secondary">Get audio instructions during exercises</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-full ${voiceEnabled ? 'bg-healscape-teal text-white' : 'bg-gray-200'}`}
            >
              {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>
          </div>
        </Card>

        {/* Progress Analytics */}
        <div>
          <h2 className="text-xl font-bold text-healscape-text-primary mb-4">How You're Improving</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-healscape-teal mb-1">
                {exercise.painReduction}%
              </div>
              <p className="text-sm text-healscape-text-secondary">Pain Reduction</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-healscape-teal mb-1">
                {exercise.weeklyStreak}
              </div>
              <p className="text-sm text-healscape-text-secondary">Day Streak</p>
            </Card>
          </div>
          <Card className="p-4 mt-4">
            <div className="flex items-center gap-2 text-healscape-teal mb-2">
              <TrendingUp size={16} />
              <span className="font-medium">You're on track. Keep going!</span>
            </div>
            <p className="text-sm text-healscape-text-secondary">
              Your consistency is paying off. Pain levels have decreased significantly.
            </p>
          </Card>
        </div>

        {/* Transform Your Space */}
        <div>
          <h2 className="text-xl font-bold text-healscape-text-primary mb-4">Transform Your Space</h2>
          <div className="space-y-3">
            {spaces.map((space, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{space.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-healscape-text-primary">{space.name}</h3>
                    <p className="text-sm text-healscape-text-secondary">{space.description}</p>
                  </div>
                  <div className="w-2 h-2 bg-healscape-teal rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recovery Goals */}
        <div>
          <h2 className="text-xl font-bold text-healscape-text-primary mb-4">Recovery Goals</h2>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-healscape-teal" />
              <span className="font-medium text-healscape-text-primary">Contributing to your goals:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-healscape-teal text-white text-sm rounded-full">
                Pain Management
              </span>
              <span className="px-3 py-1 bg-healscape-teal text-white text-sm rounded-full">
                Mobility Improvement
              </span>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
            <Button className="w-full bg-healscape-yellow text-healscape-text-primary hover:bg-healscape-yellow/90">
               <span className="rounded-full p-2 bg-black/10 mr-2">
                 <Bell size={20} />
               </span>
               <span>Set Reminder</span>
            </Button>
            <Button className="w-full bg-healscape-yellow text-healscape-text-primary border border-healscape-light-green hover:bg-healscape-yellow/90">
               <span className="rounded-full p-2 bg-black/10 mr-2">
                 <Target size={20} />
               </span>
               <span>Change Exercise</span>
            </Button>
        </div>
      </div>

      {/* Bottom Sheet Modal for Session Details */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6 space-y-4">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-healscape-text-primary">
              {selectedSession.title}
            </h3>
            <p className="text-healscape-text-secondary">{selectedSession.description}</p>
            <div className="flex items-center gap-4 text-sm text-healscape-text-secondary">
              <span>Duration: {selectedSession.duration}</span>
              <span>Object: {exercise.object}</span>
            </div>
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSession(null)}
                className="flex-1"
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  handleStartSession(selectedSession);
                  setSelectedSession(null);
                }}
                className="flex-1 bg-healscape-teal hover:bg-healscape-teal/90"
              >
                Try This Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseRecoveryDetail;
