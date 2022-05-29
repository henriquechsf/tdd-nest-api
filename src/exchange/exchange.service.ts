import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  async convertAmout({ from, to, amount }): Promise<any> {
    throw new Error();
  }
}
