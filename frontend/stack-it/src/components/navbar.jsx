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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";

const isLoggedIn = true;
const user = {
  name: "Utkarsh",
  avatar: "https://api.dicebear.com/6.x/personas/svg?seed=utkarsh",
};

const suggestions = [
  "How to implement JWT in React?",
  "Difference between useEffect and useLayoutEffect",
  "How to debounce a search input in JS",
  "React Router vs Next.js routing",
];

export default function Navbar() {
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
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
