import { useEffect, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import FormActions from '@/components/Form/FormActions/FormActions';
import Modal from '@/components/Elements/Modal/Modal';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { InputCheckboxField } from '@/components/Form/InputCheckboxField';
import { useUserStore } from '@/stores/userStore';
import { roleSchema, type Role } from '../types/index';
import { useAddRole } from '../api/addRoles';
import { useTranslation } from 'react-i18next';

const AddRole = () => {
  const { t } = useTranslation();
  const addMutation = useAddRole();
  const location = useLocation();
  const navigate = useNavigate();
  const companyId = useUserStore((state) => state.user?.company) ?? 0;
  const queryParams = new URLSearchParams(location.search);
  const param = queryParams.get('add-group');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (inputValues: Role) => {
    inputValues.company = companyId;

    try {
      await addMutation.mutateAsync(inputValues);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (param) {
      openModal();
      navigate(location.pathname);
    }
  }, [param, location.pathname, navigate]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center gap-x-2 rounded-md whitespace-nowrap bg-primary-turquoise px-4 h-12 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75"
      >
        <TiPlus name="plus" className="w-7 h-7" />
        {t('common.title.add_group')}
      </button>
      <Modal isOpen={isOpen} onClose={closeModal} isDirty={isDirty} title={t('common.title.add_group')}>
        <>
          <div className="mt-2">
            <Form<Role> onSubmit={handleSubmit} schema={roleSchema} onDirty={(e) => setIsDirty(e)}>
              {({ register, formState }) => (
                <>
                  <InputField
                    type="text"
                    label={t('common.form_label.name')}
                    placeholder={t('common.placeholder.enter_role_name')}
                    required
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <InputField
                    type="text"
                    label={t('common.form_label.code')}
                    placeholder={t('common.placeholder.enter_role_code')}
                    required
                    error={formState.errors['code']}
                    registration={register('code')}
                  />
                  <TextAreaField
                    label={t('common.form_label.description')}
                    placeholder={t('common.placeholder.enter_role_description')}
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

export default AddRole;
