import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Branch, BranchDTO } from '../types';

const BRANCH_URL = '/app/branches/';

export const getBranches = async (): Promise<Branch[]> => {
  try {
    const { data } = await axios.get<BranchDTO[]>(BRANCH_URL);

    const branches = data.map((branchDTO: BranchDTO) => {
      const {
        id,
        name,
        company,
        parent,
        status,
        email,
        parent_name: parentName,
        mobile_no: mobileNo,
        phone_no: phoneNo,
        space,
        address,
        is_active: isActive,
        created_at: createdAt,
      } = branchDTO;

      return {
        id,
        company,
        name,
        parent,
        status,
        parentName,
        email,
        mobileNo,
        phoneNo,
        address,
        space,
        isActive,
        createdAt,
      };
    });

    return branches;
  } catch (error) {
    console.error('Error occurred while fetching branches:', error);
    throw new Error('Failed to fetch branches');
  }
};

type QueryFnType = typeof getBranches;

type UseBranchesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useBranches = ({ config }: UseBranchesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['branches'],
    queryFn: () => getBranches(),
  });
};
