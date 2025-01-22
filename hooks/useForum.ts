import axiosClient from "../lib/axiosClient";
import {
  CreateCommentResponse,
  CreateThreadRequest,
  Reply,
  Thread,
  ThreadResponse,
} from "@/types/Thread";

interface UseForum {
  threads: Thread[];
  loading: boolean;
  error: string | null;
  createThread: (title: string, description: string) => Promise<Thread>;
}

interface ThreadsResponse {
  data: ThreadResponse[];
  current_page: number;
  total: number;
}

export const fetchThreads = async (): Promise<ThreadsResponse> => {
  try {
    const response = await axiosClient.get<ThreadsResponse>("/threads");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch threads");
  }
};

export const createThread = async (
  data: CreateThreadRequest
): Promise<CreateThreadRequest> => {
  try {
    const response = await axiosClient.post<CreateThreadRequest>("/threads", {
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

export interface CreateCommentRequest {
  content: string;
  thread_id: number;
  parent_id?: number | null;
}

export const createComment = async (
  data: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  try {
    const response = await axiosClient.post<CreateCommentResponse>(
      "/comments",
      {
        content: data.content,
        thread_id: data.thread_id,
        parent_id: data.parent_id || null,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create comment");
  }
};
