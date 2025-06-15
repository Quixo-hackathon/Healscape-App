import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const goals = ["Pain Management", "Mobility Improvement", "Stress Relief", "Posture Correction"];

const ProfilePage = () => {
    const navigate = useNavigate();
    
    // Existing State
    const [role, setRole] = useState('self');
    const [pushNotifications, setPushNotifications] = useState(false);
    const [largeText, setLargeText] = useState(false);
    const [voiceover, setVoiceover] = useState(false);

    // New State
    const [name, setName] = useState('');
    const [tempName, setTempName] = useState(name);
    const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
    
    const [selectedGoals, setSelectedGoals] = useState<string[]>(['Pain Management']);
    
    const [exerciseReminders, setExerciseReminders] = useState(false);
    const [progressReports, setProgressReports] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [motionReduction, setMotionReduction] = useState(false);
    
    const [appleHealthSync, setAppleHealthSync] = useState(false);
    const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);

    const handleBack = () => navigate(-1);

    const handleGoalToggle = (goal: string) => {
        setSelectedGoals(prev => 
            prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
        );
    };
    
    const handleSaveName = async () => {
        const { error } = await updateProfile({ name: tempName });
        if (!error) {
            setName(tempName);
            setIsNameDialogOpen(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            setIsSignOutDialogOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="min-h-screen bg-healscape-off-white text-healscape-text-primary pb-20">
            <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b">
                <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Go back">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">Settings</h1>
                <div className="w-10" /> {/* Spacer for centering title */}
            </header>

            <main className="p-6 space-y-8">
                {/* Profile Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Profile</h2>
                    <div className="bg-white rounded-2xl shadow-sm">
                        <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
                            <DialogTrigger asChild>
                                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-2xl">
                                    <span className="font-medium">Name</span>
                                    <div className="flex items-center gap-2 text-healscape-text-secondary">
                                        <span>{name}</span>
                                        <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit name</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile name here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <Input
                                        id="name"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        className="col-span-3"
                                        autoFocus
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={handleSaveName}>Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>

                {/* Role Selection */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Role</h2>
                    <div className="flex bg-healscape-gray-light rounded-2xl p-1">
                        <Button
                            variant={role === 'self' ? 'default' : 'ghost'}
                            onClick={() => setRole('self')}
                            className={`flex-1 rounded-xl py-2 text-base font-medium transition-all ${
                                role === 'self' 
                                ? "bg-healscape-teal text-white shadow-sm" 
                                : "text-healscape-text-secondary hover:bg-white/50"
                            }`}
                        >
                            Self
                        </Button>
                        <Button
                            variant={role === 'parent' ? 'default' : 'ghost'}
                            onClick={() => setRole('parent')}
                            className={`flex-1 rounded-xl py-2 text-base font-medium transition-all ${
                                role === 'parent' 
                                ? "bg-healscape-teal text-white shadow-sm" 
                                : "text-healscape-text-secondary hover:bg-white/50"
                            }`}
                        >
                            Parent
                        </Button>
                        <Button
                           variant={role === 'both' ? 'default' : 'ghost'}
                           onClick={() => setRole('both')}
                           className={`flex-1 rounded-xl py-2 text-base font-medium transition-all ${
                                role === 'both' 
                               ? "bg-healscape-teal text-white shadow-sm" 
                               : "text-healscape-text-secondary hover:bg-white/50"
                           }`}
                        >
                            Both
                        </Button>
                    </div>
                </section>
                
                {/* Recovery Progress Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Recovery Progress</h2>
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-t-2xl">
                            <span className="font-medium">Daily Exercise Streak</span>
                            <div className="flex items-center gap-2 text-healscape-text-secondary">
                                <span className="text-healscape-teal font-semibold">7 days</span>
                                <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                            </div>
                        </div>
                        <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-b-2xl">
                            <span className="font-medium">Completed Sessions</span>
                             <div className="flex items-center gap-2 text-healscape-text-secondary">
                                <span className="text-healscape-teal font-semibold">23 sessions</span>
                                <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Recovery Goals Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Recovery Goals</h2>
                    <div className="flex flex-wrap gap-2">
                        {goals.map((goal) => (
                             <Button
                                key={goal}
                                onClick={() => handleGoalToggle(goal)}
                                variant={selectedGoals.includes(goal) ? 'default' : 'secondary'}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                    selectedGoals.includes(goal) 
                                    ? 'bg-healscape-teal text-white' 
                                    : 'bg-healscape-gray-light text-healscape-text-secondary hover:bg-healscape-gray-medium/50'
                                }`}
                             >
                                 {goal}
                             </Button>
                        ))}
                    </div>
                </section>

                {/* Notifications Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Notifications</h2>
                    <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Push Notifications</span>
                            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                        </div>
                        <hr className="border-healscape-gray-light" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Daily Exercise Reminders</p>
                                <p className="text-sm text-healscape-text-secondary">Get notified to stay on track</p>
                            </div>
                            <Switch checked={exerciseReminders} onCheckedChange={setExerciseReminders} />
                        </div>
                        <hr className="border-healscape-gray-light" />
                        <div className="flex items-center justify-between">
                             <div>
                                <p className="font-medium">Weekly Progress Reports</p>
                                <p className="text-sm text-healscape-text-secondary">See your recovery journey</p>
                            </div>
                            <Switch checked={progressReports} onCheckedChange={setProgressReports} />
                        </div>
                    </div>
                </section>

                {/* Accessibility Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Accessibility</h2>
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between p-4">
                            <span className="font-medium">Large Text</span>
                            <Switch checked={largeText} onCheckedChange={setLargeText} />
                        </div>
                        <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4">
                            <span className="font-medium">Voiceover</span>
                            <Switch checked={voiceover} onCheckedChange={setVoiceover} />
                        </div>
                         <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4">
                            <span className="font-medium">High Contrast Mode</span>
                            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                        </div>
                         <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4">
                            <span className="font-medium">Motion Reduction</span>
                            <Switch checked={motionReduction} onCheckedChange={setMotionReduction} />
                        </div>
                    </div>
                </section>
                
                {/* Language Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Language</h2>
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-2xl">
                            <span className="font-medium">English</span>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                    </div>
                </section>
                
                {/* Reminders Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Reminders</h2>
                     <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-t-2xl">
                            <span className="font-medium">Schedule</span>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                        <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-b-2xl">
                             <div>
                                <p className="font-medium">Target Exercise Days</p>
                                <p className="text-sm text-healscape-text-secondary">3 days per week</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                    </div>
                </section>
                
                {/* Health Integration Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Health Integration</h2>
                     <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between p-4">
                             <div>
                                <p className="font-medium">Sync with Apple Health</p>
                                <p className="text-sm text-healscape-text-secondary">Share recovery data</p>
                            </div>
                            <Switch checked={appleHealthSync} onCheckedChange={setAppleHealthSync} />
                        </div>
                        <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-b-2xl">
                            <div>
                                <p className="font-medium">Export Recovery Data</p>
                                <p className="text-sm text-healscape-text-secondary">Download your progress as PDF/CSV</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                    </div>
                </section>

                {/* Privacy & Security Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Privacy & Security</h2>
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-t-2xl">
                            <span className="font-medium">Privacy Policy</span>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                        <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-b-2xl">
                            <span className="font-medium">Terms of Service</span>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                    </div>
                </section>

                {/* Support Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Support</h2>
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-t-2xl">
                            <span className="font-medium">Help Center</span>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                        <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors">
                            <span className="font-medium">Contact Support</span>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                         <hr className="border-healscape-gray-light mx-4" />
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-b-2xl">
                            <span className="font-medium">Rate App</span>
                            <ChevronRight className="h-5 w-5 text-healscape-gray-medium" />
                        </div>
                    </div>
                </section>

                {/* Account Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 px-1">Account</h2>
                    <div className="bg-white rounded-2xl shadow-sm">
                        <Dialog open={isSignOutDialogOpen} onOpenChange={setIsSignOutDialogOpen}>
                            <DialogTrigger asChild>
                                <div className="flex items-center justify-center p-4 cursor-pointer hover:bg-healscape-gray-light transition-colors rounded-2xl">
                                    <span className="font-medium text-red-500">Sign Out</span>
                                </div>
                            </DialogTrigger>
                             <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Sign Out</DialogTitle>
                                    <DialogDescription>
                                       Are you sure you want to sign out?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                    <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;
