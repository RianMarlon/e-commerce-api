import { Employee, TypesEmployee } from '../../../entities/employee-entity';

import { DataValidator } from '../../../utils/data-validator/data-validator';
import { IEncryptor } from '../../../utils/encryptor/interfaces/encryptor-interface';

import { ICreateEmployeeRepository } from '../../../repositories/employees/create/create-repository-interface';
import { IFindEmployeeByCPFRepository } from '../../../repositories/employees/find-by-cpf/find-by-cpf-repository-interface';
import { IFindEmployeeByEmailRepository } from '../../../repositories/employees/find-by-email/find-by-email-repository-interface';

import { CreateEmployeeService } from './create-service';

const createSut = () => {
  const dataValidatorMock = jest.mocked<DataValidator>(new DataValidator());

  const encryptorMock = jest.mocked<IEncryptor>({
    createHash: async () => {
      return '';
    },
    compareDataWithHash: async () => {
      return false;
    },
  });

  const findEmployeeByEmailRepositoryMock =
    jest.mocked<IFindEmployeeByEmailRepository>({
      execute: async () => {
        return undefined;
      },
    });

  const findEmployeeByCPFRepositoryMock =
    jest.mocked<IFindEmployeeByCPFRepository>({
      execute: async () => {
        return undefined;
      },
    });

  const createEmployeeRepositoryMock = jest.mocked<ICreateEmployeeRepository>({
    execute: async () => {
      return {} as Employee;
    },
  });

  const sut = new CreateEmployeeService(
    dataValidatorMock,
    encryptorMock,
    findEmployeeByEmailRepositoryMock,
    findEmployeeByCPFRepositoryMock,
    createEmployeeRepositoryMock,
  );

  return {
    sut,
    dataValidatorMock,
    encryptorMock,
    findEmployeeByEmailRepositoryMock,
    findEmployeeByCPFRepositoryMock,
    createEmployeeRepositoryMock,
  };
};

describe('CreateEmployeeService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create an employee', async () => {
    const { sut } = createSut();

    await expect(
      sut.execute({
        name: 'Success',
        cpf: '807.608.870-47',
        type: TypesEmployee.ADMINISTRATOR,
        email: 'success@success.com',
        password: '32dad#3fd2',
      }),
    ).resolves.not.toThrow();
  });

  it('should call dataValidator.transform once', async () => {
    const { sut, dataValidatorMock } = createSut();
    const dataValidatorTransformMockSpy = jest.spyOn(
      dataValidatorMock,
      'transform',
    );

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(dataValidatorTransformMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call findEmployeeByEmailRepository.execute once', async () => {
    const { sut, findEmployeeByEmailRepositoryMock } = createSut();
    const findEmployeeByEmailRepositoryMockSpy = jest.spyOn(
      findEmployeeByEmailRepositoryMock,
      'execute',
    );

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(findEmployeeByEmailRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call findEmployeeByEmailRepository.execute with email', async () => {
    const { sut, findEmployeeByEmailRepositoryMock } = createSut();
    const findEmployeeByEmailRepositoryMockSpy = jest.spyOn(
      findEmployeeByEmailRepositoryMock,
      'execute',
    );

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(findEmployeeByEmailRepositoryMockSpy).toHaveBeenCalledWith(
      'success@success.com',
    );
  });

  it('should call findEmployeeByCPFRepository.execute once', async () => {
    const { sut, findEmployeeByCPFRepositoryMock } = createSut();
    const findEmployeeByCPFRepositoryMockSpy = jest.spyOn(
      findEmployeeByCPFRepositoryMock,
      'execute',
    );

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(findEmployeeByCPFRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call findEmployeeByCPFRepository.execute with CPF', async () => {
    const { sut, findEmployeeByCPFRepositoryMock } = createSut();
    const findEmployeeByCPFRepositoryMockSpy = jest.spyOn(
      findEmployeeByCPFRepositoryMock,
      'execute',
    );

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(findEmployeeByCPFRepositoryMockSpy).toHaveBeenCalledWith(
      '80760887047',
    );
  });

  it('should call encryptor.createHash once', async () => {
    const { sut, encryptorMock } = createSut();
    const encryptorCreateHashSpy = jest.spyOn(encryptorMock, 'createHash');

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(encryptorCreateHashSpy).toHaveBeenCalledTimes(1);
  });

  it('should call encryptor.createHash with password', async () => {
    const { sut, encryptorMock } = createSut();
    const encryptorCreateHashSpy = jest.spyOn(encryptorMock, 'createHash');

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(encryptorCreateHashSpy).toHaveBeenCalledWith('32dad#3fd2');
  });

  it('should call createEmployeeRepository.execute once', async () => {
    const { sut, createEmployeeRepositoryMock } = createSut();
    const createEmployeeRepositoryMockSpy = jest.spyOn(
      createEmployeeRepositoryMock,
      'execute',
    );

    await sut.execute({
      name: 'Success',
      cpf: '807.608.870-47',
      type: TypesEmployee.ADMINISTRATOR,
      email: 'success@success.com',
      password: '32dad#3fd2',
    });

    expect(createEmployeeRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should not create an employee with email from another employee', async () => {
    const { sut, findEmployeeByEmailRepositoryMock } = createSut();
    jest
      .spyOn(findEmployeeByEmailRepositoryMock, 'execute')
      .mockResolvedValue({} as Employee);

    await expect(
      sut.execute({
        name: 'Bug',
        cpf: '807.608.870-47',
        type: TypesEmployee.ADMINISTRATOR,
        email: 'bug@bug.com',
        password: '32dad#3fd2',
      }),
    ).rejects.toThrow();
  });

  it('should not create an employee with CPF from another employee', async () => {
    const { sut, findEmployeeByCPFRepositoryMock } = createSut();
    jest
      .spyOn(findEmployeeByCPFRepositoryMock, 'execute')
      .mockResolvedValue({} as Employee);

    await expect(
      sut.execute({
        name: 'Bug',
        cpf: '807.608.870-47',
        type: TypesEmployee.ADMINISTRATOR,
        email: 'bug@bug.com',
        password: '32dad#3fd2',
      }),
    ).rejects.toThrow();
  });
});
