import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectPointService } from '../collect-point.service';
import { CreateCollectPointDto } from '../dto/create-collect-point.dto';
import { CollectPointEntity } from '../entities/collect-point.entity';

describe('CollectPointService', () => {
  let collectPointService: CollectPointService;
  let collectPointRepository: Repository<CollectPointEntity>;

  const mockCollectPoint = {
    id: 1,
    name: 'Ponto de Coleta A',
    xCoord: 0,
    yCoord: 0,
    parameters: [],
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CollectPointService,
        {
          provide: getRepositoryToken(CollectPointEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    collectPointService =
      moduleRef.get<CollectPointService>(CollectPointService);
    collectPointRepository = moduleRef.get(
      getRepositoryToken(CollectPointEntity),
    );
  });

  it('should be defined', () => {
    expect(collectPointService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of collect points', () => {
      jest
        .spyOn(collectPointRepository, 'find')
        .mockImplementationOnce(() => Promise.resolve([mockCollectPoint]));
      expect(collectPointService.findAll()).resolves.toEqual([
        mockCollectPoint,
      ]);
    });
  });

  describe('findById', () => {
    const id = 1;
    it('should return one collect point', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(mockCollectPoint));
      expect(collectPointService.findById(id)).resolves.toEqual(
        mockCollectPoint,
      );
    });
  });

  describe('create', () => {
    const body: CreateCollectPointDto = {
      name: 'Ponto de Coleta A',
      xCoord: 0,
      yCoord: 0,
    };

    it('should insert a new collect point and return it', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(null));

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getOne: () => null,
      };
      jest
        .spyOn(collectPointRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => createQueryBuilder);

      jest
        .spyOn(collectPointRepository, 'save')
        .mockImplementationOnce(() => Promise.resolve(mockCollectPoint));

      expect(collectPointService.create(body)).resolves.toEqual(
        mockCollectPoint,
      );
    });

    it('should throw a bad request exception when a collection point with the same name already exists', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(mockCollectPoint));

      expect(collectPointService.create(body)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw a bad request exception when a collection point with the same coordinates already exists', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(null));

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        getOne: () => mockCollectPoint,
      };
      jest
        .spyOn(collectPointRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => createQueryBuilder);

      expect(collectPointService.create(body)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    const id = 1;
    const body: CreateCollectPointDto = {
      name: 'Ponto de Coleta B',
      xCoord: 1,
      yCoord: 1,
    };

    it('should update a collect point and return it', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(mockCollectPoint));

      jest
        .spyOn(collectPointRepository, 'update')
        .mockImplementationOnce(() => Promise.resolve({}) as any);

      expect(collectPointService.update(id, body)).resolves.toEqual({
        ...mockCollectPoint,
        ...body,
      });
    });

    it('should throw a not found exception when a collection point with the given id does not exist', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(null));

      expect(collectPointService.update(id, body)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    const id = 1;

    it('should delete the collect point with the given id and return a copy of the deleted item', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(mockCollectPoint));

      jest
        .spyOn(collectPointRepository, 'delete')
        .mockImplementationOnce(() => Promise.resolve() as any);

      expect(collectPointService.delete(id)).resolves.toEqual(mockCollectPoint);
    });

    it('should throw a not found exception when a collection point with the given id does not exist', () => {
      jest
        .spyOn(collectPointRepository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(null));

      expect(collectPointService.delete(id)).rejects.toThrow(NotFoundException);
    });
  });
});
