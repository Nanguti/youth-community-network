export interface PollOption {
  id?: string;
  name: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  totalVotes: number;
  options: PollOption[];
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface CreatePollInput {
  question: string;
  options: string[];
  endDate: string;
}

export interface UpdatePollInput {
  id: string;
  question?: string;
  options?: PollOption[];
  endDate?: string;
}
