import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout title={t('pages.login')}>
      <LoginForm onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
