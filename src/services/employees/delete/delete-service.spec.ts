import { Employee } from '../../../entities/employee-entity';

import { IDeleteEmployeeRepository } from '../../../repositories/employees/delete/delete-repository-interface';
import { IFindEmployeeByIdRepository } from '../../../repositories/employees/find-by-id/find-by-id-repository-interface';

import { DeleteEmployeeService } from './delete-service';

const createSut = () => {
  const findEmployeeByIdRepositoryMock =
    jest.mocked<IFindEmployeeByIdRepository>({
      execute: async () => {
        return {} as Employee;
      },
    });

  const deleteEmployeeRepositoryMock = jest.mocked<IDeleteEmployeeRepository>({
    execute: async () => {
      return undefined;
    },
  });

  const sut = new DeleteEmployeeService(
    findEmployeeByIdRepositoryMock,
    deleteEmployeeRepositoryMock,
  );

  return {
    sut,
    findEmployeeByIdRepositoryMock,
    deleteEmployeeRepositoryMock,
  };
};

describe('DeleteEmployeeService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should delete an employee', async () => {
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

  it('should call deleteEmployeeRepository.execute once', async () => {
    const { sut, deleteEmployeeRepositoryMock } = createSut();
    const deleteEmployeeRepositoryMockSpy = jest.spyOn(
      deleteEmployeeRepositoryMock,
      'execute',
    );

    await sut.execute('success');

    expect(deleteEmployeeRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should not delete an employee that not exists', async () => {
    const { sut, findEmployeeByIdRepositoryMock } = createSut();
    jest
      .spyOn(findEmployeeByIdRepositoryMock, 'execute')
      .mockResolvedValue(undefined);

    await expect(sut.execute('bug')).rejects.toThrow();
  });
});
