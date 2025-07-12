// src/components/ui/questioncard.jsx
import { useNavigate } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function QuestionCard() {
  const navigate = useNavigate();

  const question = {
    id: "q1",
    title: "What is the difference between let, const and var in JavaScript?",
    description: (
      <p>
        I'm confused between <code>let</code>, <code>const</code>, and <code>var</code>.
        When should I use each of them?
      </p>
    ),
    tags: ["JavaScript", "ES6", "Variables"],
  };

  const handleClick = () => {
    navigate(`/question/${question.id}`);
  };

  return (
    <Card
      className="w-full cursor-pointer border-b bg-muted/60 text-foreground transition-colors hover:bg-muted"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-col gap-2 px-6 py-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold leading-snug md:text-xl">
            {question.title}
          </h3>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          {question.description}
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-md">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
