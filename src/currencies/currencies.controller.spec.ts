import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;
  let service: CurrenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        {
          provide: CurrenciesService,
          useFactory: () => ({
            getCurrency: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be throw when service throw', async () => {
      (service.getCurrency as jest.Mock).mockRejectedValue(
        new BadRequestException(),
      );
      await expect(controller.getCurrency('INVALID')).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be called service with correct params', async () => {
      await controller.getCurrency('USD');
      expect(service.getCurrency).toBeCalledWith('USD');
    });

    it('should be returns when service returns', async () => {
      const mockData = { currency: 'USD', value: 1 } as Currencies;
      (service.getCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await controller.getCurrency('USD')).toEqual(mockData);
    });
  });
});