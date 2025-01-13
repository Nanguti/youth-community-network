import { useState, useEffect } from "react";
import axiosClient from "../lib/axiosClient";

interface Poll {
  id: number;
  question: string;
  options: string[];
  responses: number[];
}

interface UsePoll {
  polls: Poll[];
  loading: boolean;
  error: string | null;
  createPoll: (question: string, options: string[]) => Promise<Poll>;
}

export const usePoll = (): UsePoll => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<Poll[]>("/polls");
      setPolls(response.data);
    } catch (err: any) {
      setError("Failed to load polls");
    } finally {
      setLoading(false);
    }
  };

  const createPoll = async (
    question: string,
    options: string[]
  ): Promise<Poll> => {
    try {
      const response = await axiosClient.post<Poll>("/polls", {
        question,
        options,
      });
      setPolls((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError("Failed to create poll");
      throw err;
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return { polls, loading, error, createPoll };
};
