import { useState, useEffect } from "react";
import axiosClient from "../lib/axiosClient";

interface Thread {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface UseForum {
  threads: Thread[];
  loading: boolean;
  error: string | null;
  createThread: (title: string, description: string) => Promise<Thread>;
}

export const useForum = (): UseForum => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<Thread[]>("/forum/threads");
      setThreads(response.data);
    } catch (err: any) {
      setError("Failed to load forum threads");
    } finally {
      setLoading(false);
    }
  };

  const createThread = async (
    title: string,
    description: string
  ): Promise<Thread> => {
    try {
      const response = await axiosClient.post<Thread>("/forum/threads", {
        title,
        description,
      });
      setThreads((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError("Failed to create thread");
      throw err;
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return { threads, loading, error, createThread };
};
