import { useState } from 'react';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { IoMdSave } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { useUpdatePassword } from '../../api/updatePassword';
import { Password, passwordSchema } from '../../types';

const PasswordTab = () => {
  const updateMutation = useUpdatePassword();
  const { t } = useTranslation();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (inputValues: Password) => {
    try {
      await updateMutation.mutateAsync({ ...inputValues });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <div>
      <Form<Password> onSubmit={onSubmit} schema={passwordSchema} onDirty={(e) => setIsDirty(e)}>
        {({ handleSubmit, register, formState, reset }) => (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
              <div className="flex flex-col gap-y-6">
                <InputField
                  type="password"
                  label={t('common.form_label.current_password')}
                  placeholder={t('common.placeholder.enter_current_password')}
                  error={formState.errors['currentPassword']}
                  registration={register('currentPassword')}
                  autoComplete="currentPassword"
                />
                <InputField
                  type="password"
                  label={t('common.form_label.new_password')}
                  placeholder={t('common.placeholder.enter_new_password')}
                  error={formState.errors['newPassword']}
                  registration={register('newPassword')}
                  autoComplete="newPassword"
                />
                <InputField
                  type="password"
                  label={t('common.form_label.confirm_new_password')}
                  placeholder={t('common.placeholder.enter_confirm_new_password')}
                  error={formState.errors['confirmPassword']}
                  registration={register('confirmPassword')}
                  autoComplete="confirmPassword"
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-end">
              <Button
                disabled={!isDirty || formState.isSubmitting}
                onClick={handleSubmit(async (values) => {
                  await onSubmit(values);
                  reset();
                  setIsDirty(false);
                })}
                type="submit"
                className="button-filled !px-4"
              >
                <IoMdSave className="h-8 w-6 mr-1" />
                <span>{formState.isSubmitting ? 'Saving...' : 'Save'}</span>
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default PasswordTab;
