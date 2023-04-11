import "../Interface/Anime ";

export interface Anime {
  id: string;
  title: string;
  image: string;
  releaseDate: string | null;
  subOrDub: "sub" | "dub";
}

export interface AnimeResults {
  currentPage: number;
  hasNextPage: boolean;
  results: Anime[];
}
