import { Module } from '@nestjs/common';
import { RecipesResolver } from './resolvers/recipes.resolver';
import { RecipesService } from './services/recipes.service';

@Module({
  providers: [RecipesResolver, RecipesService]
})
export class RecipesModule {}
