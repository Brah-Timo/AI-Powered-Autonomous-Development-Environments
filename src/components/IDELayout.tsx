import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import CodeEditor from "./CodeEditor";
import MetricsPanel from "./MetricsPanel";
import AISidebar from "./AISidebar";

interface IDELayoutProps {
  defaultLayout?: number[];
  onLayoutChange?: (sizes: number[]) => void;
  showMetrics?: boolean;
  showAISidebar?: boolean;
}

const IDELayout: React.FC<IDELayoutProps> = ({
  defaultLayout = [50, 25, 25],
  onLayoutChange = () => {},
  showMetrics = true,
  showAISidebar = true,
}) => {
  return (
    <div className="h-full w-full bg-background">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={onLayoutChange}
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <CodeEditor />
        </ResizablePanel>

        {showMetrics && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={20}>
              <MetricsPanel />
            </ResizablePanel>
          </>
        )}

        {showAISidebar && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={defaultLayout[2]} minSize={20}>
              <AISidebar />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default IDELayout;
