import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCountryList } from '@/api/getCountryList';
import { useCurrencyList } from '@/api/getCurrencyList';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, InputImageField, SelectField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { LANGUAGES } from '@/utils/constants';
import { useUpdateCompany } from '../api/updateCompanies';
import { Company, CompanyProps, companySchema } from '../types/index';
import { useImageUpload } from '@/api/uploadImage';

const UpdateCompany: React.FC<CompanyProps> = ({ data }) => {
  const { t } = useTranslation();
  const uploadMutation = useImageUpload();
  const updateMutation = useUpdateCompany();
  const { isLoading: isCountryLoading, data: countries } = useCountryList();
  const { isLoading: isCurrencyLoading, data: currencies } = useCurrencyList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: Company) => {
    if (typeof inputValues.logo === 'object') {
      const logoFile = inputValues.logo && inputValues.logo.length > 0 ? inputValues.logo[0] : null;
      try {
        if (logoFile) {
          inputValues.logo = (
            await uploadMutation.mutateAsync({ image: logoFile, param: 'logo' })
          )?.image;
        } else {
          inputValues.logo = null;
        }
        await updateMutation.mutateAsync({ ...data, ...inputValues });
        closeModal();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        inputValues.logo = null;
        await updateMutation.mutateAsync({ ...data, ...inputValues });
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isCountryLoading || isCurrencyLoading) return null;

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

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('pages.edit_company')}>
        <>
          <div className="mt-2">
            <Form<Company>
              onSubmit={handleSubmit}
              schema={companySchema}
              onDirty={(e) => setIsDirty(e)}
              options={{
                defaultValues: {
                  ...data,
                  country: data.country ? data.country.toString() : '',
                  currency: data.currency ? data.currency.toString() : '',
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <InputImageField
                    type="file"
                    src={data.logo}
                    error={
                      formState.errors['logo']
                        ? (formState.errors['logo'] as FieldError)
                        : undefined
                    }
                    registration={register('logo')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Name"
                        placeholder="Enter company name"
                        required
                        error={formState.errors['name']}
                        registration={register('name')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="email"
                        label="Email"
                        placeholder="Enter company email"
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
                        placeholder="Enter company mobile no."
                        required
                        error={formState.errors['mobileNo']}
                        registration={register('mobileNo')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Phone"
                        placeholder="Enter company phone no."
                        error={formState.errors['phoneNo']}
                        registration={register('phoneNo')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Slogan"
                        placeholder="Enter company slogan"
                        error={formState.errors['slogan']}
                        registration={register('slogan')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Url"
                        placeholder="Enter company url"
                        error={formState.errors['url']}
                        registration={register('url')}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label="Address"
                    placeholder="Enter your address"
                    error={formState.errors['address']}
                    registration={register('address')}
                  />
                  <SelectField
                    placeholder="Select a country"
                    options={countries as []}
                    label="Country"
                    error={formState.errors['country']}
                    registration={register('country')}
                  />

                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="State"
                        placeholder="Enter company state"
                        error={formState.errors['state']}
                        registration={register('state')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="City"
                        placeholder="Enter company city"
                        error={formState.errors['city']}
                        registration={register('city')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <SelectField
                        placeholder="Select a language"
                        options={LANGUAGES}
                        label="Language"
                        required
                        error={formState.errors['language']}
                        registration={register('language')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        placeholder="Select a currency"
                        options={currencies as []}
                        label="Currency"
                        required
                        error={formState.errors['currency']}
                        registration={register('currency')}
                      />
                    </div>
                  </div>
                  <InputCheckboxField
                    variant="switch"
                    label="Active"
                    checked={data.isActive}
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

export default UpdateCompany;
