import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Branch, BranchDTO } from '../types';

const UPDATE_BRANCH_URL = (id: number) => `/app/branches/${id}/`;

const updateBranch = async (branch: Branch): Promise<Branch> => {
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

    const { data } = await axios.patch<BranchDTO>(UPDATE_BRANCH_URL(branchDto.id), branchDto);

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
    console.error('Error occurred while updating branch:', error);
    throw new Error('Failed to update branch');
  }
};

type UseUpdateBranchOptions = {
  config?: MutationConfig<typeof updateBranch>;
};

export const useUpdateBranch = ({ config }: UseUpdateBranchOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating branch',
        message: error.message || 'There was an error attempting to update the branch.',
      });
    },
    ...config,
  });
};
