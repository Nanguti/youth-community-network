import { useState, useCallback } from "react";
import { Poll, CreatePollInput, UpdatePollInput } from "@/interfaces/poll";
import axiosClient from "@/lib/axiosClient";
import { AxiosError } from "axios";

export const usePoll = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      return err.response?.data?.message || err.message;
    }
    return "An unexpected error occurred";
  };

  const fetchPolls = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosClient.get<Poll[]>("/polls");
      // Ensure data is an array
      setPolls(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(handleError(err));
      setPolls([]); // Reset polls on error
    } finally {
      setLoading(false);
    }
  }, []);

  const createPoll = useCallback(async (pollData: CreatePollInput) => {
    try {
      setLoading(true);
      setError(null);
      const { data: newPoll } = await axiosClient.post<Poll>(
        "/polls",
        pollData
      );
      setPolls((prev) => [...prev, newPoll]);
      return newPoll;
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePoll = useCallback(async (pollData: UpdatePollInput) => {
    try {
      setLoading(true);
      setError(null);
      const { data: updatedPoll } = await axiosClient.put<Poll>(
        `/polls/${pollData.id}`,
        pollData
      );
      setPolls((prev) =>
        prev.map((poll) => (poll.id === updatedPoll.id ? updatedPoll : poll))
      );
      return updatedPoll;
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePoll = useCallback(async (pollId: string) => {
    try {
      setLoading(true);
      setError(null);
      await axiosClient.delete(`/polls/${pollId}`);
      setPolls((prev) => prev.filter((poll) => poll.id !== pollId));
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const votePoll = useCallback(async (pollId: string, optionId: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data: updatedPoll } = await axiosClient.post<Poll>(
        `/polls/${pollId}/vote`,
        { optionId }
      );
      setPolls((prev) =>
        prev.map((poll) => (poll.id === updatedPoll.id ? updatedPoll : poll))
      );
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    polls,
    loading,
    error,
    fetchPolls,
    createPoll,
    updatePoll,
    deletePoll,
    votePoll,
  };
};
