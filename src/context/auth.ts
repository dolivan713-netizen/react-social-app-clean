import { createContext } from "react";
import type { AuthContextValue } from "../types/post";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
