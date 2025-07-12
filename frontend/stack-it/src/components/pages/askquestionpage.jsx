// src/pages/ask-question.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/texteditor";

export default function AskQuestionPage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Tags:", tags);
    // You'll capture content from TiptapEditor separately via a ref or state lift
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-1xl" htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to use useEffect in React?"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-1xl">Description</Label>
          <TiptapEditor />
        </div>

        <div className="space-y-2">
          <Label className="text-1xl" htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, hooks, javascript"
          />
        </div>

        <Button type="submit" className="mt-4">
          Post Question
        </Button>
      </form>
    </div>
  );
}
