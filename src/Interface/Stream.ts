export interface Sources {
  url: string;
  quality: string;
  isM3U8: boolean;
}

export interface Headers {
  Referer: string;
  watchsb: string | null;
  "User-Agent": string | null;
}

export interface StreamResults {
  headers: Headers;
  sources: Sources[];
}
