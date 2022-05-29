import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CollectPointService } from '../../../src/collect-point/collect-point.service';
import { CollectPointEntity } from '../../../src/collect-point/entities/collect-point.entity';
import { Repository } from 'typeorm';
import { ParameterEntity } from '../entities/parameter.entity';
import { ParameterService } from '../parameter.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateParameterDto } from '../dto/create-parameter.dto';

describe('ParameterService', () => {
  let parameterService: ParameterService;
  let parameterRepository: Repository<ParameterEntity>;
  let collectPointService: CollectPointService;

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
    unit: 'mg/l',
    collectPoint: mockCollectPoint,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ParameterService,
        {
          provide: getRepositoryToken(ParameterEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: CollectPointService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    parameterService = moduleRef.get<ParameterService>(ParameterService);
    parameterRepository = moduleRef.get(getRepositoryToken(ParameterEntity));
    collectPointService =
      moduleRef.get<CollectPointService>(CollectPointService);
  });

  it('should be defined', () => {
    expect(parameterService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of parameters', () => {
      jest
        .spyOn(parameterRepository, 'find')
        .mockImplementationOnce(() => Promise.resolve([mockParameter]));
      expect(parameterService.findAll()).resolves.toEqual([mockParameter]);
    });
  });

  describe('create', () => {
    const body: CreateParameterDto = {
      code: 'ALUMINIO_DISSOLVIDO',
      collectionDate: 1234567890,
      value: 1,
      collectPointId: 1,
    };

    it('should insert a new parameter and return it', () => {
      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getOne: () => null,
      };
      jest
        .spyOn(parameterRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => createQueryBuilder);

      jest
        .spyOn(collectPointService, 'findById')
        .mockImplementationOnce(() => Promise.resolve(mockCollectPoint));

      jest
        .spyOn(parameterRepository, 'save')
        .mockImplementationOnce(() => Promise.resolve(mockParameter));

      expect(parameterService.create(body)).resolves.toEqual(mockParameter);
    });

    it('should throw a bad request exception when parameter is already registered', () => {
      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getOne: () => mockParameter,
      };
      jest
        .spyOn(parameterRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => createQueryBuilder);

      expect(parameterService.create(body)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw a not found exception when a collection point with the given id does not exist', () => {
      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getOne: () => null,
      };
      jest
        .spyOn(parameterRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => createQueryBuilder);

      jest
        .spyOn(collectPointService, 'findById')
        .mockImplementationOnce(() => Promise.resolve(null));

      expect(parameterService.create(body)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    const id = 1;

    it('should delete the parameter with the given id and return a copy of the deleted item', () => {
      jest
        .spyOn(parameterRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(mockParameter));

      jest
        .spyOn(parameterRepository, 'delete')
        .mockImplementationOnce(() => Promise.resolve() as any);

      expect(parameterService.delete(id)).resolves.toEqual(mockParameter);
    });

    it('should throw a not found exception when a parameter with the given id does not exist', () => {
      jest
        .spyOn(parameterRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(null));

      expect(parameterService.delete(id)).rejects.toThrow(NotFoundException);
    });
  });
});
