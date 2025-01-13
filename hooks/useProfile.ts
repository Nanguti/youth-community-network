import { useState, useEffect } from "react";
import axiosClient from "../lib/axiosClient";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

interface UseProfile {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<UserProfile>;
}

export const useProfile = (): UseProfile => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get<UserProfile>("/profile");
      setProfile(response.data);
    } catch (err: any) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    profileData: Partial<UserProfile>
  ): Promise<UserProfile> => {
    try {
      const response = await axiosClient.put<UserProfile>(
        "/profile",
        profileData
      );
      setProfile(response.data);
      return response.data;
    } catch (err: any) {
      setError("Failed to update profile");
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, updateProfile };
};
