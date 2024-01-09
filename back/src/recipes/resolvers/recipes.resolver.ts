import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { Recipe } from '../models/recipe.model';
import { RecipesArgs } from '../args/find-recipe.args';
import { RecipesService } from '../services/recipes.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) { }

  @Mutation(() => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: CreateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Query(() => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(() => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(() => Recipe)
  async updateRecipe(
    @Args('id') id: string,
    @Args('updateRecipeData') updateRecipeData: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.update(id, updateRecipeData);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args('id') id: string) {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return this.recipesService.remove(id);
  }

  @Subscription(() => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
