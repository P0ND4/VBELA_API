import { Order } from "src/contexts/users/infrastructure/http-api/v1/common-dto/order.http-dto";
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

export interface KitchenDTO {
  order: Order;
  kitchen: Kitchen;
}