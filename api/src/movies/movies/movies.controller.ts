import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovie } from 'src/interfaces/dataModels';

@Controller('movies')
export class MoviesController {
  moviesService: MoviesService;
  constructor() {
    this.moviesService = new MoviesService();
  }
  @Get()
  getAllMovies() {
    try {
      return this.moviesService.getAllMovies();
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Internal server error' }, 500);
    }
  }

  @Get(':movieId')
  getMovies(@Param('movieId') movieId: string) {
    try {
      return this.moviesService.getMovie(movieId);
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Internal server error' }, 500);
    }
  }

  @Put(':movieId')
  updateMovie(
    @Param('movieId') movieId: string,
    @Body() newrecord: UpdateMovie,
  ) {
    try {
      this.moviesService.updateMovie(movieId, newrecord);
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Internal server error' }, 500);
    }
  }

  @Post()
  createMovie(
    @Body() body: UpdateMovie,
    @Headers('user') authorization: { id: string; email: string },
  ) {
    try {
      return this.moviesService.createMovie(body, authorization);
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Internal server error' }, 500);
    }
  }

  @Delete(':movieId')
  deleteMovie(
    @Param('movieId') id: string,
    @Headers('user') authorization: { id: string; email: string },
  ) {
    try {
      return this.moviesService.deleteMovie(id, authorization);
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Internal server error' }, 500);
    }
  }
}
