import { api } from "../../api";

import { IServerResponse } from "@/types";
import { ICreateUser, IUpdateUser, IUser } from "./types";

const UserServices = {
  create: async (payload: ICreateUser): Promise<string> => {
    const { data } = await api.post<{ message: string }>("/users", payload);
    return data.message;
  },
  update: async (userId: string, payload: IUpdateUser): Promise<IUser> => {
    const { data } = await api.put<IServerResponse<IUser>>(
      `/users/${userId}`,
      payload
    );
    return data.data;
  },
};

export { UserServices };
