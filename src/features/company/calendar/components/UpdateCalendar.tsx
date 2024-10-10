import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, SelectField, TextAreaField } from '@/components/Form';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useUpdateCalendar } from '../api/updateCalendar';
import { calendarSchema, CalendarData, CalendarProps } from '../types/index';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { YEARS } from '@/utils/constants';
import { useDayTypeList } from '@/api/getDayTypeList';

const UpdateCalendar: React.FC<CalendarProps> = ({ data }) => {
  const { t } = useTranslation();
  const updateMutation = useUpdateCalendar();
  const { data: dayTypes } = useDayTypeList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (inputValues: CalendarData) => {
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
        type="button"
        onClick={openModal}
        className="w-7 h-7 bg-secondary-yellow rounded-full flex items-center justify-center group"
        title="Edit"
      >
        <HeroIcon name="edit" className="w-4 h-4 text-gray-700" />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isDirty={isDirty}
        title={t('pages.edit_calendar')}
      >
        <>
          <div className="mt-2">
            <Form<CalendarData>
              onSubmit={handleSubmit}
              schema={calendarSchema}
              onDirty={(e) => setIsDirty(e)}
              options={{
                defaultValues: {
                  ...data,
                  year: data.year ? data.year.toString() : data.year,
                  dayType: data.dayType ? data.dayType.toString() : data.dayType,
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <InputField
                    type="text"
                    label="Event Name"
                    placeholder="Enter event name"
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <SelectField
                    label="Year"
                    required
                    placeholder="Select year"
                    options={YEARS}
                    error={formState.errors['year']}
                    registration={register('year')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="date"
                        label="Date"
                        placeholder="Select date"
                        required
                        error={formState.errors['date']}
                        registration={register('date')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label="Day type"
                        placeholder="Select day type"
                        options={dayTypes as []}
                        error={formState.errors['dayType']}
                        registration={register('dayType')}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label="Description"
                    placeholder="Enter description"
                    error={formState.errors['description']}
                    registration={register('description')}
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

export default UpdateCalendar;
