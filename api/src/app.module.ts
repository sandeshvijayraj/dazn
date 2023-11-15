import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies/movies.controller';
import { MoviesService } from './movies/movies/movies.service';
import { JwtMiddleware } from './authoriser/authoriser/authoriser.service';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';

@Module({
  imports: [],
  controllers: [AppController, MoviesController, SearchController],
  providers: [AppService, MoviesService, JwtMiddleware, SearchService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
