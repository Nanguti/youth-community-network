"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BarChart2, BookmarkPlus, Hash, TrendingUp, Users } from "lucide-react";
import { usePoll } from "@/hooks/usePoll";
import { CreatePollInput, UpdatePollInput } from "@/interfaces/poll";
import PollForm from "@/app/components/polls/PollForm";

// Interface for the poll data
// interface PollData {
//   title: string;
//   description: string;
//   category: string;
//   options: string[];
//   settings: {
//     allowMultipleVotes: boolean;
//     showResultsBeforeVoting: boolean;
//     endDate: string;
//     endTime: string;
//   };
// }

const CreatePollPage = () => {
  const router = useRouter();
  const { createPoll } = usePoll();

  const handleSubmit = async (data: CreatePollInput | UpdatePollInput) => {
    await createPoll(data as CreatePollInput);
  };

  const handleClose = () => {
    router.push("/polls-survey");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Poll</h1>
      <div className="max-w-2xl mx-auto">
        <PollForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          categories={[
            { id: 1, name: "All Topics", icon: Hash },
            { id: 2, name: "Technology", icon: BarChart2 },
            { id: 3, name: "Health & Wellness", icon: Users },
            { id: 3, name: "Education", icon: BookmarkPlus },
            { id: 4, name: "Climate Action", icon: TrendingUp },
          ]}
        />
      </div>
    </div>
  );
};

export default CreatePollPage;
