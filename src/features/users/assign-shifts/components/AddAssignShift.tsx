import { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, MultiSelectField, SelectField } from '@/components/Form';
import { AssignedShift, AssignedShiftSchema } from '../types/index';
import { useUserStore } from '@/stores/userStore';
import { useAddAssignedShift } from '../api/addAssignedShifts';
import FormActions from '@/components/Form/FormActions/FormActions';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { useUserList } from '@/api/getUserList';
import { useShiftList } from '@/api/getShiftList';
import { useTranslation } from 'react-i18next';

const AddAssignedShift = () => {
  const { t } = useTranslation();
  const addMutation = useAddAssignedShift();
  const { data: operators } = useUserList();
  const { data: shifts } = useShiftList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const companyId = useUserStore((state) => state.user?.company) ?? 0;

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: AssignedShift) => {
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
        {t('common.title.assign_shift')}
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('common.title.assign_shift')}>
        <>
          <div className="mt-2">
            <Form<AssignedShift>
              onSubmit={handleSubmit}
              schema={AssignedShiftSchema}
              onDirty={(e) => setIsDirty(e)}
            >
              {({ register, formState, control }) => (
                <>
                  <SelectField
                    label={t('common.form_label.operator_name')}
                    required
                    placeholder={t('common.placeholder.select_an_operator')}
                    options={operators as []}
                    error={formState.errors['operator']}
                    registration={register('operator')}
                  />
                  <SelectField
                    label={t('common.form_label.shift')}
                    required
                    placeholder={t('common.placeholder.select_shift')}
                    options={shifts as []}
                    error={formState.errors['shift']}
                    registration={register('shift')}
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

export default AddAssignedShift;
