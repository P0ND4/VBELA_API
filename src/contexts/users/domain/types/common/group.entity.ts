export type SubCategory = { id: string; name: string };

export interface Group {
  id: string;
  locationID: string;
  category: string;
  subcategories: SubCategory[];
  creationDate: number;
  modificationDate: number;
}
