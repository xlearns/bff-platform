import { Guid } from 'guid-typescript';

export class GetGuid {
  static create(): string {
    return Guid.raw();
  }
}
