import { useState, useEffect } from "react";
import axiosClient from "../lib/axiosClient";

interface LeaderboardEntry {
  username: string;
  points: number;
  rank: number;
}

interface UseLeaderboard {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

export const useLeaderboard = (): UseLeaderboard => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<LeaderboardEntry[]>(
        "/leaderboard"
      );
      setLeaderboard(response.data);
    } catch (err: any) {
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error };
};
