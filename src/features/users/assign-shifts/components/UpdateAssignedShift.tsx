import { useState } from 'react';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, SelectField } from '@/components/Form';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useUpdateAssignedShift } from '../api/updateAssignedShifts';
import { useUserList } from '@/api/getUserList';
import { AssignedShift, AssignedShiftProps, AssignedShiftSchema } from '../types/index';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import FormActions from '@/components/Form/FormActions/FormActions';
import { useShiftList } from '@/api/getShiftList';

const UpdateAssignedShift: React.FC<AssignedShiftProps> = ({ data }) => {
  const updateMutation = useUpdateAssignedShift();
  const { data: operators } = useUserList();
  const { data: shifts } = useShiftList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (inputValues: AssignedShift) => {
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

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title="Change Assigned Shift">
        <>
          <div className="mt-2">
            <Form<AssignedShift>
              onSubmit={handleSubmit}
              schema={AssignedShiftSchema}
              onDirty={(e) => setIsDirty(e)}
              options={{
                defaultValues: {
                  ...data,
                  operator: data.operator ? data.operator.toString() : '',
                  shift: data.shift ? data.shift.toString() : '',
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <SelectField
                    label="Operator Name"
                    required
                    placeholder="Select an operator"
                    defaultValue={data.operator}
                    options={operators as []}
                    error={formState.errors['operator']}
                    registration={register('operator')}
                  />

                  <SelectField
                    label="Shift"
                    required
                    placeholder="Select shift"
                    defaultValue={data.shift}
                    options={shifts as []}
                    error={formState.errors['shift']}
                    registration={register('shift')}
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

export default UpdateAssignedShift;
