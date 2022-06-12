import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CreateCurrencyDTO } from './dto/create-currency.dto';

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new NotFoundException(`Currency: ${currency} not found`);
    }

    return result;
  }

  async createCurrency(currencyInput: CreateCurrencyDTO): Promise<Currencies> {
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
  }: CreateCurrencyDTO): Promise<Currencies> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new NotFoundException(`Currency: ${currency} not found!`);
    }

    try {
      result.value = value;
      await this.save(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return result;
  }

  async deleteCurrency(currency: string): Promise<void> {
    const result = await this.findOneBy({ currency });

    if (!result) {
      throw new NotFoundException(`Currency: ${currency} not found!`);
    }

    await this.delete({ currency });
  }
}
