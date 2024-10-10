import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useLogin } from '@/lib/auth';
import { LoginFormProps, LoginValues, loginSchema } from '../types';

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin();

  return (
    <div>
      <Form<LoginValues>
        onSubmit={async (values) => {
          await login.mutateAsync(values);
          onSuccess();
        }}
        schema={loginSchema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
              autoComplete="email"
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
              autoComplete="current-password"
            />
            <div>
              <Button
                isLoading={login.isLoading}
                type="submit"
                className="w-full bg-[#2A2F32] text-[18px] font-bold uppercase h-12 mt-1"
              >
                Login
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
