import { DataValidator } from '../../../utils/data-validator/data-validator';
import { IPagination } from '../../../utils/paginate/interfaces/pagination-interface';

import { Employee } from '../../../entities/employee-entity';

import { IFindAllEmployeesWithPaginationRepository } from '../../../repositories/employees/find-all-with-pagination/find-all-with-pagination-repository-interface';

import { FindAllEmployeesWithPaginationService } from './find-all-with-pagination-service';

const createSut = () => {
  const dataValidatorMock = jest.mocked<DataValidator>(new DataValidator());

  const findAllEmployeesWithPaginationRepositoryMock =
    jest.mocked<IFindAllEmployeesWithPaginationRepository>({
      execute: async () => {
        return {
          items: [{}],
          metadata: {
            currentPage: 1,
            quantityItemsReturned: 0,
            itemsPerPage: 10,
            totalItems: 0,
            totalPages: 1,
          },
        } as IPagination<Employee>;
      },
    });

  const sut = new FindAllEmployeesWithPaginationService(
    dataValidatorMock,
    findAllEmployeesWithPaginationRepositoryMock,
  );

  return {
    sut,
    findAllEmployeesWithPaginationRepositoryMock,
    dataValidatorMock,
  };
};

describe('FindAllEmployeesWithPaginationService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return employees with pagination', async () => {
    const { sut } = createSut();

    await expect(
      sut.execute({
        limit: '1',
        page: '1',
      }),
    ).resolves.not.toThrow();
  });

  it('should call findAllEmployeesWithPaginationRepository.execute once', async () => {
    const { sut, findAllEmployeesWithPaginationRepositoryMock } = createSut();
    const findAllEmployeesWithPaginationRepositoryMockSpy = jest.spyOn(
      findAllEmployeesWithPaginationRepositoryMock,
      'execute',
    );

    await sut.execute({
      limit: '1',
      page: '1',
    });

    expect(
      findAllEmployeesWithPaginationRepositoryMockSpy,
    ).toHaveBeenCalledTimes(1);
  });

  it('should call findAllEmployeesWithPaginationRepository.execute with page and limit', async () => {
    const { sut, findAllEmployeesWithPaginationRepositoryMock } = createSut();
    const findAllEmployeesWithPaginationRepositoryMockSpy = jest.spyOn(
      findAllEmployeesWithPaginationRepositoryMock,
      'execute',
    );

    await sut.execute({
      limit: '1',
      page: '1',
    });

    expect(
      findAllEmployeesWithPaginationRepositoryMockSpy,
    ).toHaveBeenCalledTimes(1);
  });
});
