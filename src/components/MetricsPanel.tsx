import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Code2,
  GitBranch,
} from "lucide-react";

interface MetricItem {
  label: string;
  value: number;
  change: number;
  status: "positive" | "negative" | "neutral";
}

interface CodeQualityMetric {
  category: string;
  score: number;
  issues: number;
}

interface MetricsPanelProps {
  metrics?: MetricItem[];
  codeQuality?: CodeQualityMetric[];
  commitFrequency?: number;
  activeTime?: number;
  issuesResolved?: number;
}

const defaultMetrics: MetricItem[] = [
  {
    label: "Code Coverage",
    value: 85,
    change: 2.5,
    status: "positive",
  },
  {
    label: "Build Success Rate",
    value: 92,
    change: -1.2,
    status: "negative",
  },
  {
    label: "Test Pass Rate",
    value: 88,
    change: 0,
    status: "neutral",
  },
];

const defaultCodeQuality: CodeQualityMetric[] = [
  { category: "Maintainability", score: 78, issues: 12 },
  { category: "Reliability", score: 85, issues: 8 },
  { category: "Security", score: 92, issues: 3 },
];

const MetricsPanel: React.FC<MetricsPanelProps> = ({
  metrics = defaultMetrics,
  codeQuality = defaultCodeQuality,
  commitFrequency = 4.2,
  activeTime = 6.5,
  issuesResolved = 15,
}) => {
  return (
    <Card className="h-full w-full bg-background border-border p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Metrics Dashboard</h2>
        <Badge variant="outline" className="flex gap-1 items-center">
          <Clock className="h-3 w-3" />
          Live
        </Badge>
      </div>

      <ScrollArea className="flex-grow">
        <div className="space-y-6">
          {/* Key Metrics */}
          <section>
            <h3 className="text-sm font-medium mb-4">Key Metrics</h3>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {metric.label}
                    </span>
                    <Badge
                      variant={
                        metric.status === "positive" ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </Badge>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Code Quality */}
          <section>
            <h3 className="text-sm font-medium mb-4">Code Quality Analysis</h3>
            <div className="space-y-4">
              {codeQuality.map((quality, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm">{quality.category}</p>
                    <div className="flex items-center gap-2">
                      {quality.issues > 0 ? (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {quality.issues} issues
                      </span>
                    </div>
                  </div>
                  <Progress value={quality.score} className="w-24 h-2" />
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Activity Metrics */}
          <section>
            <h3 className="text-sm font-medium mb-4">Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Commits/Day</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{commitFrequency}</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Active Hours</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{activeTime}</p>
              </Card>
            </div>
          </section>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MetricsPanel;
