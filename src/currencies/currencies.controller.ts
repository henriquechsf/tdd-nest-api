import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDTO } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @Get('/:currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currenciesService.getCurrency(currency);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createCurrency(
    @Body() createCurrencyDTO: CreateCurrencyDTO,
  ): Promise<Currencies> {
    return await this.currenciesService.createCurrency(createCurrencyDTO);
  }

  @Patch('/:currency/value')
  async updateCurrency(
    @Param('currency') currency: string,
    @Body('value') value: number,
  ): Promise<Currencies> {
    return await this.currenciesService.updateCurrency({ currency, value });
  }

  @Delete('/:currency')
  async deleteCurrency(@Param() currency: string): Promise<void> {
    return await this.currenciesService.deleteCurrency(currency);
  }
}
