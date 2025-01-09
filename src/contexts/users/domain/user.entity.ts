import { v4 as uuidv4 } from 'uuid';

import {
  Inventory,
  Recipe,
  Stock,
  Table,
  Location,
  Element,
  Order,
  PaymentMethods,
  InvoiceInformation,
  Kitchen,
} from './types';

export interface PrimitiveUser {
  id: string;
  identifier: string;
  type: string | null;
  expoID: string | null;
  darkMode: boolean;
  invoiceInformation: InvoiceInformation;
  coin: string;
  color: number;
  stocks: Stock[];
  inventories: Inventory[];
  recipes: Recipe[];
  stores: Location[];
  restaurants: Location[];
  productsAndServices: Element[];
  sales: Order[];
  kitchens: Kitchen[];
  menu: Element[];
  orders: Order[];
  tables: Table[];
  paymentMethods: PaymentMethods[];
}

export class UserEntity {
  constructor(private readonly attributes: PrimitiveUser) {}

  static transform(createUser: Partial<PrimitiveUser>): UserEntity {
    return new UserEntity({
      id: createUser.id || uuidv4(),
      identifier: createUser.identifier || '',
      expoID: createUser.expoID || null,
      type: createUser.type || null,
      darkMode: createUser.darkMode ?? false,
      invoiceInformation: createUser.invoiceInformation || {
        company: 'VBELA',
        business: '',
        address: '',
        identification: '',
        countryCode: 1,
        phoneNumber: '',
        complement: '',
      },
      coin: createUser.coin || 'USD',
      color: createUser.color || 0,
      stocks: createUser.stocks || [],
      inventories: createUser.inventories || [],
      recipes: createUser.recipes || [],
      stores: createUser.stores || [],
      restaurants: createUser.restaurants || [],
      productsAndServices: createUser.productsAndServices || [],
      sales: createUser.sales || [],
      kitchens: createUser.kitchens || [],
      menu: createUser.menu || [],
      orders: createUser.orders || [],
      tables: createUser.tables || [],
      paymentMethods: createUser.paymentMethods || [],
    });
  }

  toPrimitives(): PrimitiveUser {
    return { ...this.attributes };
  }
}
