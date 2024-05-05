import { api } from "../../api";

import { IUpdateUser, IUser } from "./types";

const UserServices = {
  create: async (payload: IUser): Promise<IUser> => {
    const { data } = await api.post<{ message: string; data: IUser }>(
      "/users",
      payload
    );
    return data.data;
  },
  getAll: async (): Promise<IUser[]> => {
    const { data } = await api.get<{
      message: "string";
      data: IUser[];
    }>("/users");
    return data.data;
  },
  getOne: async (userId: string): Promise<IUser> => {
    const { data } = await api.get<{
      message: "string";
      data: IUser;
    }>(`/users/${userId}`);
    return data.data;
  },
  update: async (
    userId: string,
    payload: IUpdateUser
  ): Promise<{ message: string }> => {
    const { data } = await api.put<{ message: string }>(
      `/users/${userId}`,
      payload
    );
    return data;
  },
};

export { UserServices };
