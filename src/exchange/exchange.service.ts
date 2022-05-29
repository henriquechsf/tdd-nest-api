import { BadRequestException, Injectable } from '@nestjs/common';

export class CurrenciesService {
  async getCurrency(currency: string): Promise<any> {
    //
  }
}

@Injectable()
export class ExchangeService {
  constructor(private currenciesService: CurrenciesService) {}

  async convertAmout({ from, to, amount }): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }

    const currencyFrom = this.currenciesService.getCurrency(from);
    const currencyTo = this.currenciesService.getCurrency(to);
  }
}
