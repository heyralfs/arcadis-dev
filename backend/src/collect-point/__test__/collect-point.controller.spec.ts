import { Test, TestingModule } from '@nestjs/testing';
import { CollectPointController } from '../collect-point.controller';
import { CollectPointService } from '../collect-point.service';
import { CreateCollectPointDto } from '../dto/create-collect-point.dto';

describe('CollectPointController', () => {
  let collectPointController: CollectPointController;
  let collectPointService: CollectPointService;

  const mockCollectPoint = {
    id: 1,
    name: 'Ponto de Coleta A',
    xCoord: 0,
    yCoord: 0,
    parameters: [],
  };

  const mockCollectPointService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CollectPointController],
      providers: [
        { provide: CollectPointService, useValue: mockCollectPointService },
      ],
    }).compile();

    collectPointController = moduleRef.get<CollectPointController>(
      CollectPointController,
    );
    collectPointService =
      moduleRef.get<CollectPointService>(CollectPointService);
  });

  it('should be defined', () => {
    expect(collectPointController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of collect points', async () => {
      jest
        .spyOn(collectPointService, 'findAll')
        .mockImplementationOnce(() => Promise.resolve([mockCollectPoint]));
      expect(collectPointController.getAll()).resolves.toEqual([
        mockCollectPoint,
      ]);
    });
  });

  describe('create', () => {
    const body: CreateCollectPointDto = {
      name: 'Ponto de Coleta A',
      xCoord: 0,
      yCoord: 0,
    };

    it('should create and return the created collect point', () => {
      jest
        .spyOn(collectPointService, 'create')
        .mockImplementationOnce(() =>
          Promise.resolve({ id: 1, parameters: [], ...body }),
        );
      expect(collectPointController.create(body)).resolves.toEqual(
        mockCollectPoint,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(collectPointService, 'create')
        .mockRejectedValueOnce(new Error());
      expect(collectPointController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;
    const body: CreateCollectPointDto = {
      name: 'Ponto de Coleta B',
      xCoord: 0,
      yCoord: 0,
    };

    it('should update collect point and return the updated one', () => {
      jest
        .spyOn(collectPointService, 'update')
        .mockImplementationOnce(() =>
          Promise.resolve({ ...mockCollectPoint, ...body }),
        );

      expect(collectPointController.update(id, body)).resolves.toEqual({
        id,
        ...body,
        parameters: mockCollectPoint.parameters,
      });
    });

    it('should throw an exception', () => {
      jest
        .spyOn(collectPointService, 'update')
        .mockRejectedValueOnce(new Error());
      expect(collectPointController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    const id = 1;

    it('should delete the collect point and return a copy of it', () => {
      jest
        .spyOn(collectPointService, 'delete')
        .mockImplementationOnce(() => Promise.resolve(mockCollectPoint));

      expect(collectPointController.delete(id)).resolves.toEqual(
        mockCollectPoint,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(collectPointService, 'delete')
        .mockRejectedValueOnce(new Error());
      expect(collectPointController.delete(id)).rejects.toThrowError();
    });
  });
});
