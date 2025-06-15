
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ScanCard from "@/components/ScanCard";
import RecentSection from "@/components/RecentSection";
import SuggestedSection from "@/components/SuggestedSection";
import Scanner from "@/components/Scanner";
import RoutinePlayer from "@/components/RoutinePlayer";
import BlogSection from "@/components/BlogSection";
import GetBackToItSection from "@/components/GetBackToItSection";
import HandPickedForYouSection from "@/components/HandPickedForYouSection";
import { useAuth } from "@/contexts/AuthContext";

type AppState = "home" | "scanner" | "routine";

const Index = () => {
  const [isChildMode, setIsChildMode] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<AppState>("home");
  const [detectedItem, setDetectedItem] = useState<string>("");
  const { user, session } = useAuth();
  
  // Derive login state from session
  const isLoggedIn = !!session;
  // Get user name from user metadata or default to empty string
  const userName = user?.user_metadata?.name || "";

  const handleToggleMode = () => {
    setIsChildMode(!isChildMode);
  };

  const handleScanClick = () => {
    setCurrentScreen("scanner");
  };

  const handleScanComplete = (item: string) => {
    setDetectedItem(item);
    setCurrentScreen("routine");
  };

  const handleBack = () => {
    if (currentScreen === "routine") {
      setCurrentScreen("scanner");
    } else {
      setCurrentScreen("home");
    }
  };

  const handleRoutineComplete = () => {
    setCurrentScreen("home");
    // Show celebration message here
    console.log("Routine completed! 🎉");
  };

  const handleItemClick = (id: string) => {
    console.log("Item clicked:", id);
    // Handle navigation to item details
  };

  return (
    <div className="min-h-screen gradient-bg overflow-x-hidden">
      {currentScreen === "home" && (
        <>
          <Header 
            isChildMode={isChildMode} 
            onToggleMode={handleToggleMode}
            isLoggedIn={isLoggedIn}
            userName={userName}
          />
          
          <div className="animate-fade-in">
            {isChildMode ? (
              <>
                <ScanCard 
                  isChildMode={isChildMode} 
                  onScanClick={handleScanClick}
                />
                
                <RecentSection 
                  isChildMode={isChildMode} 
                  onItemClick={handleItemClick}
                />
                
                <SuggestedSection 
                  isChildMode={isChildMode} 
                  onItemClick={handleItemClick}
                />

                <BlogSection isChildMode={isChildMode} />
              </>
            ) : (
              <>
                <ScanCard 
                  isChildMode={isChildMode} 
                  onScanClick={handleScanClick}
                />
                <GetBackToItSection onItemClick={handleItemClick} />
                <HandPickedForYouSection onItemClick={handleItemClick} />
                <BlogSection isChildMode={isChildMode} />
              </>
            )}
          </div>
        </>
      )}

      {currentScreen === "scanner" && (
        <div className="animate-fade-in">
          <Scanner 
            isChildMode={isChildMode}
            onBack={handleBack}
            onScanComplete={handleScanComplete}
          />
        </div>
      )}

      {currentScreen === "routine" && (
        <div className="animate-fade-in">
          <RoutinePlayer 
            isChildMode={isChildMode}
            detectedItem={detectedItem}
            onBack={handleBack}
            onComplete={handleRoutineComplete}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
