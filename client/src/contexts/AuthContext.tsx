import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  UserLoginModel,
  UserModel,
  UserRegisterModel,
} from "../models/userModel";
import { ResponseModel } from "../models/responseModel";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: UserModel | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () => void;
  login: (formData: UserLoginModel) => Promise<void>;
  register: (formData: UserRegisterModel) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { Fetch } = useFetch();
  const { toast } = useToast();
  const router = useNavigate();

  const logOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast({
      description: "Çıkış yapıldı",
    });
    router("/login");
  };

  const login = async (formData: UserLoginModel) => {
    try {
      const responseData: ResponseModel = await Fetch(
        `auth/login`,
        formData,
        "post"
      );
      if (responseData.status) {
        const token = responseData.data;
        const decodedToken = jwtDecode(token as string);
        localStorage.setItem("token", token as string);
        localStorage.setItem("user", JSON.stringify(decodedToken));

        setUser(decodedToken as UserModel);
        setIsAuthenticated(true);
        router("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Beklenmedik bir hata",
      });
      console.error((error as Error).message);
    }
  };

  const register = async (formData: UserRegisterModel) => {
    try {
      const responseData: ResponseModel = await Fetch(
        `auth/register`,
        formData,
        "post"
      );
      if (responseData.status) {
        const token = responseData.data;
        const decodedToken = jwtDecode(token as string);
        localStorage.setItem("token", token as string);
        localStorage.setItem("user", JSON.stringify(decodedToken));

        setUser(decodedToken as UserModel);
        setIsAuthenticated(true);
        router("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Beklenmedik bir hata",
      });
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const decodedUser = JSON.parse(storedUser) as UserModel;
        setUser(decodedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error decoding stored user:");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        loading,
        logOut,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
