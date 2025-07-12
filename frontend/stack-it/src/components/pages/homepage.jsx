// src/pages/home.jsx
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuestionCard from "@/components/questions/QuestionCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6">
      {/* Top controls */}
      <div className="flex items-center justify-start gap-4">
        {/* Ask a Question Button */}
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Ask a Question
        </Button>

        {/* Sort Dropdown */}
        <Select>
          <SelectTrigger className="w-[180px] bg-muted text-foreground">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="unanswered">Unanswered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </div>
    </div>
  );
}
