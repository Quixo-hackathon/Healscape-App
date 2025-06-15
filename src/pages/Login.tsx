import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message || 'Failed to sign in');
        setIsLoading(false);
      }
      // No need to navigate here as the useEffect will handle it when session changes
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-healscape-off-white to-healscape-gray-light p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Button
          variant="ghost"
          className="mb-4 text-healscape-text-secondary hover:text-healscape-text-primary transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <Card className="w-full border-healscape-gray-light soft-shadow hover:shadow-md transition-all card-hover">
          <CardHeader className="space-y-2">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-healscape-teal/10 flex items-center justify-center">
                <LogIn className="h-8 w-8 text-healscape-teal" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-healscape-text-primary text-center">Welcome back</CardTitle>
            <CardDescription className="text-center text-healscape-text-primary">Sign in to your HealScape account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-healscape-text-primary font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-healscape-gray-medium focus-visible:ring-healscape-teal rounded-md transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-healscape-text-primary font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-healscape-gray-medium focus-visible:ring-healscape-teal pr-10 rounded-md transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-healscape-text-secondary hover:text-healscape-text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-healscape-teal hover:text-healscape-teal/80 hover:underline transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-100 animate-fade-in">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-healscape-teal hover:bg-healscape-teal/90 text-white font-medium py-2 rounded-md transition-all transform hover:translate-y-[-1px] active:translate-y-[1px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-healscape-gray-light pt-4">
            <div className="text-center w-full">
              <span className="text-healscape-text-secondary">Don't have an account? </span>
              <Link to="/signup" className="text-healscape-teal hover:text-healscape-teal/80 hover:underline font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;