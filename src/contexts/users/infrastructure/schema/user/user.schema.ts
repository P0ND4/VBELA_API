import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import {
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
} from 'src/contexts/users/domain/types';

export type UserDocument = HydratedDocument<User>;

const DEFAULT_NAME = 'VBELA';
const DEFAULT_COIN = 'USD';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  identifier: string;

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

  @Prop({ default: DEFAULT_COIN })
  coin: string;

  @Prop({ default: 0 })
  color: number;

  @Prop({ type: [Object], default: [] })
  paymentMethods: PaymentMethods[];

  @Prop({ type: [Object], default: [] })
  stocks: Stock[];

  @Prop({ type: [Object], default: [] })
  inventories: Inventory[];

  @Prop({ type: [Object], default: [] })
  recipes: Recipe[];

  @Prop({ type: [Object], default: [] })
  stores: Location[];

  @Prop({ type: [Object], default: [] })
  restaurants: Location[];

  @Prop({ type: [Object], default: [] })
  products: Element[];

  @Prop({ type: [Object], default: [] })
  sales: Order[];

  @Prop({ type: [Object], default: [] })
  kitchens: Kitchen[];

  @Prop({ type: [Object], default: [] })
  menu: Element[];

  @Prop({ type: [Object], default: [] })
  orders: Order[];

  @Prop({ type: [Object], default: [] })
  tables: Table[];
}

export const UserSchema = SchemaFactory.createForClass(User);
