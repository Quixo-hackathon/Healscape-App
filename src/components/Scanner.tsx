
import { useState, useEffect, useRef } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScannerProps {
  isChildMode: boolean;
  onBack: () => void;
  onScanComplete: (detectedItem: string) => void;
}

const Scanner = ({ isChildMode, onBack, onScanComplete }: ScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedItems, setDetectedItems] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment'); // 'user' for front camera, 'environment' for back camera
  const videoRef = useRef<HTMLVideoElement>(null);

  const adultObjects = ["Chair", "Water Bottle", "Pillow", "Wall", "Table"];
  const childObjects = ["Medicine Bottle", "Vitamin Gummies", "Cough Syrup", "Band-Aid", "Thermometer"];

  const objectsToDetect = isChildMode ? childObjects : adultObjects;

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            const randomItem = objectsToDetect[Math.floor(Math.random() * objectsToDetect.length)];
            setDetectedItems([randomItem]);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isScanning, objectsToDetect]);

  const startCamera = async (mode: 'user' | 'environment') => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      // Optionally, show an error message to the user
    }
  };

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const handleStartScan = () => {
    setIsScanning(true);
    setDetectedItems([]);
    setScanProgress(0);
  };

  const handleGenerateRoutine = () => {
    if (detectedItems.length > 0) {
      onScanComplete(detectedItems[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="p-6 pt-10">
        <div className="flex items-center justify-between mb-10">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/50"
          >
            <ArrowLeft size={20} className="text-healscape-text-primary" />
          </Button>
          <h1 className="text-xl font-semibold text-healscape-text-primary">
            {isChildMode ? "Medicine Scanner" : "Environment Scanner"}
          </h1>
          <Button
            variant="ghost"
            onClick={() => setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'))}
            className="p-2 rounded-full hover:bg-white/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.76 2.75L3 12Z"/><path d="M2.9 7c9 0 11 4 11 4L2.9 7Z"/></svg>
          </Button>
        </div>

        <div className="bg-white rounded-3xl p-6 soft-shadow mb-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-healscape-text-primary mb-2">
              {isChildMode 
                ? "Point your camera at any medicine" 
                : "Scan your room for helpful objects"
              }
            </h2>
            <p className="text-healscape-text-secondary text-sm">
              {isChildMode
                ? "We'll create a fun story about how it helps you feel better"
                : "We'll identify objects that can help with your recovery routine"
              }
            </p>
          </div>

          <div className={`relative w-full h-64 bg-gradient-to-br from-healscape-gray-light to-healscape-gray-medium rounded-2xl overflow-hidden ${
            isScanning ? "scan-glow" : ""
          }`}>
            <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover rounded-2xl"></video>
            
            {isScanning && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 rounded-lg p-2">
                  <div className="w-full bg-healscape-gray-light rounded-full h-2">
                    <div 
                      className="bg-healscape-teal h-2 rounded-full transition-all duration-200"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-healscape-text-secondary mt-1 text-center">
                    Scanning... {scanProgress}%
                  </p>
                </div>
              </div>
            )}

            {detectedItems.length > 0 && (
              <div className="absolute top-4 left-4 right-4">
                {detectedItems.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-healscape-teal text-white px-3 py-2 rounded-lg flex items-center gap-2 animate-scale-in"
                  >
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">{item} detected!</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 space-y-3">
            {!isScanning && detectedItems.length === 0 && (
              <Button 
                onClick={handleStartScan}
                className={`w-full rounded-2xl py-3 font-medium ${
                  isChildMode 
                    ? "bg-healscape-coral hover:bg-healscape-coral/90" 
                    : "bg-healscape-teal hover:bg-healscape-teal/90"
                }`}
              >

                <span className="text-white">Start Scanning</span>
              </Button>
            )}

            {detectedItems.length > 0 && (
              <Button 
                onClick={handleGenerateRoutine}
                className={`w-full rounded-2xl py-3 font-medium ${
                  isChildMode 
                    ? "bg-healscape-coral hover:bg-healscape-coral/90" 
                    : "bg-healscape-teal hover:bg-healscape-teal/90"
                }`}
              >
                <CheckCircle size={18} className="mr-2 text-white" />
                <span className="text-white">{isChildMode ? "Create Story" : "Generate Routine"}</span>
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 soft-shadow">
          <h3 className="font-medium text-healscape-text-primary mb-3 text-sm">
            {isChildMode ? "Medicine we can recognize:" : "Objects we can detect:"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {objectsToDetect.map((object) => (
              <span 
                key={object}
                className="bg-healscape-gray-light text-healscape-text-secondary px-3 py-1 rounded-full text-xs"
              >
                {object}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
