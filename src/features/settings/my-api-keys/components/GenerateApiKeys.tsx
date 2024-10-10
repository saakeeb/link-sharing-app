import { useState } from 'react';
import { Form, InputField } from '@/components/Form';
import { Button } from '@/components/Elements';
import { useUserStore } from '@/stores/userStore';
import { ApiKey, apiKeySchema } from '../types/index';
import { useGenerateApiKey } from '../api/generateApiKey';
import { useNotificationStore } from '@/stores/notifications';
import { useTranslation } from 'react-i18next';


type ApiKeyListProps = {
  dataSources: ApiKey[];
};

const GenerateApiKeys = ({ dataSources }: ApiKeyListProps) => {
  const generateMutation = useGenerateApiKey();
  const { addNotification } = useNotificationStore();
  const { t } = useTranslation();
  const companyId = useUserStore((state) => state.user?.company) ?? 0;
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const checkNameExists = (nameToCheck: string, dataSources: ApiKey[]) => {
    return dataSources.some((item) => item.name === nameToCheck);
  };

  const onSubmit = async (inputValues: ApiKey) => {
    inputValues.company = companyId;

    try {
      if (checkNameExists(inputValues.name, dataSources)) {
        addNotification({
          type: 'error',
          title: 'Api key name already exists.',
        });
      } else {
        await generateMutation.mutateAsync(inputValues);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form<ApiKey> onSubmit={onSubmit} schema={apiKeySchema} onDirty={(e) => setIsDirty(e)}>
      {({ handleSubmit, register, formState, reset }) => (
        <>
          <div className="flex gap-x-3 items-center">
            <InputField
              type="text"
              className="w-full px-4 py-1 rounded-5px border border-[#00B7C8] focus:border-[#00B7C8] focus:outline-[1px] focus:outline-[#00B7C8] focus:outline-offset-0 focus:ring-0 focus:ring-offset-0 bg-[#00B7C8]/10 text-[#00B7C8] placeholder:text-[#00B7C8] h-12 !text-base"
              placeholder={t('common.placeholder.enter_aPI_key_name')}
              error={formState.errors['name']}
              registration={register('name')}
            />

            <Button
              disabled={!isDirty || formState.isSubmitting}
              onClick={handleSubmit(async (values) => {
                await onSubmit(values);
                reset();
                setIsDirty(false);
              })}
              type="button"
              className="button-filled !px-4"
            >
              {formState.isSubmitting ? 'Generating...' : t('common.actions.generate')}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default GenerateApiKeys;
