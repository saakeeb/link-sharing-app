import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, InputImageField, SelectField } from '@/components/Form';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { useUpdateMenu } from '../api/updateMenus';
import { Menu, MenuProps, menuSchema } from '../types';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import FormActions from '@/components/Form/FormActions/FormActions';
import { useContentTypes } from '@/api/getContentTypeList';
import { useParentMenuList } from '@/api/getParentMenuList';
import { useImageUpload } from '@/api/uploadImage';

const UpdateMenu: React.FC<MenuProps> = ({ data }) => {
  const { t } = useTranslation();
  const updateMutation = useUpdateMenu();
  const uploadMutation = useImageUpload();
  const { data: contentType } = useContentTypes();
  const { data: parent } = useParentMenuList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: Menu) => {
    if (typeof inputValues.icon === 'object') {
      const iconFile = inputValues.icon && inputValues.icon.length > 0 ? inputValues.icon[0] : null;
      try {
        if (iconFile) {
          inputValues.icon = (
            await uploadMutation.mutateAsync({ image: iconFile, param: 'logo' })
          )?.image;
        } else {
          inputValues.icon = null;
        }
        await updateMutation.mutateAsync({ ...data, ...inputValues });
        closeModal();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        inputValues.icon = null;
        await updateMutation.mutateAsync({ ...data, ...inputValues });
        closeModal();
      } catch (error) {
        console.error(error);
      }
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

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('pages.edit_sidebar')}>
        <>
          <div className="mt-2">
            <Form<Menu>
              onSubmit={handleSubmit}
              schema={menuSchema}
              onDirty={(e) => setIsDirty(e)}
              options={{
                defaultValues: {
                  ...data,
                  serialNo: data.serialNo.toString(),
                  parent: data.parent ? data.parent.toString() : '',
                  contentType: data.contentType ? data.contentType.toString() : '',
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <InputImageField
                    type="file"
                    uploadType="icon"
                    error={
                      formState.errors['icon']
                        ? (formState.errors['icon'] as FieldError)
                        : undefined
                    }
                    src={data.icon}
                    registration={register('icon')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        required
                        label="Name"
                        placeholder="Enter name"
                        error={formState.errors['name']}
                        registration={register('name')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        required
                        label="Language Key"
                        placeholder="Enter language key"
                        error={formState.errors['languageKey']}
                        registration={register('languageKey')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label="Code"
                        required
                        placeholder="Enter code"
                        error={formState.errors['code']}
                        registration={register('code')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label="Parent"
                        placeholder="Select parent"
                        defaultValue={data.parent}
                        options={parent as []}
                        error={formState.errors['parent']}
                        registration={register('parent')}
                      />
                    </div>
                  </div>
                  <InputField
                    type="text"
                    label="Route"
                    required
                    placeholder="Enter path"
                    error={formState.errors['route']}
                    registration={register('route')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="number"
                        required
                        label="Serial No"
                        placeholder="Enter serial no"
                        error={formState.errors['serialNo']}
                        registration={register('serialNo')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label="Content Type"
                        placeholder="Select content type"
                        defaultValue={data.contentType}
                        options={contentType as []}
                        error={formState.errors['contentType']}
                        registration={register('contentType')}
                      />
                    </div>
                  </div>
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

export default UpdateMenu;
