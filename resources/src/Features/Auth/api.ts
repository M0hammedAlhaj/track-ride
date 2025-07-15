import { axiosPublic } from "../../Service/axiosInstance";
import type { RegisterPayload } from "./types.ts";
import type { LoginPayload } from "./types.ts";

export const login = (payload: LoginPayload) =>
    axiosPublic.post("/users/login", payload);

export const register = (payload: RegisterPayload) => axiosPublic.post("/users/register", payload);
