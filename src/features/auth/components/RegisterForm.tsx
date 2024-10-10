import { Switch } from '@headlessui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Elements';
import { Form, InputField, SelectField } from '@/components/Form';
import { useTeams } from '@/features/teams';
import { useRegister } from '@/lib/auth';
import { RegisterFormProps, RegisterValues, registerSchema } from '../types';

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registerMutation = useRegister();
  const [chooseTeam, setChooseTeam] = React.useState(false);

  const teamsQuery = useTeams({
    config: {
      enabled: chooseTeam,
    },
  });

  return (
    <div>
      <Form<RegisterValues, typeof registerSchema>
        onSubmit={async (values) => {
          await registerMutation.mutate(values);
          onSuccess();
        }}
        schema={registerSchema}
        options={{
          shouldUnregister: true,
          defaultValues: {
            teamId: 'lJWHJ1FBSMqTdWsJI_N2K',
            teamName: 'ABC',
          },
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <div className="hidden">
              <Switch.Group>
                <div className="flex items-center">
                  <Switch
                    checked={chooseTeam}
                    onChange={setChooseTeam}
                    className={`${
                      chooseTeam ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
                        chooseTeam ? 'translate-x-6' : 'translate-x-1'
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                  <Switch.Label className="ml-4">Join Existing Team</Switch.Label>
                </div>
              </Switch.Group>

              {chooseTeam && teamsQuery.data ? (
                <SelectField
                  label="Team"
                  error={formState.errors['teamId']}
                  registration={register('teamId')}
                  options={teamsQuery?.data?.map((team) => ({
                    label: team.name,
                    value: team.id,
                  }))}
                />
              ) : (
                <InputField
                  type="text"
                  label="Team Name"
                  error={formState.errors['teamName']}
                  registration={register('teamName')}
                />
              )}
            </div>
            <div>
              <Button
                isLoading={registerMutation.isLoading}
                type="submit"
                className="w-full bg-[#2A2F32] text-[18px] font-bold uppercase"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link to="/" className="font-medium text-primary-dark-gray hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
