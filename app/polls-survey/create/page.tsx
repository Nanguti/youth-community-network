"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BarChart2, BookmarkPlus, Hash, TrendingUp, Users } from "lucide-react";
import PollForm from "@/app/components/PollForm";

// Interface for the poll data
interface PollData {
  title: string;
  description: string;
  category: string;
  options: string[];
  settings: {
    allowMultipleVotes: boolean;
    showResultsBeforeVoting: boolean;
    endDate: string;
    endTime: string;
  };
}

export default function CreatePollPage() {
  const router = useRouter();

  const handleSubmit = async (pollData: PollData) => {
    // Handle form submission here
    // You might want to make an API call to save the poll
    console.log("Poll data:", pollData);
    // Redirect after submission
    router.push("/polls-survey");
  };

  const handleClose = () => {
    router.push("/polls-survey");
  };

  return (
    <PollForm
      onSubmit={handleSubmit}
      onClose={handleClose}
      categories={[
        { id: "all", name: "All Topics", icon: Hash },
        { id: "technology", name: "Technology", icon: BarChart2 },
        { id: "health", name: "Health & Wellness", icon: Users },
        { id: "education", name: "Education", icon: BookmarkPlus },
        { id: "climate", name: "Climate Action", icon: TrendingUp },
      ]}
    />
  );
}
