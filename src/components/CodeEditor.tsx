import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Settings2, Maximize2, Copy } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onSettingsClick?: () => void;
}

const defaultCode = `// Welcome to the AI-Powered IDE
function calculateSum(a: number, b: number): number {
  return a + b;
}

const result = calculateSum(10, 20);
console.log(result); // 30`;

const CodeEditor: React.FC<CodeEditorProps> = ({
  code = defaultCode,
  language = "typescript",
  onCodeChange = () => {},
  onSettingsClick = () => console.log("Settings clicked"),
}) => {
  return (
    <Card className="w-full h-full bg-background border-border flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy code</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle fullscreen</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onSettingsClick}>
                  <Settings2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editor settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-grow p-4">
        <div className="font-mono text-sm">
          <pre className="whitespace-pre-wrap">
            <code
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => onCodeChange(e.currentTarget.textContent || "")}
              className="outline-none"
            >
              {code}
            </code>
          </pre>
        </div>
      </ScrollArea>

      <div className="border-t p-2">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Line 1, Column 1</span>
          <span>UTF-8</span>
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;
