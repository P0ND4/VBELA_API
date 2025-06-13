import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import {
  Collaborator,
  Element,
  Inventory,
  InvoiceInformation,
  Kitchen,
  Location,
  Order,
  PaymentMethods,
  Recipe,
  Stock,
  Table,
  Handler,
  Supplier,
  Group,
  Economy,
  EconomicGroup,
  Movement,
  Portion,
} from 'src/contexts/users/domain/types';

export type UserDocument = HydratedDocument<User>;

const DEFAULT_NAME = 'VBELA';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  identifier: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: null })
  type: string | null;

  @Prop({ default: null })
  expoID: string | null;

  @Prop({ default: false })
  darkMode: boolean;

  @Prop({
    type: Object,
    default: {
      company: DEFAULT_NAME,
      business: '',
      address: '',
      identification: '',
      countryCode: 1,
      phoneNumber: '',
      complement: '',
    },
  })
  invoiceInformation: InvoiceInformation;

  @Prop({ default: 0 })
  color: number;

  @Prop({ default: 0.1 })
  tip: number;

  @Prop({ default: 0 })
  tax: number;

  @Prop({ default: 0 })
  initialBasis: number;

  @Prop({ type: [Object], default: [] })
  paymentMethods: PaymentMethods[];

  @Prop({ type: [Object], default: [] })
  handlers: Handler[];

  @Prop({ type: [Object], default: [] })
  stocks: Stock[];

  @Prop({ type: [Object], default: [] })
  stockGroup: Group[];

  @Prop({ type: [Object], default: [] })
  inventories: Inventory[];

  @Prop({ type: [Object], default: [] })
  recipes: Recipe[];

  @Prop({ type: [Object], default: [] })
  recipeGroup: Group[];

  @Prop({ type: [Object], default: [] })
  stores: Location[];

  @Prop({ type: [Object], default: [] })
  restaurants: Location[];

  @Prop({ type: [Object], default: [] })
  productGroup: Group[];

  @Prop({ type: [Object], default: [] })
  products: Element[];

  @Prop({ type: [Object], default: [] })
  sales: Order[];

  @Prop({ type: [Object], default: [] })
  kitchens: Kitchen[];

  @Prop({ type: [Object], default: [] })
  menuGroup: Group[];

  @Prop({ type: [Object], default: [] })
  menu: Element[];

  @Prop({ type: [Object], default: [] })
  orders: Order[];

  @Prop({ type: [Object], default: [] })
  tables: Table[];

  @Prop({ type: [Object], default: [] })
  collaborators: Collaborator[];

  @Prop({ type: [Object], default: [] })
  suppliers: Supplier[];

  @Prop({ type: [Object], default: [] })
  economies: Economy[];

  @Prop({ type: [Object], default: [] })
  economicGroup: EconomicGroup[];

  @Prop({ type: [Object], default: [] })
  movements: Movement[];

  @Prop({ type: [Object], default: [] })
  portionGroup: Group[];

  @Prop({ type: [Object], default: [] })
  portions: Portion[];
}

export const UserSchema = SchemaFactory.createForClass(User);
