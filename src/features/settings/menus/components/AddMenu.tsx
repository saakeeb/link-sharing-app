import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { TiPlus } from 'react-icons/ti';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, InputImageField, SelectField } from '@/components/Form';
import { useAddMenu } from '../api/addMenus';
import { useUserStore } from '@/stores/userStore';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { useContentTypes } from '@/api/getContentTypeList';
import { useParentMenuList } from '@/api/getParentMenuList';
import FormActions from '@/components/Form/FormActions/FormActions';
import { Menu, menuSchema } from '../types';
import { useTranslation } from 'react-i18next';
import { useImageUpload } from '@/api/uploadImage';

export const AddMenu = () => {
  const { t } = useTranslation();
  const addMutation = useAddMenu();
  const uploadMutation = useImageUpload();
  const { data: contentType, isLoading: isLoadingContentType } = useContentTypes();
  const { data: parent, isLoading: isLoadingParent } = useParentMenuList();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const companyId = useUserStore((state) => state.user?.company) ?? 0;

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: Menu) => {
    const iconFile = inputValues.icon && inputValues.icon.length > 0 ? inputValues.icon[0] : null;
    inputValues.company = companyId;

    try {
      if (iconFile) {
        inputValues.icon = (
          await uploadMutation.mutateAsync({ image: iconFile, param: 'logo' })
        )?.image;
      } else {
        inputValues.icon = null;
      }
      await addMutation.mutateAsync(inputValues);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoadingContentType || isLoadingParent) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center gap-x-2 rounded-md whitespace-nowrap bg-primary-turquoise px-4 h-12 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75"
      >
        <TiPlus name="plus" className="w-7 h-7" />
        {t('pages.add_sidebar')}
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('pages.add_sidebar')}>
        <>
          <div className="mt-2">
            <Form<Menu> onSubmit={handleSubmit} schema={menuSchema} onDirty={(e) => setIsDirty(e)}>
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
                    registration={register('icon')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        required
                        label={t('common.form_label.name')}
                        placeholder={t('common.placeholder.enter_name')}
                        error={formState.errors['name']}
                        registration={register('name')}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        type="text"
                        required
                        label={t('common.form_label.language_key')}
                        placeholder={t('common.placeholder.enter_language_key')}
                        error={formState.errors['languageKey']}
                        registration={register('languageKey')}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="text"
                        label={t('common.form_label.code')}
                        required
                        placeholder={t('common.placeholder.enter_code')}
                        error={formState.errors['code']}
                        registration={register('code')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label={t('common.form_label.parent')}
                        placeholder={t('common.placeholder.select_parent')}
                        options={parent as []}
                        error={formState.errors['parent']}
                        registration={register('parent')}
                      />
                    </div>
                  </div>
                  <InputField
                    type="text"
                    label={t('common.form_label.route')}
                    required
                    placeholder={t('common.placeholder.enter_path')}
                    error={formState.errors['route']}
                    registration={register('route')}
                  />
                  <div className="flex items-start justify-between gap-x-2">
                    <div className="w-full">
                      <InputField
                        type="number"
                        required
                        label={t('common.form_label.serial_no')}
                        placeholder={t('common.placeholder.enter_serial_no')}
                        error={formState.errors['serialNo']}
                        registration={register('serialNo')}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        label={t('common.form_label.content_type')}
                        placeholder={t('common.placeholder.select_content_type')}
                        options={contentType as []}
                        error={formState.errors['contentType']}
                        registration={register('contentType')}
                      />
                    </div>
                  </div>
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
