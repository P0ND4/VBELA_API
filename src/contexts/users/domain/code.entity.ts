import { v4 as uuidv4 } from 'uuid';

export interface PrimitiveCode {
  id: string;
  email: string;
  code: string;
  createdAt: Date;
}

export class CodeEntity {
  constructor(private readonly attributes: PrimitiveCode) {}

  static transform(createCode: Partial<PrimitiveCode>): CodeEntity {
    return new CodeEntity({
      id: createCode.id || uuidv4(),
      email: createCode.email || '',
      code: createCode.code || '',
      createdAt: createCode.createdAt || new Date(),
    });
  }

  toPrimitives(): PrimitiveCode {
    return { ...this.attributes };
  }
}
