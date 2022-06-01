import { Employee } from '../../../entities/employee-entity';

import { IFindEmployeeByIdRepository } from '../../../repositories/employees/find-by-id/find-by-id-repository-interface';

import { FindEmployeeByIdService } from './find-by-id-service';

const createSut = () => {
  const findEmployeeByIdRepositoryMock =
    jest.mocked<IFindEmployeeByIdRepository>({
      execute: async () => {
        return {} as Employee;
      },
    });

  const sut = new FindEmployeeByIdService(findEmployeeByIdRepositoryMock);

  return {
    sut,
    findEmployeeByIdRepositoryMock,
  };
};

describe('FindEmployeeByIdService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return an employee', async () => {
    const { sut } = createSut();

    await expect(sut.execute('success')).resolves.not.toThrow();
  });

  it('should call findEmployeeByIdRepository.execute once', async () => {
    const { sut, findEmployeeByIdRepositoryMock } = createSut();
    const findEmployeeByIdRepositoryMockSpy = jest.spyOn(
      findEmployeeByIdRepositoryMock,
      'execute',
    );

    await sut.execute('success');

    expect(findEmployeeByIdRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call findEmployeeByIdRepository.execute with ID', async () => {
    const { sut, findEmployeeByIdRepositoryMock } = createSut();
    const findEmployeeByIdRepositoryMockSpy = jest.spyOn(
      findEmployeeByIdRepositoryMock,
      'execute',
    );

    await sut.execute('success');

    expect(findEmployeeByIdRepositoryMockSpy).toHaveBeenCalledWith('success');
  });

  it('should not return an employee that not exists', async () => {
    const { sut, findEmployeeByIdRepositoryMock } = createSut();
    jest
      .spyOn(findEmployeeByIdRepositoryMock, 'execute')
      .mockResolvedValue(undefined);

    await expect(sut.execute('bug')).rejects.toThrow();
  });
});
