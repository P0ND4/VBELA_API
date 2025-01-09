import { Selection } from "../common/order.entity";

export interface Kitchen {
  id: string;
  restaurantID: string;
  location: string;
  order: string;
  status: string;
  selection: Selection[];
  observation: string;
  creationDate: number;
  modificationDate: number;
}