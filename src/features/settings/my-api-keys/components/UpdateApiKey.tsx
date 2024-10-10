import { useState } from 'react';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useUpdateApiKey } from '../api/updateApiKey';
import { apiKeySchema, ApiKey, ApiKeyProps } from '../types/index';

const UpdateApiKey: React.FC<ApiKeyProps> = ({ data }) => {
  const updateMutation = useUpdateApiKey();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: ApiKey) => {
    try {
      await updateMutation.mutateAsync({ ...data, ...inputValues });
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
            <Form<ApiKey>
              onSubmit={handleSubmit}
              schema={apiKeySchema}
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
                    placeholder="Enter api key name"
                    required
                    error={formState.errors['name']}
                    registration={register('name')}
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

export default UpdateApiKey;
