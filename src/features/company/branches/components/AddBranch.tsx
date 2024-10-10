import { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, SelectField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { useUserStore } from '@/stores/userStore';
import { useAddBranch } from '../api/addBranches';
import { branchSchema, Branch } from '../types/index';
import FormActions from '@/components/Form/FormActions/FormActions';
import { useBranchList } from '@/api/getBranchList';
import { useTranslation } from 'react-i18next';
import { BRANCH_TYPE } from '@/utils/constants';

const AddBranch = () => {
  const { t } = useTranslation();
  const addMutation = useAddBranch();
  const { data: branches } = useBranchList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const companyId = useUserStore((state) => state.user?.company) ?? 0;

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: Branch) => {
    inputValues.company = companyId;

    try {
      await addMutation.mutateAsync(inputValues);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center gap-x-2 rounded-md whitespace-nowrap bg-primary-turquoise px-4 h-12 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75"
      >
        <TiPlus name="plus" className="w-7 h-7" />
        {t('common.title.add_branch')}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isDirty={isDirty}
        title={t('common.title.add_branch')}
      >
        <>
          <div className="mt-2">
            <Form<Branch>
              onSubmit={handleSubmit}
              schema={branchSchema}
              onDirty={(e) => setIsDirty(e)}
            >
              {({ register, formState }) => (
                <>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label={t('common.form_label.name')}
                        placeholder={t('common.placeholder.enter_branch_name')}
                        required
                        error={formState.errors['name']}
                        registration={register('name')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="email"
                        label={t('common.form_label.email')}
                        placeholder={t('common.placeholder.enter_email')}
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
                        label={t('common.form_label.mobile')}
                        placeholder={t('common.placeholder.enter_mobile_no')}
                        required
                        error={formState.errors['mobileNo']}
                        registration={register('mobileNo')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        label={t('common.form_label.phone')}
                        placeholder={t('common.placeholder.enter_mobile_no')}
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
                        error={formState.errors['status']}
                        registration={register('status')}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label={t('common.form_label.address')}
                    placeholder={t('common.placeholder.enter_address')}
                    error={formState.errors['address']}
                    registration={register('address')}
                  />
                  <InputField
                    type="number"
                    label={t('common.form_label.space')}
                    required
                    placeholder={t('common.placeholder.enter_space')}
                    error={formState.errors['space']}
                    registration={register('space')}
                  />
                  <InputCheckboxField
                    variant="switch"
                    label={t('common.form_label.active')}
                    checked={true}
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

export default AddBranch;
