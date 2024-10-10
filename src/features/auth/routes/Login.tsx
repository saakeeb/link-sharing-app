import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Login to Your Account">
      <LoginForm onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
