import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
}

interface RefactoringPreviewProps {
  originalCode?: string;
  refactoredCode?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

const defaultCode = `function example() {
  let x = 1;
  let y = 2;
  return x + y;
}`;

const generateDiffLines = (
  original: string,
  refactored: string,
): DiffLine[] => {
  const originalLines = original.split("\n");
  const refactoredLines = refactored.split("\n");
  const diffLines: DiffLine[] = [];

  // This is a simplified diff visualization
  originalLines.forEach((line, i) => {
    if (line !== refactoredLines[i]) {
      diffLines.push({ type: "removed", content: line });
      if (refactoredLines[i]) {
        diffLines.push({ type: "added", content: refactoredLines[i] });
      }
    } else {
      diffLines.push({ type: "unchanged", content: line });
    }
  });

  // Add any remaining new lines
  if (refactoredLines.length > originalLines.length) {
    for (let i = originalLines.length; i < refactoredLines.length; i++) {
      diffLines.push({ type: "added", content: refactoredLines[i] });
    }
  }

  return diffLines;
};

const RefactoringPreview: React.FC<RefactoringPreviewProps> = ({
  originalCode = defaultCode,
  refactoredCode = defaultCode.replace("let", "const"),
  onAccept = () => console.log("Accepted refactoring"),
  onReject = () => console.log("Rejected refactoring"),
}) => {
  const diffLines = generateDiffLines(originalCode, refactoredCode);

  return (
    <Card className="w-full h-full bg-background border-border p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Refactoring Preview</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReject}
            className="text-destructive hover:text-destructive/90"
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onAccept}
            className="text-primary-foreground"
          >
            <Check className="h-4 w-4 mr-1" />
            Accept
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-grow border rounded-md bg-muted/5">
        <div className="p-4 font-mono text-sm">
          {diffLines.map((line, index) => (
            <div
              key={index}
              className={`flex items-start ${
                line.type === "added"
                  ? "bg-green-500/10 text-green-500"
                  : line.type === "removed"
                    ? "bg-red-500/10 text-red-500"
                    : ""
              }`}
            >
              <span className="w-6 text-muted-foreground select-none">
                {line.type === "added"
                  ? "+"
                  : line.type === "removed"
                    ? "-"
                    : " "}
              </span>
              <pre className="flex-1 whitespace-pre-wrap">{line.content}</pre>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default RefactoringPreview;
