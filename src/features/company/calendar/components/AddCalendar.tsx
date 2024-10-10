import { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, SelectField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { useUserStore } from '@/stores/userStore';
import { useAddCalendar } from '../api/addCalendar';
import { calendarSchema, CalendarData } from '../types/index';
import { YEARS } from '@/utils/constants';
import { useDayTypeList } from '@/api/getDayTypeList';

const AddCalendar = () => {
  const { t } = useTranslation();
  const addMutation = useAddCalendar();
  const { data: dayTypes } = useDayTypeList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const companyId = useUserStore((state) => state.user?.company) ?? 0;

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: CalendarData) => {
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
        {t('pages.add_calendar')}
      </button>
      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('pages.add_calendar')}>
        <>
          <div className="mt-2">
            <Form<CalendarData>
              onSubmit={handleSubmit}
              schema={calendarSchema}
              onDirty={(e) => setIsDirty(e)}
            >
              {({ register, formState }) => (
                <>
                  <InputField
                    type="text"
                    label={t('common.form_label.event_name')}
                    placeholder={t('common.placeholder.enter_event_name')}
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <SelectField
                    label={t('common.form_label.year')}
                    required
                    placeholder={t('common.placeholder.select_year')}
                    options={YEARS}
                    error={formState.errors['year']}
                    registration={register('year')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="date"
                        label={t('common.form_label.date')}
                        placeholder={t('common.placeholder.select_date')}
                        required
                        error={formState.errors['date']}
                        registration={register('date')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label={t('common.form_label.day_type')}
                        placeholder={t('common.placeholder.select_day_type')}
                        options={dayTypes as []}
                        error={formState.errors['dayType']}
                        registration={register('dayType')}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label={t('common.form_label.description')}
                    placeholder={t('common.placeholder.enter_description')}
                    error={formState.errors['description']}
                    registration={register('description')}
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

export default AddCalendar;
