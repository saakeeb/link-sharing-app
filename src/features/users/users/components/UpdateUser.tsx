import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, InputImageField, SelectField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useUpdateUser } from '../api/updateUser';
import { useImageUpload } from '@/api/uploadImage';
import { User, UserGroup, UserProps, updateUserSchema } from '../types';
import FormActions from '@/components/Form/FormActions/FormActions';
import { useDesignationList } from '@/api/getDesignationList';
import { GENDER } from '@/utils/constants';
import { useGroups } from '@/api/getGroups';

const UpdateUser: React.FC<UserProps> = ({ data }) => {
  const updateMutation = useUpdateUser();
  const uploadMutation = useImageUpload();
  const { data: designation, isLoading: isDesignationLoading } = useDesignationList();
  const { data: groupData, isLoading: isGroupLoading } = useGroups();
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

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
        closeModal();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        inputValues.photo = null;
        await updateMutation.mutateAsync({ ...data, ...inputValues });
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isDesignationLoading || isGroupLoading) return null;

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

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title="Change User">
        <>
          <div className="mt-2">
            <Form<User>
              onSubmit={handleSubmit}
              schema={updateUserSchema}
              onDirty={(e) => setIsDirty(e)}
              options={{
                defaultValues: {
                  ...data,
                  designation: data?.designation?.toString() ?? '',
                  gender: data?.gender?.toString() ?? '',
                  groups: data?.groups[0]?.toString() ?? '',
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <InputImageField
                    type="file"
                    uploadType="image"
                    src={data.photo}
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
                        label="First Name"
                        placeholder="Enter first name"
                        error={formState.errors['firstName']}
                        registration={register('firstName')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Last Name"
                        placeholder="Enter last name"
                        error={formState.errors['lastName']}
                        registration={register('lastName')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="email"
                        label="Email"
                        placeholder="Enter email address"
                        required
                        error={formState.errors['email']}
                        registration={register('email')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="password"
                        label="Password"
                        placeholder="Enter password"
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
                        placeholder="Enter mobile no."
                        label="Mobile"
                        required
                        error={formState.errors['mobileNo']}
                        registration={register('mobileNo')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        placeholder="Enter phone no."
                        label="Phone"
                        error={formState.errors['phoneNo']}
                        registration={register('phoneNo')}
                      />
                    </div>
                  </div>
                  <SelectField
                    label="Role"
                    placeholder="Select a role"
                    required
                    defaultValue={data?.groups[0]}
                    options={groups || []}
                    error={formState.errors['groups'] as any}
                    registration={register('groups')}
                  />

                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <SelectField
                        label="Designation"
                        defaultValue={data.designation}
                        placeholder="Select designation"
                        options={designation || []}
                        error={formState.errors['designation']}
                        registration={register('designation')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label="Gender"
                        defaultValue={data.gender}
                        placeholder="Select gender"
                        options={GENDER}
                        error={formState.errors['gender']}
                        registration={register('gender')}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label="Address"
                    placeholder="Enter address"
                    error={formState.errors['address']}
                    registration={register('address')}
                  />
                  <TextAreaField
                    label="Bio"
                    placeholder="Enter bio"
                    error={formState.errors['bio']}
                    registration={register('bio')}
                  />
                  <InputCheckboxField
                    variant="switch"
                    checked={data.isActive}
                    label="Active"
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

export default UpdateUser;
