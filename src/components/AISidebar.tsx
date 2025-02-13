import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Code2,
  GitBranch,
  History,
  Lightbulb,
  Settings,
} from "lucide-react";
import RefactoringPreview from "./RefactoringPreview";

interface Suggestion {
  id: string;
  type: "refactor" | "optimization" | "style";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
}

interface AISidebarProps {
  suggestions?: Suggestion[];
  onSuggestionSelect?: (suggestion: Suggestion) => void;
  selectedSuggestion?: Suggestion | null;
}

const defaultSuggestions: Suggestion[] = [
  {
    id: "1",
    type: "refactor",
    title: "Convert to arrow function",
    description:
      "Convert traditional function to arrow function for consistency",
    severity: "low",
  },
  {
    id: "2",
    type: "optimization",
    title: "Memoize component",
    description: "Add React.memo to prevent unnecessary re-renders",
    severity: "medium",
  },
  {
    id: "3",
    type: "style",
    title: "Improve variable naming",
    description: "Use more descriptive names for better code readability",
    severity: "high",
  },
];

const AISidebar = ({
  suggestions = defaultSuggestions,
  onSuggestionSelect = () => {},
  selectedSuggestion = null,
}: AISidebarProps) => {
  return (
    <div className="h-full w-full bg-background border-l border-border flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Suggestions
          </h2>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex gap-1">
            <Code2 className="h-4 w-4" />
            Code
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1">
            <GitBranch className="h-4 w-4" />
            Patterns
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1">
            <History className="h-4 w-4" />
            History
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {suggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                selectedSuggestion?.id === suggestion.id ? "border-primary" : ""
              }`}
              onClick={() => onSuggestionSelect(suggestion)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {suggestion.title}
                </h3>
                <Badge
                  variant={
                    suggestion.severity === "high" ? "destructive" : "secondary"
                  }
                >
                  {suggestion.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {suggestion.description}
              </p>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {selectedSuggestion && (
        <div className="h-[400px] p-4">
          <RefactoringPreview />
        </div>
      )}
    </div>
  );
};

export default AISidebar;
