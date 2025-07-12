import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";

export default function SignInPage() {
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
                type="email"
                className="pl-10 bg-muted text-foreground placeholder-muted-foreground"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
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
              type="submit"
              className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
