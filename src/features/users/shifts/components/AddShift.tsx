import { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField } from '@/components/Form';
import { useAddShift } from '../api/addShifts';
import { Shift, shiftSchema } from '../types/index';
import { useUserStore } from '@/stores/userStore';
import FormActions from '@/components/Form/FormActions/FormActions';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { useTranslation } from 'react-i18next';

const AddShift = () => {
  const { t } = useTranslation();
  const addMutation = useAddShift();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const companyId = useUserStore((state) => state.user?.company) ?? 0;

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: Shift) => {
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
        {t('common.title.add_shift')}
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('common.title.add_shift')}>
        <>
          <div className="mt-2">
            <Form<Shift>
              onSubmit={handleSubmit}
              schema={shiftSchema}
              onDirty={(e) => setIsDirty(e)}
            >
              {({ register, formState }) => (
                <>
                  <InputField
                    type="text"
                    label={t('common.form_label.name')}
                    placeholder={t('common.placeholder.enter_shift_name')}
                    required
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <InputField
                    type="text"
                    label={t('common.form_label.code')}
                    required
                    placeholder={t('common.placeholder.enter_shift_code')}
                    error={formState.errors['code']}
                    registration={register('code')}
                  />
                  <InputField
                    type="time"
                    label={t('common.form_label.start_time')}
                    placeholder={t('common.placeholder.select_start_time')}
                    required
                    error={formState.errors['startTime']}
                    registration={register('startTime')}
                  />
                  <InputField
                    type="time"
                    label={t('common.form_label.end_time')}
                    placeholder={t('common.placeholder.select_end_time')}
                    required
                    error={formState.errors['endTime']}
                    registration={register('endTime')}
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

export default AddShift;
