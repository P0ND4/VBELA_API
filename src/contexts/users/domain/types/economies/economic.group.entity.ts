import { SubCategory } from '../common';

export interface EconomicGroup {
  id: string;
  category: string;
  subcategories: SubCategory[];
  visible: string;
  creationDate: number;
  modificationDate: number;
}
