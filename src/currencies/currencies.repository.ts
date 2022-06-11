import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CurrenciesInputType } from './types/currencies-input.type';

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new NotFoundException(`Currency: ${currency} not found`);
    }

    return result;
  }

  async createCurrency(
    currencyInput: CurrenciesInputType,
  ): Promise<Currencies> {
    const currencies = new Currencies();
    currencies.currency = currencyInput.currency;
    currencies.value = currencyInput.value;

    try {
      await validateOrReject(currencies);
      await this.save(currencies);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return currencies;
  }

  async updateCurrency({
    currency,
    value,
  }: CurrenciesInputType): Promise<Currencies> {
    return new Currencies();
  }

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
