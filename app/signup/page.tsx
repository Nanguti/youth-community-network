"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState, FormEvent } from "react";
import { User } from "@/types/User";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (formData.password !== formData.password_confirmation) {
      setErrors(["Passwords do not match"]);
      return;
    }

    try {
      setLoading(true);
      const response = await axiosClient.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
      localStorage.setItem("token", response.data.token);
      if (response.data.token) {
        alert("Registration successful");
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          const apiErrors = Object.values(
            error.response.data.errors
          ).flat() as string[];
          setErrors(apiErrors);
        } else {
          setErrors([error.response?.data?.message || "Registration failed"]);
        }
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[560px] space-y-6 p-6 lg:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Hello, Welcome!</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {`Please fill in the details to sign up :)`}
          </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Kevin Wanyonyi"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nanguti@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
            </div>
            <Input
              id="password_confirmation"
              type="password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>

          <div className="flex justify-between pt-4">
            <Link
              href={"/login"}
              className="text-sm font-medium hover:text-pink-800"
            >
              Already Registered? Login
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-pink-800"
              prefetch={false}
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
