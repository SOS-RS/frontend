export interface Attributes {
  Nome: string;
  Endereco: string;
  Longitude: string;
  Latitude: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Telefone: string | null;
  nome_responsavel: string | null;
  instagramUrl: string | null;
  observacao: string | null;
}

export interface IPetsRsShelter {
  id: number;
  attributes: Attributes;
}
