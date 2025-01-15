import axiosClient from "@/lib/axiosClient";
import { Category } from "@/types/Category";

export const getCategories = async () => {
  try {
    const response = await axiosClient<Category[]>("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};
