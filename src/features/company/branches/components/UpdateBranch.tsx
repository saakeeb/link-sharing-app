import { useState } from 'react';
import { useBranchList } from '@/api/getBranchList';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, SelectField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useTranslation } from 'react-i18next';
import { useUpdateBranch } from '../api/updateBranches';
import { branchSchema, type Branch, BranchProps } from '../types/index';
import { BRANCH_TYPE } from '@/utils/constants';

const UpdateBranch: React.FC<BranchProps> = ({ data }) => {
  const { t } = useTranslation();
  const updateMutation = useUpdateBranch();
  const { data: branches } = useBranchList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (inputValues: Branch) => {
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
          type="button"
          onClick={openModal}
          className="w-7 h-7 bg-secondary-yellow rounded-full flex items-center justify-center group"
          title="Edit"
        >
          <HeroIcon name="edit" className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title="Change Branch">
        <>
          <div className="mt-2">
            <Form<Branch>
              onSubmit={handleSubmit}
              schema={branchSchema}
              onDirty={(e) => setIsDirty(e)}
              options={{
                defaultValues: {
                  ...data,
                  parent: data.parent ? data.parent.toString() : '',
                  space: data.space.toString(),
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Name"
                        placeholder="Enter branch name"
                        required
                        error={formState.errors['name']}
                        registration={register('name')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="email"
                        label="Email"
                        placeholder="Enter email"
                        required
                        error={formState.errors['email']}
                        registration={register('email')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Mobile"
                        placeholder="Enter mobile no."
                        required
                        error={formState.errors['mobileNo']}
                        registration={register('mobileNo')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Phone"
                        placeholder="Enter phone no."
                        error={formState.errors['phoneNo']}
                        registration={register('phoneNo')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <SelectField
                        label={t('common.form_label.parent')}
                        placeholder={t('common.placeholder.select_parent')}
                        defaultValue={data.parent}
                        options={branches as []}
                        error={formState.errors['parent']}
                        registration={register('parent')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label={t('common.form_label.status')}
                        placeholder={t('common.placeholder.select_status')}
                        options={BRANCH_TYPE}
                        defaultValue={data.parent}
                        error={formState.errors['status']}
                        registration={register('status')}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label="Address"
                    placeholder="Enter Address"
                    error={formState.errors['address']}
                    registration={register('address')}
                  />
                  <InputField
                    type="number"
                    label="Space"
                    placeholder="Enter space"
                    error={formState.errors['space']}
                    registration={register('space')}
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

export default UpdateBranch;
