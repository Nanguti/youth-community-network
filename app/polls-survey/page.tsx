"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { usePoll } from "@/hooks/usePoll";

const PollsSurveyPage = () => {
  const [activePoll, setActivePoll] = useState(0);
  const { polls, loading, error, fetchPolls, deletePoll } = usePoll();

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-500">
        Error: {error}
      </div>
    );
  }

  // Ensure polls is an array and not empty before rendering
  if (!Array.isArray(polls) || polls.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Polls & Surveys</h1>
            <p className="text-gray-600">
              Participate in community polls and see real-time results
            </p>
          </div>
          <Link href="/polls-survey/create" className="flex items-center gap-2">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Create New Poll
            </Button>
          </Link>
        </div>
        <div className="text-center py-8 text-gray-500">
          No polls available. Create your first poll!
        </div>
      </div>
    );
  }

  const handleDeletePoll = async (pollId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this poll?")) {
        await deletePoll(pollId);
        // Reset activePoll if the deleted poll was selected
        if (activePoll >= polls.length - 1) {
          setActivePoll(Math.max(0, polls.length - 2));
        }
      }
    } catch (err) {
      console.error("Failed to delete poll:", err);
      // You might want to show a toast notification here
    }
  };

  // Ensure activePoll is within bounds
  const safeActivePoll = Math.min(activePoll, polls.length - 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Polls & Surveys</h1>
          <p className="text-gray-600">
            Participate in community polls and see real-time results
          </p>
        </div>
        <Link href="/polls-survey/create" className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create New Poll
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {polls.map((poll, index) => (
            <Card
              key={poll.id}
              className={`cursor-pointer transition-all ${
                safeActivePoll === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActivePoll(index)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{poll.question}</CardTitle>
                  <div className="flex gap-2">
                    <Link href={`/polls-survey/edit/${poll.id}`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePoll(poll.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
                  data={polls[safeActivePoll]?.options ?? []}
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
                  {(polls[safeActivePoll]?.options ?? []).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
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
