// src/pages/questionpage.jsx
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const dummyQuestion = {
  id: "q1",
  title: "What is the difference between let, const and var in JavaScript?",
  description: (
    <p>
      I'm confused between <code>let</code>, <code>const</code>, and <code>var</code>. When should I use each of them?
    </p>
  ),
  tags: ["JavaScript", "ES6", "Variables"],
  answers: [
    {
      id: "a1",
      body: (
        <p>
          Use <code>const</code> for constants, <code>let</code> for block-scoped variables, and avoid <code>var</code> in modern JavaScript.
        </p>
      ),
      votes: 42,
    },
    {
      id: "a2",
      body: <p><code>var</code> is function-scoped while <code>let</code> and <code>const</code> are block-scoped.</p>,
      votes: 21,
    },
  ],
};

export default function QuestionPage() {
  const { id } = useParams();
  const question = dummyQuestion; // Replace with real fetch logic later

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6">
      <Card className="w-full bg-muted/60">
        <CardHeader className="space-y-2">
          <h1 className="text-2xl font-semibold leading-tight">{question.title}</h1>
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

      <div className="space-y-4">
        {question.answers.map((ans) => (
          <Card key={ans.id} className="bg-background">
            <CardContent className="p-4 space-y-2">
              <div className="prose prose-sm max-w-none text-foreground">
                {ans.body}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{ans.votes}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
