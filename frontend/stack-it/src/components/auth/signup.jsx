import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-background p-6 text-foreground">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader className="text-center text-2xl font-semibold">
          Create your account
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Name"
                type="text"
                className="pl-10 bg-muted text-foreground placeholder-muted-foreground"
              />
            </div>
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
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="pl-10 bg-muted text-foreground placeholder-muted-foreground"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign Up
            </Button>
            {/* Go to Sign In Page button */}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Sign In Page
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
}
