import { IPaginationOptions } from '../types';

interface IOptionsResult {
  page: number;
  limit: number;
  skip: number;
  sortOrder: 1 | -1;
  sortBy: string;
}
export const calculatePagination = (options: IPaginationOptions): IOptionsResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 12;
  const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
  const sortBy = options.sortBy || 'createdAt';
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortOrder,
    sortBy,
  };
};
