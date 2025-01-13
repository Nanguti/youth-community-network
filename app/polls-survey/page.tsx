"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  BarChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Plus, ChevronDown } from "lucide-react";

const PollsSurveyPage = () => {
  const [activePoll, setActivePoll] = useState(0);

  const samplePolls = [
    {
      id: 1,
      question: "What feature would you like to see next?",
      totalVotes: 234,
      options: [
        { name: "Dark Mode", votes: 120 },
        { name: "Mobile App", votes: 60 },
        { name: "Voice Chat", votes: 54 },
      ],
      endDate: "2025-02-01",
    },
    {
      id: 2,
      question: "How often do you visit our platform?",
      totalVotes: 189,
      options: [
        { name: "Daily", votes: 89 },
        { name: "Weekly", votes: 65 },
        { name: "Monthly", votes: 35 },
      ],
      endDate: "2025-02-15",
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Polls & Surveys</h1>
          <p className="text-gray-600">
            Participate in community polls and see real-time results
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create New Poll
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {samplePolls.map((poll, index) => (
            <Card
              key={poll.id}
              className={`cursor-pointer transition-all ${
                activePoll === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActivePoll(index)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{poll.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{poll.totalVotes} votes</span>
                  <span>
                    Ends {new Date(poll.endDate).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={samplePolls[activePoll].options}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="votes"
                >
                  {samplePolls[activePoll].options.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PollsSurveyPage;
