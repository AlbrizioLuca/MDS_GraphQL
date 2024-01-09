import { InputType } from '@nestjs/graphql';
import { CreateRecipeDto } from './create-recipe.dto';

@InputType()
export class UpdateRecipeDto extends CreateRecipeDto { }
