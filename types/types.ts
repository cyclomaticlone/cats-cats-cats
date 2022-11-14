export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
  name?: string;
};

export type Breed = {
  id: string;
  name: string;
  description: string;
  temperament: string;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  cfa_url: string;
  origin: string;
};
