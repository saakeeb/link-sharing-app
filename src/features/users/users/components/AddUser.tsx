import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { TiPlus } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDesignationList } from '@/api/getDesignationList';
import { useImageUpload } from '@/api/uploadImage';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, InputImageField, SelectField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { User, UserGroup, addUserSchema } from '@/features/users/users/types';
import { useUserStore } from '@/stores/userStore';
import { GENDER } from '@/utils/constants';
import { useAddUser } from '../api/addUsers';
import { useGroups } from '@/api/getGroups';
import { useTranslation } from 'react-i18next';

export const AddUser = () => {
  const { t } = useTranslation();
  const addMutation = useAddUser();
  const uploadMutation = useImageUpload();
  const { data: designation, isLoading: isDesignationLoading } = useDesignationList();
  const { data: groupData, isLoading: isGroupLoading } = useGroups();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const companyId = useUserStore((state) => state.user?.company) ?? 0;
  const param = queryParams.get('add-user');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [groups, setGroups] = useState<UserGroup[]>([]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (param) {
      openModal();
      navigate(location.pathname);
    }
  }, [param, location.pathname, navigate]);

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

  const handleSubmit = async (inputValues: User) => {
    const photoFile =
      inputValues.photo && inputValues.photo.length > 0 ? inputValues.photo[0] : null;
    inputValues.groups = [inputValues.groups];
    inputValues.company = companyId;

    try {
      if (photoFile) {
        inputValues.photo = (
          await uploadMutation.mutateAsync({ image: photoFile, param: 'photo' })
        )?.image;
      } else {
        inputValues.photo = null;
      }
      await addMutation.mutateAsync(inputValues);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (isDesignationLoading || isGroupLoading) return null;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center gap-x-2 rounded-md whitespace-nowrap bg-primary-turquoise px-4 h-12 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75"
      >
        <TiPlus name="plus" className="w-7 h-7" />
        {t('common.title.add_user')}
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('common.title.add_user')}>
        <>
          <div className="mt-2">
            <Form<User>
              onSubmit={handleSubmit}
              schema={addUserSchema}
              onDirty={(e) => setIsDirty(e)}
            >
              {({ register, formState }) => (
                <>
                  <InputImageField
                    type="file"
                    uploadType="image"
                    error={
                      formState.errors['photo']
                        ? (formState.errors['photo'] as FieldError)
                        : undefined
                    }
                    registration={register('photo')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        required
                        label={t('common.form_label.first_name')}
                        placeholder={t('common.placeholder.enter_first_name')}
                        error={formState.errors['firstName']}
                        registration={register('firstName')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        label={t('common.form_label.last_name')}
                        placeholder={t('common.placeholder.enter_last_name')}
                        error={formState.errors['lastName']}
                        registration={register('lastName')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="email"
                        label={t('common.form_label.email')}
                        placeholder={t('common.placeholder.enter_email_address')}
                        required
                        error={formState.errors['email']}
                        registration={register('email')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="password"
                        label={t('common.form_label.password')}
                        placeholder={t('common.placeholder.enter_password')}
                        required
                        autoComplete="password"
                        error={formState.errors['password']}
                        registration={register('password')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        placeholder={t('common.placeholder.enter_mobile_no')}
                        label={t('common.form_label.mobile')}
                        required
                        error={formState.errors['mobileNo']}
                        registration={register('mobileNo')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        placeholder={t('common.placeholder.enter_phone_no')}
                        label={t('common.form_label.phone')}
                        error={formState.errors['phoneNo']}
                        registration={register('phoneNo')}
                      />
                    </div>
                  </div>
                  <SelectField
                    label={t('common.form_label.Role')}
                    required
                    placeholder={t('common.placeholder.Select_a_role')}
                    options={groups || []}
                    error={formState.errors['groups'] as any}
                    registration={register('groups')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <SelectField
                        label={t('common.form_label.designation')}
                        placeholder={t('common.placeholder.select_designation')}
                        options={designation || []}
                        error={formState.errors['designation']}
                        registration={register('designation')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label={t('common.form_label.gender')}
                        placeholder={t('common.placeholder.select_gender')}
                        options={GENDER}
                        error={formState.errors['gender']}
                        registration={register('gender')}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label={t('common.form_label.address')}
                    placeholder={t('common.placeholder.enter_address')}
                    error={formState.errors['address']}
                    registration={register('address')}
                  />
                  <TextAreaField
                    label={t('common.form_label.bio')}
                    placeholder={t('common.placeholder.enter_bio')}
                    error={formState.errors['bio']}
                    registration={register('bio')}
                  />
                  <InputCheckboxField
                    variant="switch"
                    checked={true}
                    label={t('common.form_label.active')}
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
