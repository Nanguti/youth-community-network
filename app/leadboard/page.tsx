"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star } from "lucide-react";
import Image from "next/image";

interface User {
  rank: number;
  name: string;
  points: number;
  badges: string[];
  avatar: string;
}

type TimeFilter = "weekly" | "monthly";

interface LeaderboardData {
  weekly: User[];
  monthly: User[];
}

const Leaderboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("weekly");

  const leaderboardData: LeaderboardData = {
    weekly: [
      {
        rank: 1,
        name: "Sarah Chen",
        points: 2840,
        badges: ["Top Contributor", "Question Master"],
        avatar: "/api/placeholder/32/32",
      },
      {
        rank: 2,
        name: "John Doe",
        points: 2560,
        badges: ["Helpful Hero"],
        avatar: "/api/placeholder/32/32",
      },
      {
        rank: 3,
        name: "Maria Garcia",
        points: 2340,
        badges: ["Rising Star"],
        avatar: "/api/placeholder/32/32",
      },
    ],
    monthly: [
      {
        rank: 1,
        name: "Alex Kim",
        points: 8920,
        badges: ["Monthly Champion"],
        avatar: "/api/placeholder/32/32",
      },
      {
        rank: 2,
        name: "Sarah Chen",
        points: 8750,
        badges: ["Top Contributor"],
        avatar: "/api/placeholder/32/32",
      },
      {
        rank: 3,
        name: "Chris Evans",
        points: 8400,
        badges: ["Consistent Contributor"],
        avatar: "/api/placeholder/32/32",
      },
    ],
  };

  const rankIcons: Record<number, React.ReactNode> = {
    1: <Trophy className="h-6 w-6 text-yellow-500" />,
    2: <Medal className="h-6 w-6 text-gray-400" />,
    3: <Medal className="h-6 w-6 text-amber-600" />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Leaderboard</h1>
        <p className="text-gray-600">Recognition for our top contributors</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant={timeFilter === "weekly" ? "default" : "outline"}
          onClick={() => setTimeFilter("weekly")}
        >
          Weekly
        </Button>
        <Button
          variant={timeFilter === "monthly" ? "default" : "outline"}
          onClick={() => setTimeFilter("monthly")}
        >
          Monthly
        </Button>
      </div>

      <div className="space-y-4">
        {leaderboardData[timeFilter].map((user) => (
          <Card
            key={user.rank}
            className="transform transition-all hover:scale-[1.01]"
          >
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex items-center justify-center w-12">
                {rankIcons[user.rank] || (
                  <Star className="h-6 w-6 text-gray-400" />
                )}
              </div>

              <Image
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />

              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold">
                  {user.points.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
