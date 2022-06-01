import { IEncryptor } from '../../../utils/encryptor/interfaces/encryptor-interface';
import { DataValidator } from '../../../utils/data-validator/data-validator';

import { Employee } from '../../../entities/employee-entity';

import { IFindEmployeeByCPFRepository } from '../../../repositories/employees/find-by-cpf/find-by-cpf-repository-interface';
import { IFindEmployeeByEmailRepository } from '../../../repositories/employees/find-by-email/find-by-email-repository-interface';
import { IFindEmployeeByIdRepository } from '../../../repositories/employees/find-by-id/find-by-id-repository-interface';
import { IUpdateEmployeeRepository } from '../../../repositories/employees/update/update-repository-interface';

import { UpdateEmployeeService } from './update-service';

import { UpdateEmployeeDTO } from './dto/update-dto';

const createSut = () => {
  const dataValidatorMock = jest.mocked<DataValidator>(new DataValidator());

  const encryptorMock = jest.mocked<IEncryptor>({
    createHash: async () => {
      return '';
    },
    compareDataWithHash: async () => {
      return true;
    },
  });

  const findEmployeeByIdRepositoryMock =
    jest.mocked<IFindEmployeeByIdRepository>({
      execute: async () => {
        return {
          id: '',
        } as Employee;
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

  const updateEmployeeRepositoryMock = jest.mocked<IUpdateEmployeeRepository>({
    execute: async () => {
      return {} as Employee;
    },
  });

  const sut = new UpdateEmployeeService(
    dataValidatorMock,
    encryptorMock,
    findEmployeeByIdRepositoryMock,
    findEmployeeByEmailRepositoryMock,
    findEmployeeByCPFRepositoryMock,
    updateEmployeeRepositoryMock,
  );

  return {
    sut,
    dataValidatorMock,
    encryptorMock,
    findEmployeeByIdRepositoryMock,
    findEmployeeByEmailRepositoryMock,
    findEmployeeByCPFRepositoryMock,
    updateEmployeeRepositoryMock,
  };
};

describe('UpdateEmployeeService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should update an employee', async () => {
    const { sut } = createSut();

    await sut.execute('success', {
      name: 'Success',
      password: 'Success',
      cpf: '807.608.870-47',
      email: 'success@success.com',
    } as UpdateEmployeeDTO);
  });

  it('should call dataValidator.transform once', async () => {
    const { sut, dataValidatorMock } = createSut();
    const dataValidatorTransformMockSpy = jest.spyOn(
      dataValidatorMock,
      'transform',
    );

    await sut.execute('success', {
      name: 'Success',
      password: 'Success',
      cpf: '807.608.870-47',
      email: 'success@success.com',
    } as UpdateEmployeeDTO);

    expect(dataValidatorTransformMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call findEmployeeByIdRepository.execute once', async () => {
    const { sut, findEmployeeByIdRepositoryMock } = createSut();
    const findEmployeeByIdRepositoryMockSpy = jest.spyOn(
      findEmployeeByIdRepositoryMock,
      'execute',
    );

    await sut.execute('success', {
      name: 'Success',
      password: 'Success',
      cpf: '807.608.870-47',
      email: 'success@success.com',
    } as UpdateEmployeeDTO);

    expect(findEmployeeByIdRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call findEmployeeByIdRepository.execute with ID', async () => {
    const { sut, findEmployeeByIdRepositoryMock } = createSut();
    const findEmployeeByIdRepositoryMockSpy = jest.spyOn(
      findEmployeeByIdRepositoryMock,
      'execute',
    );

    await sut.execute('success', {
      name: 'Success',
      password: 'Success',
      cpf: '807.608.870-47',
      email: 'success@success.com',
    } as UpdateEmployeeDTO);

    expect(findEmployeeByIdRepositoryMockSpy).toHaveBeenCalledWith('success');
  });

  it('should call findEmployeeByEmailRepository.execute with email', async () => {
    const { sut, findEmployeeByEmailRepositoryMock } = createSut();
    const findEmployeeByEmailRepositoryMockSpy = jest.spyOn(
      findEmployeeByEmailRepositoryMock,
      'execute',
    );

    await sut.execute('success', {
      name: 'Success',
      password: 'Success',
      cpf: '807.608.870-47',
      email: 'success@success.com',
    } as UpdateEmployeeDTO);

    expect(findEmployeeByEmailRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call findEmployeeByCPFRepository.execute once', async () => {
    const { sut, findEmployeeByCPFRepositoryMock } = createSut();
    const findEmployeeByCPFRepositoryMockSpy = jest.spyOn(
      findEmployeeByCPFRepositoryMock,
      'execute',
    );

    await sut.execute('success', {
      name: 'Success',
      password: 'Success',
      cpf: '807.608.870-47',
      email: 'success@success.com',
    } as UpdateEmployeeDTO);

    expect(findEmployeeByCPFRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call updateEmployeeRepository.execute once', async () => {
    const { sut, updateEmployeeRepositoryMock } = createSut();
    const updateEmployeeRepositoryMockSpy = jest.spyOn(
      updateEmployeeRepositoryMock,
      'execute',
    );

    await sut.execute('success', {
      name: 'Success',
      password: 'Success',
      cpf: '807.608.870-47',
      email: 'success@success.com',
    } as UpdateEmployeeDTO);

    expect(updateEmployeeRepositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should not update an employee when password not match', async () => {
    const { sut, encryptorMock } = createSut();
    jest.spyOn(encryptorMock, 'compareDataWithHash').mockResolvedValue(false);

    await expect(
      sut.execute('bug', {
        name: 'Bug',
        password: 'Bug',
      } as UpdateEmployeeDTO),
    ).rejects.toThrow();
  });

  it('should not update an employee when not exists', async () => {
    const { sut, findEmployeeByIdRepositoryMock } = createSut();
    jest
      .spyOn(findEmployeeByIdRepositoryMock, 'execute')
      .mockResolvedValue(undefined);

    await expect(
      sut.execute('bug', {
        name: 'Bug',
        password: 'Bug',
      } as UpdateEmployeeDTO),
    ).rejects.toThrow();
  });

  it('should not update an employee with email from another employee', async () => {
    const { sut, findEmployeeByEmailRepositoryMock } = createSut();
    jest.spyOn(findEmployeeByEmailRepositoryMock, 'execute').mockResolvedValue({
      id: 'another',
    } as Employee);

    await expect(
      sut.execute('bug', {
        name: 'Bug',
        password: 'Bug',
      } as UpdateEmployeeDTO),
    ).rejects.toThrow();
  });

  it('should not update an employee with CPF from another employee', async () => {
    const { sut, findEmployeeByCPFRepositoryMock } = createSut();
    jest.spyOn(findEmployeeByCPFRepositoryMock, 'execute').mockResolvedValue({
      id: 'another',
    } as Employee);

    await expect(
      sut.execute('bug', {
        name: 'Bug',
        password: 'Bug',
      } as UpdateEmployeeDTO),
    ).rejects.toThrow();
  });
});
