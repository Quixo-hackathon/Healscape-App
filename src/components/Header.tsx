
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  userName?: string;
  isChildMode: boolean;
  onToggleMode: () => void;
  isLoggedIn?: boolean;
}

const Header = ({ 
  userName = "", 
  isChildMode, 
  onToggleMode, 
  isLoggedIn = false 
}: HeaderProps) => {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    // No need to redirect as the AuthContext will handle the session change
  };
  return (
    <header className="flex flex-wrap items-center justify-between p-6 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-healscape-gray-light shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <Link to="/" className="transition-transform hover:scale-105">
          <h1 className="text-2xl font-semibold text-healscape-text-primary">
            {isLoggedIn ? (
              <span className="flex items-center animate-fade-in">
                Hi <span className="font-bold mx-1">{userName}</span>
              </span>
            ) : (
              <span className="bg-gradient-to-r from-healscape-teal to-healscape-coral bg-clip-text text-transparent">HealScape</span>
            )}
          </h1>
        </Link>
      </div>
      
      <div className="flex items-center gap-4 min-w-0">
        {isLoggedIn && (
          <div className="flex bg-healscape-gray-light rounded-2xl p-1 shadow-inner">
            <Button
              variant={!isChildMode ? "default" : "ghost"}
              size="sm"
              onClick={onToggleMode}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                !isChildMode 
                  ? "bg-healscape-teal text-white shadow-sm hover:bg-healscape-teal/90" 
                  : "text-healscape-text-secondary hover:bg-white/50"
              }`}
            >
              Adult Mode
            </Button>
            <Button
              variant={isChildMode ? "default" : "ghost"}
              size="sm"
              onClick={onToggleMode}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                isChildMode 
                  ? "bg-healscape-coral text-white shadow-sm hover:bg-healscape-coral/90" 
                  : "text-healscape-text-secondary hover:bg-white/50"
              }`}
            >
              Child Mode
            </Button>
          </div>
        )}
        
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSignOut}
              className="text-healscape-text-secondary hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={16} className="mr-1" />
              Sign out
            </Button>
            <Link to="/profile" aria-label="Open profile settings">
              <div className="w-10 h-10 bg-healscape-gray-light rounded-full flex items-center justify-center cursor-pointer hover:bg-healscape-teal/10 hover:text-healscape-teal transition-all transform hover:scale-105 border border-transparent hover:border-healscape-teal/20">
                <User size={20} className="text-healscape-text-secondary" />
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 animate-fade-in">
            <Link to="/login">
              <Button variant="ghost" className="text-healscape-text-secondary hover:text-healscape-text-primary hover:bg-healscape-gray-light transition-all">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-healscape-teal hover:bg-healscape-teal/90 text-white shadow-sm hover:shadow transition-all transform hover:translate-y-[-1px] active:translate-y-[1px]">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
<img src="/path/to/new/logo.png" alt="HealScape Logo" className="h-8 w-8" />
