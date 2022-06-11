import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';

describe('CurrenciesRepository', () => {
  let repository: CurrenciesRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be called findOneBy with correct params', async () => {
      repository.findOneBy = jest.fn().mockReturnValue({});

      await repository.getCurrency('USD');
      expect(repository.findOneBy).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw findOneBy returns empty', async () => {
      repository.findOneBy = jest.fn().mockReturnValue(undefined);
      await expect(repository.getCurrency('USD')).rejects.toThrow(
        new NotFoundException('Currency: USD not found'),
      );
    });

    it('should be returns if when findOneBy returns', async () => {
      const mockData = { currency: 'USD', value: 1 } as Currencies;
      repository.findOneBy = jest.fn().mockReturnValue(mockData);
      expect(await repository.getCurrency('USD')).toEqual(mockData);
    });
  });
});
