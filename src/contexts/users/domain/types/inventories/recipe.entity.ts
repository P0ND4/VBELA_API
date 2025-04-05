type SubCategory = {
  category: string;
  subcategory: string;
};

export type RecipeIngredients = {
  id: string;
  quantity: number;
  type: string;
};

export interface Recipe {
  id: string;
  inventoryID: string;
  value: number;
  categories: string[];
  subcategories: SubCategory[];
  ingredients: RecipeIngredients[];
  name: string;
  description: string;
  visible: boolean;
  creationDate: number;
  modificationDate: number;
}
