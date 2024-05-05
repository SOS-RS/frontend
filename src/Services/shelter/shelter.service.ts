import { api } from "../../api";

import { IServerResponse } from "@/types";
import {
  ICreateShelter,
  IFullUpdateShelter,
  IShelter,
  IUpdateShelter,
} from "./types";

const ShelterServices = {
  create: async (payload: ICreateShelter): Promise<IShelter> => {
    const { data } = await api.post<IServerResponse<IShelter>>(
      "/shelters",
      payload
    );
    return data.data;
  },
  getAll: async (): Promise<IShelter[]> => {
    const { data } = await api.get<IServerResponse<IShelter[]>>("/shelters");
    return data.data;
  },
  update: async (id: string, payload: IUpdateShelter): Promise<IShelter> => {
    const { data } = await api.put<IServerResponse<IShelter>>(
      `/shelters/${id}`,
      payload
    );
    return data.data;
  },
  filterUpdate: async (
    id: string,
    payload: IFullUpdateShelter
  ): Promise<IShelter> => {
    const { data } = await api.put<IServerResponse<IShelter>>(
      `/shelters/${id}/admin`,
      payload
    );
    return data.data;
  },
};

export { ShelterServices };
