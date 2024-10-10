import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCountryList } from '@/api/getCountryList';
import { useDesignationList } from '@/api/getDesignationList';
import { useTimeZoneList } from '@/api/getTimeZone';
import { IoMdSave } from 'react-icons/io';
import { Form, InputField, InputImageField, SelectField, TextAreaField } from '@/components/Form';
import { GENDER, LANGUAGES } from '@/utils/constants';
import { useUpdateUser } from '../../api/updateUser';
import { userProfileSchema, UserProfile, UserGroup } from '../../types';
import { useGroups } from '@/api/getGroups';
import { useImageUpload } from '@/api/uploadImage';

const SettingsTab = ({ dataSources: data }: any) => {
  const updateMutation = useUpdateUser();
  const uploadMutation = useImageUpload();
  const { t } = useTranslation();
  const { data: countries, isLoading: isCountryListLoading } = useCountryList();
  const { data: timeZone, isLoading: isTimezoneLoading } = useTimeZoneList();
  const { data: designations, isLoading: isDesignationListLoading } = useDesignationList();
  const { data: groupData, isLoading: isGroupLoading } = useGroups();

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [groups, setGroups] = useState<UserGroup[]>([]);

  useEffect(() => {
    if (groupData) {
      const transformedGroups = groupData.map(({ id, name }) => ({
        id,
        label: name,
        value: id,
      }));
      setGroups(transformedGroups);
    }
  }, [groupData]);

  const handleSubmit = async (inputValues: UserProfile) => {
    inputValues.groups = [inputValues.groups];

    if (typeof inputValues.photo === 'object') {
      const photoFile =
        inputValues.photo && inputValues.photo.length > 0 ? inputValues.photo[0] : null;
      try {
        if (photoFile) {
          inputValues.photo = (
            await uploadMutation.mutateAsync({ image: photoFile, param: 'photo' })
          )?.image;
        } else {
          inputValues.photo = null;
        }
        await updateMutation.mutateAsync({ ...data, ...inputValues });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        inputValues.photo = null;
        await updateMutation.mutateAsync({ ...data, ...inputValues });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isCountryListLoading || isTimezoneLoading || isDesignationListLoading || isGroupLoading)
    return null;

  return (
    <div>
      <Form<UserProfile>
        onSubmit={handleSubmit}
        schema={userProfileSchema}
        onDirty={(e) => setIsDirty(e)}
        options={{
          defaultValues: {
            ...data,
            designation: data?.designation?.toString() ?? '',
            country: data?.country?.toString() ?? '',
            groups: data?.groups?.[0]?.toString() ?? '',
          },
        }}
      >
        {({ register, formState }) => (
          <>
            <InputImageField
              type="file"
              uploadType="image"
              src={data.photoUrl}
              error={
                formState.errors['photo'] ? (formState.errors['photo'] as FieldError) : undefined
              }
              registration={register('photo')}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <InputField
                type="text"
                label={t('common.form_label.first_name')}
                placeholder={t('common.placeholder.enter_first_name')}
                required
                error={formState.errors['firstName']}
                registration={register('firstName')}
              />
              <InputField
                type="text"
                label={t('common.form_label.last_name')}
                placeholder={t('common.placeholder.enter_last_name')}
                error={formState.errors['lastName']}
                registration={register('lastName')}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <InputField
                type="email"
                label={t('common.form_label.email')}
                placeholder={t('common.placeholder.enter_email_address')}
                required
                error={formState.errors['email']}
                registration={register('email')}
              />
              <InputField
                type="text"
                placeholder={t('common.placeholder.enter_mobile_no')}
                label={t('common.form_label.mobile')}
                required
                error={formState.errors['mobileNo']}
                registration={register('mobileNo')}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <InputField
                type="text"
                placeholder={t('common.placeholder.enter_phone_no')}
                label={t('common.form_label.phone')}
                error={formState.errors['phoneNo']}
                registration={register('phoneNo')}
              />
              <SelectField
                label={t('common.form_label.designation')}
                placeholder={t('common.placeholder.select_a_designation')}
                defaultValue={data.designation}
                options={designations || []}
                registration={register('designation')}
                error={formState.errors['designation']}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                <SelectField
                  options={GENDER}
                  label={t('common.form_label.gender')}
                  defaultValue={data.gender}
                  placeholder={t('common.placeholder.select_gender')}
                  registration={register('gender')}
                  error={formState.errors['gender']}
                />
                <SelectField
                  label="Role"
                  placeholder="Select a group"
                  required
                  defaultValue={data.groups[0]}
                  options={groups || []}
                  error={formState.errors['groups'] as any}
                  registration={register('groups')}
                />
              </div>
              <SelectField
                options={LANGUAGES}
                label={t('common.form_label.language')}
                defaultValue={data.language}
                placeholder={t('common.placeholder.select_a_language')}
                registration={register('language')}
                error={formState.errors['language']}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <InputField
                type="text"
                label={t('common.form_label.company')}
                placeholder={t('common.placeholder.enter_organization_name')}
                error={formState.errors['organization']}
                registration={register('organization')}
              />
              <SelectField
                options={timeZone || []}
                label={t('common.form_label.time_zone')}
                defaultValue={data.timeZone}
                placeholder={t('common.placeholder.select_a_timezone')}
                registration={register('timeZone')}
                error={formState.errors['timeZone']}
              />
            </div>
            <div className="w-full">
              <TextAreaField
                label={t('common.form_label.address')}
                placeholder={t('common.placeholder.enter_address')}
                error={formState.errors['address']}
                registration={register('address')}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                <InputField
                  type="text"
                  label={t('common.form_label.city')}
                  placeholder={t('common.placeholder.enter_city_name')}
                  error={formState.errors['city']}
                  registration={register('city')}
                />
                <InputField
                  type="text"
                  label={t('common.form_label.state')}
                  placeholder={t('common.placeholder.enter_state_name')}
                  error={formState.errors['state']}
                  registration={register('state')}
                />
              </div>
              <SelectField
                placeholder={t('common.placeholder.select_a_country')}
                options={countries || []}
                defaultValue={data.country}
                label={t('common.form_label.country')}
                registration={register('country')}
                error={formState.errors['country']}
              />
            </div>
            <div className="w-full">
              <TextAreaField
                label={t('common.form_label.bio')}
                placeholder={t('common.placeholder.enter_bio')}
                error={formState.errors['bio']}
                registration={register('bio')}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={!isDirty || formState.isSubmitting}
                className="ml-auto flex items-center justify-center rounded-md whitespace-nowrap bg-primary-turquoise px-5 h-12 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75  disabled:opacity-50 disabled:hover:bg-primary-turquoise disabled:cursor-not-allowed"
              >
                <IoMdSave className="h-8 w-6 mr-1" />
                <span>{formState.isSubmitting ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default SettingsTab;
