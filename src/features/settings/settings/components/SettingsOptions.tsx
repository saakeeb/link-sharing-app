import { useState } from 'react';
import { Form, InputField, SelectField } from '@/components/Form';
import { IoMdSave } from 'react-icons/io';
import { useUserStore } from '@/stores/userStore';
import { DATE_FORMATS, DATE_TIME_FORMATS, ORDER_BY, TIME_FORMATS } from '@/utils/constants';
import { useUpdateSettings } from '../api/updateSettings';
import { Settings, settingsSchema } from '../types';
import { useTranslation } from 'react-i18next';
import { isObjEmpty } from '@/utils/validation';

type SettingsOptionsProps = {
  data: Settings;
};

const SettingsOptions = ({ data }: SettingsOptionsProps) => {
  const { t } = useTranslation();
  const updateMutation = useUpdateSettings();
  const companyId = useUserStore((state) => state.user?.company) ?? 0;

  const [isDirty, setIsDirty] = useState<boolean>(false);

  const onSubmit = async (inputValues: Settings) => {
    data.company = companyId;

    try {
      await updateMutation.mutateAsync({ ...data, ...inputValues });
    } catch (error) {
      console.error(error);
    }
  };

  if (data && isObjEmpty(data)) return null;

  return (
    <>
      <Form<Settings>
        onSubmit={onSubmit}
        schema={settingsSchema}
        onDirty={(e) => setIsDirty(e)}
        options={{
          defaultValues: {
            ...data,
            decimalPlaces: data?.decimalPlaces?.toString() ?? '',
            shortTermParkingTime: data?.shortTermParkingTime?.toString() ?? '',
          },
        }}
      >
        {({ handleSubmit, register, formState, reset }) => (
          <>
            <div className="grid grid-cols-12 gap-y-4">
              <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  {t('common.form_label.date_format')}
                  <span className="text-left ml-1 mr-4">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <SelectField
                    placeholder="Select date format"
                    options={DATE_FORMATS}
                    defaultValue={data?.dateFormat}
                    error={formState.errors['dateFormat']}
                    registration={register('dateFormat')}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  {t('common.form_label.date_format_time')}
                  <span className="text-left ml-1 mr-4">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <SelectField
                    placeholder="Select date time format"
                    options={DATE_TIME_FORMATS}
                    defaultValue={data?.dateTimeFormat}
                    error={formState.errors['dateTimeFormat']}
                    registration={register('dateTimeFormat')}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  {t('common.form_label.time_format')}
                  <span className="text-left ml-1 mr-4">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <SelectField
                    placeholder="Select time format"
                    options={TIME_FORMATS}
                    defaultValue={data?.timeFormat}
                    error={formState.errors['timeFormat']}
                    registration={register('timeFormat')}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  {t('common.form_label.order_by')}
                  <span className="text-left ml-1 mr-4">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <SelectField
                    placeholder="Select sorting order"
                    options={ORDER_BY}
                    defaultValue={data?.sortBy}
                    error={formState.errors['sortBy']}
                    registration={register('sortBy')}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  {t('common.form_label.decimal_places')}
                  <span className="text-left ml-1 mr-4">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    maxLength={1}
                    placeholder="Enter number of decimal places"
                    error={formState.errors['decimalPlaces']}
                    registration={register('decimalPlaces')}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  {t('common.form_label.short_term_parking')}
                  <span className="text-left ml-1 mr-4">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    placeholder="Enter short term parking time"
                    error={formState.errors['shortTermParkingTime']}
                    registration={register('shortTermParkingTime')}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <button
                  type="submit"
                  disabled={!isDirty || formState.isSubmitting}
                  className="ml-auto flex items-center justify-center rounded-md whitespace-nowrap bg-primary-turquoise px-5 h-12 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75  disabled:opacity-50 disabled:hover:bg-primary-turquoise disabled:cursor-not-allowed"
                  onClick={handleSubmit(async (values) => {
                    await onSubmit(values);
                    reset({}, { keepValues: true });
                    setIsDirty(false);
                  })}
                >
                  <IoMdSave className="h-8 w-6 mr-1" />
                  <span>
                    {formState.isSubmitting
                      ? `${t('common.actions.saving')}`
                      : `${t('common.actions.save')}`}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default SettingsOptions;
