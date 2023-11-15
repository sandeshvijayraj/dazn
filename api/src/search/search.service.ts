import { Injectable } from '@nestjs/common';
import { MongoDB } from 'src/connectors/mongoDB';

@Injectable()
export class SearchService {
  mongoConnector: MongoDB;
  constructor() {
    this.mongoConnector = new MongoDB();
  }
  async searchMovies(q: string) {
    const data = await this.mongoConnector.findAll('movies', {
      $or: [
        {
          title: q,
        },
        {
          genre: q,
        },
      ],
    });

    return data;
  }
}
