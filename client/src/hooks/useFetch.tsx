import { useState } from "react";
import { ResponseModel } from "../models/responseModel";
import { useToast } from "@/components/ui/use-toast";

export function useFetch() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const Fetch = async (
    route: string,
    data: unknown = null,
    method: string = "GET"
  ): Promise<ResponseModel> => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    const options: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: method !== "GET" && data ? JSON.stringify(data) : null,
    };

    try {
      const response = await fetch(`${apiUrl}${route}`, options);
      const responseData: ResponseModel = await response.json();

      if (response.ok && responseData.message) {
        toast({
          description: responseData.message,
        });
      } else if (!response.ok && responseData.message) {
        toast({
          variant: "destructive",
          description: responseData.message,
        });
      }

      return responseData;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Beklenmedik bir hata oluştu",
      });
      console.error("UseFetch error:", error);
      setError("Beklenmedik bir hata oluştu");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { Fetch, loading, error };
}
