import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  service: SearchService;
  constructor() {
    this.service = new SearchService();
  }
  @Get()
  searchMovie(@Query('q') q: string) {
    try {
      return this.service.searchMovies(q);
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Internal server error' }, 500);
    }
  }
}
