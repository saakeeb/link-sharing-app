import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, ConfirmationDialog } from '@/components/Elements';
import { useDeleteUser } from '../api/deleteUser';
import { UserProps } from '../types';

export const DeleteUser: React.FC<UserProps> = ({ data }) => {
  const deleteMutation = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ConfirmationDialog
      icon="delete"
      title="Delete User"
      body={
        <>
          <p>
            Are you sure you want to delete this user:{' '}
            <span className="font-semibold text-center text-primary-dark-gray">
              {data.firstName} [{data.lastName}]
            </span>
            ?
          </p>
        </>
      }
      triggerButton={
        <button
          className="w-7 h-7 bg-secondary-blood-orange rounded-full flex items-center justify-center group"
          title="Delete"
        >
          <TrashIcon className="h-4 w-4 rounded-full" color="white" />
        </button>
      }
      confirmButton={
        <Button
          isLoading={deleteMutation.isLoading}
          type="button"
          className="bg-red-600"
          onClick={handleDelete}
        >
          Delete User
        </Button>
      }
    />
  );
};
