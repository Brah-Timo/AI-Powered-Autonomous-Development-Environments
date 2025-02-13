import React from "react";
import IDELayout from "./IDELayout";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Settings, Sun, Moon } from "lucide-react";

interface HomeProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  onSettingsOpen?: () => void;
}

const Home: React.FC<HomeProps> = ({
  theme = "dark",
  onThemeToggle = () => console.log("Toggle theme"),
  onSettingsOpen = () => console.log("Open settings"),
}) => {
  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* Header */}
      <Card className="border-b rounded-none px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">AI-Powered IDE</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="text-muted-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsOpen}
              className="text-muted-foreground"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="flex-grow">
        <IDELayout />
      </div>
    </div>
  );
};

export default Home;
