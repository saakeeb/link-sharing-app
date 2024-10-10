import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Branch, BranchDTO } from '../types';

const ADD_BRANCH_URL = '/app/branches/';

const addBranch = async (branch: Branch): Promise<Branch> => {
  try {
    const branchDto: BranchDTO = {
      id: branch.id,
      company: branch.company,
      name: branch.name,
      parent: branch.parent,
      status: branch.status,
      email: branch.email,
      address: branch.address,
      mobile_no: branch.mobileNo,
      phone_no: branch.phoneNo,
      space: branch.space,
      is_active: branch.isActive,
      created_at: branch.createdAt,
    };

    const { data } = await axios.post<BranchDTO>(ADD_BRANCH_URL, branchDto);

    const branchData: Branch = {
      id: data.id,
      company: data.company,
      name: data.name,
      email: data.email,
      parent: data.parent,
      status: data.status,
      mobileNo: data.mobile_no,
      phoneNo: data.phone_no,
      address: data.address,
      space: data.space,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return branchData;
  } catch (error) {
    console.error('Error occurred while adding branch:', error);
    throw new Error('Failed to add branch');
  }
};

type UseAddBranchOptions = {
  config?: MutationConfig<typeof addBranch>;
};

export const useAddBranch = ({ config }: UseAddBranchOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: addBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      addNotification({
        type: 'success',
        title: 'Branch has been added successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error adding branch',
        message: error.message || 'There was an error attempting to add the branch.',
      });
    },
    ...config,
  });
};
