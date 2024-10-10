import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, ConfirmationDialog } from '@/components/Elements';
import { useDeleteMenu } from '../api/deleteMenus';
import { MenuProps } from '../types';

const DeleteMenu: React.FC<MenuProps> = ({ data }) => {
  const deleteMutation = useDeleteMenu();

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
      title="Are you sure?"
      body={
        <>
          <p>
            Are you sure you want to delete this menu:{' '}
            <span className="font-semibold text-center text-primary-dark-gray">{data.name}</span>?
            This process cannot be undone.
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
          Delete Menu
        </Button>
      }
    />
  );
};

export default DeleteMenu;
