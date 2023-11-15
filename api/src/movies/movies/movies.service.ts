import { HttpException, Injectable } from '@nestjs/common';
import { MovieDTO } from 'src/DTOs/movieDto';
import { MongoDB } from 'src/connectors/mongoDB';
import { Movie, UpdateMovie } from 'src/interfaces/dataModels';
import { uuid } from 'uuidv4';

@Injectable()
export class MoviesService {
  mongoConnector: MongoDB;
  constructor() {
    this.mongoConnector = new MongoDB();
  }
  async getAllMovies(): Promise<Movie[]> {
    return this.mongoConnector.findAll('movies', {});
  }

  async getMovie(movieId: string): Promise<Movie> {
    const data = await this.mongoConnector.find('movies', {
      id: movieId,
    });
    if (!data) {
      throw new HttpException(
        { message: `Movie with id ${movieId} doesn't exits` },
        404,
      );
    }
    return new MovieDTO(data).json();
  }

  async updateMovie(movieId: string, updateItem: UpdateMovie): Promise<Movie> {
    const record = await this.mongoConnector.find('movies', {
      id: movieId,
    });

    if (!record) {
      throw new HttpException(
        { message: `Movie with id ${movieId} doesn't exits` },
        404,
      );
    }
    const newRecord = new MovieDTO({ ...updateItem, id: movieId });
    this.mongoConnector.update('movies', newRecord);
    return newRecord.json();
  }

  async createMovie(
    data: UpdateMovie,
    userDetails: { id: string; email: string },
  ): Promise<Movie> {
    const res = await this.mongoConnector.find('users', {
      email: userDetails.email,
    });
    if (!res) {
      throw new HttpException(
        { message: 'You are not authorised fo rthis opeartion' },
        401,
      );
    }
    const newId = uuid();
    const newRecord = new MovieDTO({ ...data, id: newId }).json();
    await this.mongoConnector.add('movies', newRecord);
    return newRecord;
  }

  async deleteMovie(id: string, userDetails: { id: string; email: string }) {
    const res = await this.mongoConnector.find('users', {
      email: userDetails.email,
    });
    if (!res) {
      throw new HttpException(
        { message: 'You are not authorised fo rthis opeartion' },
        401,
      );
    }

    const record = await this.mongoConnector.find('movies', {
      id: id,
    });

    if (!record) {
      throw new HttpException(
        { message: `Movie with id ${id} doesn't exist` },
        404,
      );
    }

    await this.mongoConnector.delete('movies', { id: id });
    return { message: 'record deleted' };
  }
}
