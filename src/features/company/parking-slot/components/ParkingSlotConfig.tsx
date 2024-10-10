import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdSave } from 'react-icons/io';
import { Form, InputField } from '@/components/Form';
import { useUserStore } from '@/stores/userStore';
import { useUpdateParkingSlot } from '../api/updateParkingSlot';
import { Slot, parkingSlotSchema } from '../types';
import { isObjEmpty } from '@/utils/validation';

type ParkingSlotConfigProps = {
  data: Slot;
};

const ParkingSlotConfig = ({ data }: ParkingSlotConfigProps) => {
  const { t } = useTranslation();
  const updateMutation = useUpdateParkingSlot();
  const companyId = useUserStore((state) => state.user?.company) ?? 0;
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const calculateTotalSpace = (space: number, disabilitySpace: number, freeSpace: number) => {
    const parsedSpace = space;
    const parsedDisabilitySpace = disabilitySpace;
    const parsedFreeSpace = freeSpace;
    const totalSpace = parsedSpace - parsedDisabilitySpace - parsedFreeSpace;

    return totalSpace;
  };

  const handleSubmit = async (inputValues: Slot) => {
    inputValues.company = companyId;

    try {
      await updateMutation?.mutateAsync({ ...data, ...inputValues });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (field: string, value: number, setValue: any, watch: any) => {
    const newSpace = field === 'space' ? value : Number(watch('space') || 0);
    const newDisabilitySpace =
      field === 'disabilitySpace' ? value : Number(watch('disabilitySpace') || 0);
    const newFreeSpace = field === 'freeSpace' ? value : Number(watch('freeSpace') || 0);

    const total = calculateTotalSpace(newSpace, newDisabilitySpace, newFreeSpace);
    setValue('totalSpace', total);
  };

  if (data && isObjEmpty(data)) return null;

  return (
    <>
      <Form<Slot>
        onSubmit={handleSubmit}
        schema={parkingSlotSchema}
        onDirty={(e) => setIsDirty(e)}
        options={{
          defaultValues: {
            ...data,
          },
        }}
      >
        {({ register, formState, setValue, watch }) => (
          <>
            <div className="grid grid-cols-12 gap-y-4">
              <div className="col-span-12 xl:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  <span>{t('common.form_label.space')} </span>
                  <span className="text-bold !text-red-500">*</span>
                  <span className="text-left ml-3 mr-5">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right required">
                  <InputField
                    type="number"
                    placeholder="Enter space"
                    error={formState.errors['space']}
                    registration={{
                      ...register('space', {
                        setValueAs: (value) => (value === '' ? null : Number(value)),
                      }),
                    }}
                    onChange={(e) =>
                      handleInputChange('space', Number(e.target.value), setValue, watch)
                    }
                  />
                </div>
              </div>
              <div className="col-span-12 xl:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  <span>{t('common.form_label.disability_space')}</span>
                  <span className="text-bold !text-red-500">*</span>
                  <span className="text-left ml-3 mr-5">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    placeholder="Enter disability space quantity"
                    error={formState.errors['disabilitySpace']}
                    registration={{
                      ...register('disabilitySpace', {
                        setValueAs: (value) => (value === '' ? null : Number(value)),
                      }),
                    }}
                    onChange={(e) =>
                      handleInputChange('disabilitySpace', Number(e.target.value), setValue, watch)
                    }
                  />
                </div>
              </div>
              <div className="col-span-12 xl:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  <span>{t('common.form_label.free_space')}</span>
                  <span className="text-bold !text-red-500">*</span>
                  <span className="text-left ml-3 mr-5">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    placeholder="Enter free space quantity"
                    error={formState.errors['freeSpace']}
                    registration={{
                      ...register('freeSpace', {
                        setValueAs: (value) => (value === '' ? null : Number(value)),
                      }),
                    }}
                    onChange={(e) =>
                      handleInputChange('freeSpace', Number(e.target.value), setValue, watch)
                    }
                  />
                </div>
              </div>
              <div className="col-span-12 xl:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  <span>{t('common.form_label.total_space')}</span>
                  <span className="text-bold !text-red-500">*</span>
                  <span className="text-left ml-3 mr-5">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    placeholder="Enter total space quantity"
                    error={formState.errors['totalSpace']}
                    registration={register('totalSpace')}
                    disabled
                  />
                </div>
              </div>
              <div className="col-span-12 xl:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  <span>{t('common.form_label.disability_occupied_space')}</span>
                  <span className="text-bold !text-red-500">*</span>
                  <span className="text-left ml-3 mr-5">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    placeholder="Enter disability occupied space quantity"
                    error={formState.errors['disabilityOccupiedSpace']}
                    registration={{
                      ...register('disabilityOccupiedSpace', {
                        setValueAs: (value) => (value === '' ? null : Number(value)),
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="col-span-12 xl:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  <span>{t('common.form_label.free_occupied_space')}</span>
                  <span className="text-bold !text-red-500">*</span>
                  <span className="text-left ml-3 mr-5">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    placeholder="Enter free occupied space quantity"
                    error={formState.errors['freeOccupiedSpace']}
                    registration={{
                      ...register('freeOccupiedSpace', {
                        setValueAs: (value) => (value === '' ? null : Number(value)),
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="col-span-12 xl:col-span-10 grid grid-cols-12 lg:grid-cols-10 items-center">
                <p className="col-span-12 md:col-span-4 text-left md:text-right text-sm md:text-base font-medium text-gray-700">
                  <span>{t('common.form_label.total_occupied_space')}</span>
                  <span className="text-bold !text-red-500">*</span>
                  <span className="text-left ml-3 mr-5">:</span>
                </p>
                <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 text-left md:text-right">
                  <InputField
                    type="number"
                    placeholder="Enter total occupied space quantity"
                    error={formState.errors['totalOccupiedSpace']}
                    registration={{
                      ...register('totalOccupiedSpace', {
                        setValueAs: (value) => (value === '' ? null : Number(value)),
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="col-span-12 xl:col-span-10">
                <button
                  type="submit"
                  disabled={!isDirty || formState.isSubmitting}
                  className="ml-auto flex items-center justify-center rounded-md whitespace-nowrap bg-primary-turquoise h-12 px-5 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75  disabled:opacity-50 disabled:hover:bg-primary-turquoise disabled:cursor-not-allowed"
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

export default ParkingSlotConfig;
