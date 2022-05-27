import { Test, TestingModule } from '@nestjs/testing';
import { CollectPointEntity } from '../../../src/collect-point/entities/collect-point.entity';
import { CreateParameterDto } from '../dto/create-parameter.dto';
import { ParameterEntity } from '../entities/parameter.entity';
import { ParameterController } from '../parameter.controller';
import { ParameterService } from '../parameter.service';

describe('ParameterController', () => {
  let parameterController: ParameterController;
  let parameterService: ParameterService;

  const mockCollectPoint: CollectPointEntity = {
    id: 1,
    name: 'Ponto de Coleta A',
    xCoord: 0,
    yCoord: 0,
    parameters: [],
  };

  const mockParameter: ParameterEntity = {
    id: 1,
    code: 'ALUMINIO_DISSOLVIDO',
    name: 'Alumínio dissolvido',
    collectionDate: 1234567890,
    value: 1,
    overLimit: true,
    collectPoint: mockCollectPoint,
  };

  const mockParameterService = {
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ParameterController],
      providers: [
        { provide: ParameterService, useValue: mockParameterService },
      ],
    }).compile();

    parameterController =
      moduleRef.get<ParameterController>(ParameterController);
    parameterService = moduleRef.get<ParameterService>(ParameterService);
  });

  it('should be defined', () => {
    expect(parameterController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of parameters', async () => {
      jest
        .spyOn(parameterService, 'findAll')
        .mockImplementationOnce(() => Promise.resolve([mockParameter]));
      expect(parameterController.getAll()).resolves.toEqual([mockParameter]);
    });
  });

  describe('create', () => {
    const body: CreateParameterDto = {
      code: 'ALUMINIO_DISSOLVIDO',
      collectionDate: 1234567890,
      value: 1,
      collectPointId: 1,
    };

    it('should create a parameter and return it', () => {
      jest
        .spyOn(parameterService, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockParameter));
      expect(parameterController.create(body)).resolves.toEqual(mockParameter);
    });

    it('should throw an exception', () => {
      jest.spyOn(parameterService, 'create').mockRejectedValueOnce(new Error());
      expect(parameterController.create(body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    const id = 1;

    it('should delete the parameter and return a copy of it', () => {
      jest
        .spyOn(parameterService, 'delete')
        .mockImplementationOnce(() => Promise.resolve(mockParameter));

      expect(parameterController.delete(id)).resolves.toEqual(mockParameter);
    });

    it('should throw an exception', () => {
      jest.spyOn(parameterService, 'delete').mockRejectedValueOnce(new Error());
      expect(parameterController.delete(id)).rejects.toThrowError();
    });
  });
});
