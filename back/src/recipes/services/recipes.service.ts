import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { Recipe } from '../models/recipe.model';
import { RecipesArgs } from '../args/find-recipe.args';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';

let uniqueId = 0;
const RECIPES: Recipe[] = [];

@Injectable()
export class RecipesService {
  async create(data: CreateRecipeDto): Promise<Recipe> {
    const recipe: Recipe = {
      ...data,
      id: String(uniqueId++),
      creationDate: new Date(),
    };
    RECIPES.push(recipe);
    return recipe;
  }

  async findOneById(id: string): Promise<Recipe> {
    return RECIPES.find((recipe) => recipe.id === id);
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return RECIPES.slice(recipesArgs.skip, recipesArgs.take);
  }

  async update(id: string, data: UpdateRecipeDto): Promise<Recipe> {
    const recipe = RECIPES.find((recipe) => recipe.id === id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    recipe.title = data.title;
    recipe.description = data.description;
    recipe.ingredients = data.ingredients;
    return recipe;
  }

  async remove(id: string): Promise<boolean> {
    RECIPES.splice(RECIPES.findIndex((recipe) => recipe.id === id)), 1;
    return true;
  }
}
