import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { productSchema, Product } from '../types';

const CUSTOMER_URL = 'report/products/';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(CUSTOMER_URL);
    const products = response.data;

    console.log(products, 'products');

    // Validate the response data using Zod schema
    const parsedData = productSchema.array().safeParse(products);
    console.log(parsedData, 'parsedData');

    if (!parsedData.success) {
      console.error(parsedData.error);
      throw new Error('Invalid data format');
    }

    return parsedData.data;
  } catch (error) {
    console.error('Failed to fetch maintenance plans:', error);
    throw new Error('Failed to fetch maintenance plans');
  }
};

type QueryFnType = typeof getProducts;

type UseProductsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useProducts = ({ config }: UseProductsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['products'],
    queryFn: getProducts,
    ...config,
  });
};
