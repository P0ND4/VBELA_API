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
  Collaborator,
  Handler,
  Supplier,
  Economy,
  Group,
  EconomicGroup,
  Movement,
  Portion,
} from './types';

export interface PrimitiveUser {
  id: string;
  identifier: string;
  name: string;
  type: string | null;
  expoID: string | null;
  darkMode: boolean;
  invoiceInformation: InvoiceInformation;
  color: number;
  tip: number;
  tax: number;
  initialBasis: number;
  stocks: Stock[];
  stockGroup: Group[];
  inventories: Inventory[];
  recipes: Recipe[];
  recipeGroup: Group[];
  stores: Location[];
  productGroup: Group[];
  products: Element[];
  sales: Order[];
  kitchens: Kitchen[];
  restaurants: Location[];
  menuGroup: Group[];
  menu: Element[];
  orders: Order[];
  tables: Table[];
  paymentMethods: PaymentMethods[];
  collaborators: Collaborator[];
  handlers: Handler[];
  suppliers: Supplier[];
  economies: Economy[];
  economicGroup: EconomicGroup[];
  movements: Movement[];
  portions: Portion[];
  portionGroup: Group[];
}

export class UserEntity {
  constructor(private readonly attributes: PrimitiveUser) {}

  static transform(createUser: Partial<PrimitiveUser>): UserEntity {
    return new UserEntity({
      id: createUser.id || uuidv4(),
      identifier: createUser.identifier,
      name: createUser.name || '',
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
      color: createUser.color || 0,
      tip: createUser.tip || 0.1,
      tax: createUser.tax || 0,
      initialBasis: createUser.initialBasis || 0,
      stocks: createUser.stocks || [],
      stockGroup: createUser.stockGroup || [],
      inventories: createUser.inventories || [],
      recipes: createUser.recipes || [],
      recipeGroup: createUser.recipeGroup || [],
      stores: createUser.stores || [],
      restaurants: createUser.restaurants || [],
      productGroup: createUser.productGroup || [],
      products: createUser.products || [],
      sales: createUser.sales || [],
      kitchens: createUser.kitchens || [],
      menuGroup: createUser.menuGroup || [],
      menu: createUser.menu || [],
      orders: createUser.orders || [],
      tables: createUser.tables || [],
      paymentMethods: createUser.paymentMethods || [],
      collaborators: createUser.collaborators || [],
      handlers: createUser.handlers || [],
      suppliers: createUser.suppliers || [],
      economies: createUser.economies || [],
      economicGroup: createUser.economicGroup || [],
      movements: createUser.movements || [],
      portions: createUser.portions || [],
      portionGroup: createUser.portionGroup || [],
    });
  }

  toPrimitives(): PrimitiveUser {
    return { ...this.attributes };
  }
}
