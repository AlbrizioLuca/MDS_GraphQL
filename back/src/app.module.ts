import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      installSubscriptionHandlers: true,
      introspection: false,
    }),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
