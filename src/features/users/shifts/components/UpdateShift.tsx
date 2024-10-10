import { useState } from 'react';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField } from '@/components/Form';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useUpdateShift } from '../api/updateShifts';
import { Shift, ShiftProps, shiftSchema } from '../types/index';
import FormActions from '@/components/Form/FormActions/FormActions';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';

const UpdateShift: React.FC<ShiftProps> = ({ data }) => {
  const updateMutation = useUpdateShift();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (inputValues: Shift) => {
    try {
      updateMutation.mutateAsync({ ...data, ...inputValues });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <button
          onClick={openModal}
          className="w-7 h-7 bg-secondary-yellow rounded-full flex items-center justify-center group"
          title="Edit"
        >
          <HeroIcon name="edit" className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title="Change Shift">
        <>
          <div className="mt-2">
            <Form<Shift>
              onSubmit={handleSubmit}
              schema={shiftSchema}
              onDirty={(e) => setIsDirty(e)}
              options={{
                defaultValues: {
                  ...data,
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <InputField
                    type="text"
                    label="Name"
                    placeholder="Enter shift name"
                    required
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <InputField
                    type="text"
                    label="Code"
                    required
                    placeholder="Enter shift code"
                    error={formState.errors['code']}
                    registration={register('code')}
                  />
                  <InputField
                    type="time"
                    label="Start Time"
                    placeholder="Select start time"
                    required
                    error={formState.errors['startTime']}
                    registration={register('startTime')}
                  />
                  <InputField
                    type="time"
                    label="End time"
                    placeholder="Select end time"
                    required
                    error={formState.errors['endTime']}
                    registration={register('endTime')}
                  />
                  <InputCheckboxField
                    variant="switch"
                    label="Active"
                    checked={data.isActive}
                    error={formState.errors['isActive']}
                    registration={register('isActive')}
                  />
                  <div className="mt-4">
                    <FormActions
                      isDirty={isDirty}
                      isSubmitting={formState.isSubmitting}
                      closeModal={closeModal}
                    />
                  </div>
                </>
              )}
            </Form>
          </div>
        </>
      </Modal>
    </>
  );
};

export default UpdateShift;
