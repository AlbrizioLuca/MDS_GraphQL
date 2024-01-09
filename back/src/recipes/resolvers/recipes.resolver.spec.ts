import { Test, TestingModule } from '@nestjs/testing';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from '../services/recipes.service';

describe('RecipesResolver', () => {
  let resolver: RecipesResolver;
  let recipeId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService, RecipesResolver],
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it('should create a recipe', async () => {
    const newRecipe = {
      title: "Carbonara",
      creationDate: new Date(),
      ingredients: ["Pâtes", "Guanciale", "Oeufs", "Pecorino", "Poivre noir"],
    };

    const createdRecipe = await resolver.addRecipe(newRecipe);
    recipeId = createdRecipe.id
    expect(createdRecipe).toEqual({ id: recipeId, ...newRecipe })
  })

  it('should find a recipe', async () => {
    const retrievedRecipe = await resolver.recipe(recipeId);
    expect(retrievedRecipe).toBeDefined();
    expect(retrievedRecipe.id).toBe(recipeId);
  });

  it('should delete a recipe', async () => {
    await resolver.removeRecipe(recipeId);
    try {
      await resolver.recipe(recipeId);
    } catch (error) {
      expect(error.response.error).toMatch(/Not Found/i);
    }
  });

});
