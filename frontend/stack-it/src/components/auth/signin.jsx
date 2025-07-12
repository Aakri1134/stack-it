import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, redirect, useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    
    const result = await loginn(email, password, role);
    if (!result.success) {
      setError(result.error);
    }
    if(result.email){
      navigate('/home');
    }
    console.log(result);
    setLoading(false);
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-background p-6 text-foreground">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader className="text-center text-2xl font-semibold">
          Welcome back
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Email"
                value={email}
            onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="pl-10 bg-muted text-foreground placeholder-muted-foreground"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="pl-10 bg-muted text-foreground placeholder-muted-foreground"
              />
            </div>
            <div className="text-right text-sm">
              <a href="#" className="text-muted-foreground hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              type="submit"
              className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </Button>

            {/* Go to Login Page button */}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => (window.location.href = "/signup")}
            >
              Go to sign up page
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
