import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';

describe('CurrenciesRepository', () => {
  let repository: CurrenciesRepository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
    mockData = { currency: 'USD', value: 1 } as Currencies;
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
      repository.findOneBy = jest.fn().mockReturnValue(mockData);
      expect(await repository.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency()', () => {
    beforeEach(() => {
      repository.save = jest.fn();
    });

    it('should be called save with correct params', async () => {
      repository.save = jest.fn().mockReturnValue(mockData);

      await repository.createCurrency(mockData);
      expect(repository.save).toBeCalledWith(mockData);
    });

    it('should be throw when save throw', async () => {
      repository.save = jest.fn().mockRejectedValue(new Error());
      await expect(repository.createCurrency(mockData)).rejects.toThrow();
    });

    it('should be throw if called with invalid params', async () => {
      mockData.currency = 'INVALID';
      await expect(repository.createCurrency(mockData)).rejects.toThrow();

      mockData.currency = 'USD';
      mockData.value = 'INVALID';
      await expect(repository.createCurrency(mockData)).rejects.toThrow();
    });

    it('should be returns created data', async () => {
      expect(await repository.createCurrency(mockData)).toEqual(mockData);
    });
  });
});
