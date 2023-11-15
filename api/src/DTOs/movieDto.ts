import { Movie } from 'src/interfaces/dataModels';

export class MovieDTO {
  id: string;
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.genre = movie.genre;
    this.rating = movie.rating;
    this.streamingLink = movie.streamingLink;
  }

  json() {
    return {
      id: this.id,
      title: this.title,
      genre: this.genre,
      rating: this.rating,
      streamingLink: this.streamingLink,
    };
  }
}
