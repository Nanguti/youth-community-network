import { useState } from "react";
import axiosClient from "../lib/axiosClient";

interface LoginResponse {
  token: string;
}

interface SignupResponse {
  token: string;
}

interface UseAuth {
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<SignupResponse>;
  loading: boolean;
  error: string | null;
}

export const useAuth = (): UseAuth => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const response = await axiosClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      // Save token in localStorage or cookies
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<SignupResponse> => {
    setLoading(true);
    try {
      const response = await axiosClient.post<SignupResponse>("/auth/signup", {
        email,
        password,
        name,
      });
      // Save token in localStorage or cookies
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading, error };
};
