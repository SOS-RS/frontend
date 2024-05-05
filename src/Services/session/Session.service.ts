import { ISession } from "../../contexts/SessionContext/types";
import { IServerResponse } from "../../types";
import { api } from "@/api";
import { IAuthResponse, IAuthRequest } from "./types";

const SessionServices = {
  auth: async (payload: IAuthRequest): Promise<IAuthResponse> => {
    const { data } = await api.post<IServerResponse<IAuthResponse>>(
      "/session",
      payload
    );
    return data.data;
  },
  show: async (): Promise<ISession> => {
    const { data } = await api.get<IServerResponse<ISession>>("/session");
    return data.data;
  },
};

export { SessionServices };
