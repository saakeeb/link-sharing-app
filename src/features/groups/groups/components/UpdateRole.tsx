import { useState } from 'react';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useUpdateRole } from '../api/updateRoles';
import { roleSchema, Role, RoleProps } from '../types/index';

const UpdateRole: React.FC<RoleProps> = ({ data }) => {
  const updateMutation = useUpdateRole();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (inputValues: Role) => {
    try {
      updateMutation.mutateAsync({ ...data, ...inputValues });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-7 h-7 bg-secondary-yellow rounded-full flex items-center justify-center group"
        title="Edit"
      >
        <HeroIcon name="edit" className="w-4 h-4 text-gray-700" />
      </button>
      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title="Change Group">
        <>
          <div className="mt-2">
            <Form<Role>
              onSubmit={handleSubmit}
              schema={roleSchema}
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
                    placeholder="Enter role name"
                    required
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <InputField
                    type="text"
                    label="Code"
                    placeholder="Enter role code"
                    required
                    error={formState.errors['code']}
                    registration={register('code')}
                  />
                  <TextAreaField
                    label="Description"
                    placeholder="Enter role description"
                    error={formState.errors['description']}
                    registration={register('description')}
                  />
                  <InputCheckboxField
                    variant="switch"
                    checked={data.isActive}
                    label="Active"
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

export default UpdateRole;
