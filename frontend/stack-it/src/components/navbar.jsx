import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "../contexts/AuthContext";

import { Bell } from "lucide-react";

const dummyuser = {
  name: "Utkarsh",
  avatar: "https://api.dicebear.com/6.x/personas/svg?seed=utkarsh",
};

const suggestions = [
  "How to implement JWT in React?",
  "Difference between useEffect and useLayoutEffect",
  "How to debounce a search input in JS",
  "React Router vs Next.js routing",
];

const notifications = [
  "You got a new answer on your question",
  "New comment on your answer",
  "User JohnDoe upvoted your question",
];




export default function Navbar() {
  const [user, setUser] = useState(true);
  const { logout } = useAuth();

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
      {/* Site Name */}
      <div className="text-2xl font-extrabold">StackIt</div>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg flex-1">
        <Input
          type="text"
          placeholder="Search questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-4 pr-4 bg-muted text-foreground w-full"
        />
        {showSuggestions && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-popover shadow-md border border-border">
            {suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                onClick={() => {
                  setQuery(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        {user ? (
          <>
            {/* Bell Icon for Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                {notifications.length > 0 ? (
                  notifications.map((note, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="text-sm whitespace-normal"
                    >
                      {note}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="text-sm text-muted-foreground">
                    No new notifications
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={dummyuser.avatar} alt={dummyuser.name} />
                  <AvatarFallback>{dummyuser.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Button variant="transparent" onClick={logout}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" className="min-w-[60px]">
              Login
            </Button>
            <Button variant="outline" size="sm" className="min-w-[60px]">
              Sign Up
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
