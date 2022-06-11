import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Currencies } from './currencies.entity';

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new NotFoundException(`Currency: ${currency} not found`);
    }

    return result;
  }

  async createCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }

  async updateCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
