import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, ConfirmationDialog } from '@/components/Elements';
import { useDeleteShift } from '../api/deleteShifts';
import { ShiftProps } from '../types';

const DeleteShift: React.FC<ShiftProps> = ({ data }) => {
  const deleteMutation = useDeleteShift();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ConfirmationDialog
      isDone={false}
      icon="delete"
      title="Are you sure?"
      body={
        <>
          <p>
            Are you sure you want to delete this shift:{' '}
            <span className="font-semibold text-center text-primary-dark-gray">{data.name}</span>?
            This process cannot be undone.
          </p>
        </>
      }
      triggerButton={
        <div
          role="button"
          className="w-7 h-7 bg-secondary-blood-orange rounded-full flex items-center justify-center group"
          title="Delete"
        >
          <TrashIcon className="h-4 w-4 rounded-full" color="white" />
        </div>
      }
      confirmButton={
        <Button isLoading={false} type="button" className="bg-red-600" onClick={handleDelete}>
          Delete
        </Button>
      }
    />
  );
};

export default DeleteShift;
