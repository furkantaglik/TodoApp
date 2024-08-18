import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  completed: {
    label: "Tamamlandı",
    color: "hsl(var(--chart-1))",
  },
  incomplete: {
    label: "Bekleniyor",
    color: "hsl(var(--chart-2))",
  },
};

export function Chart({
  completedCount,
  incompleteCount,
}: {
  completedCount: number;
  incompleteCount: number;
}) {
  const totalCount = completedCount + incompleteCount;
  const completedPercentage = totalCount
    ? (completedCount / totalCount) * 100
    : 0;

  const chartData = [
    { name: "Tamamlandı", value: completedCount, fill: "hsl(var(--chart-5))" },
    {
      name: "Bekleniyor",
      value: incompleteCount,
      fill: "hsl(var(--chart-1))",
    },
  ];

  return (
    <Card className="flex flex-col bg-transparent border-0 w-[400px] mx-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Todo Grafiği</CardTitle>
        <CardDescription>
          Todo tamamlama oranınızı buradan takip edebilirsiniz
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <CardDescription>
          {completedPercentage > 50
            ? completedPercentage === 100
              ? "Gerçekten inanılmaz! Tamamlanan oranınız %100."
              : "Harika! Tamamlanan oranınız %50'den fazla."
            : "Tamamlama oranınız düşük görünüyor. Daha sıkı çalışmalısınız."}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
