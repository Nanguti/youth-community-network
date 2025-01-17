import axiosClient from "../lib/axiosClient";
import { Reply, Thread } from "@/types/Thread";

interface UseForum {
  threads: Thread[];
  loading: boolean;
  error: string | null;
  createThread: (title: string, description: string) => Promise<Thread>;
}

export const fetchThreads = async () => {
  try {
    const response = await axiosClient.get<Thread[]>("/threads");
    return response.data;
  } catch (err: unknown) {
    throw err;
  } finally {
    console.log("Exit execution");
  }
};

export const createThread = async (data: Thread): Promise<Thread> => {
  try {
    const response = await axiosClient.post<Thread>("/threads", {
      title: data.title,
      category_id: data.category_id,
      content: data.content,
    });
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

export const getThread = async (id: number) => {
  try {
    const response = await axiosClient.get(`/threads/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const replyOnThread = async (data: Reply) => {
  try {
    const response = await axiosClient.post("/replies", data);
    return response;
  } catch (error) {
    throw error;
  }
};
