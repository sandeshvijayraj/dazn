export interface UpdateMovie {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

export interface Movie extends UpdateMovie {
  id: string;
}
