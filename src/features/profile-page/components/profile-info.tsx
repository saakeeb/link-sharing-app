import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'lucide-react';
import React, { memo, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useNotifications } from '@/components/ui/notifications';
import { WhiteBG } from '@/components/ui/white-bg/white-bg';
import { useUserInfo } from '@/stores/user-store';

import { ProfileData, ProfileSchema } from '../types';

export const ProfileInfo: React.FC = memo(() => {
  const userInfo = useUserInfo((state) => state.userInfo);
  const updateUserInfo = useUserInfo((state) => state.updateUserInfo);
  const addNotification = useNotifications((state) => state.addNotification);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    },
  });

  useEffect(() => {
    reset({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    });
  }, [userInfo, reset]);

  const onSubmit = useCallback(
    (data: ProfileData) => {
      updateUserInfo({
        profile: userInfo.profile,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      addNotification({
        type: 'success',
        title: 'Updated',
        message: 'User Data Updated',
      });
    },
    [updateUserInfo, addNotification, userInfo.profile],
  );

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          updateUserInfo({
            ...userInfo,
            profile: base64String,
          });
          setValue('profileImage', file);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue, updateUserInfo, userInfo],
  );

  return (
    <WhiteBG>
      <div>
        <h1 className="mb-3 mt-5 text-3xl font-bold">Profile Details</h1>
        <p className="mb-10 text-xs text-slate-500">
          Add your details to create a personal touch to your profile
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4 bg-[#fafafa] p-4">
            <div className="mb-4">
              <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center">
                <label
                  className="mb-1 block w-2/6 font-medium text-gray-700"
                  htmlFor="profileImage"
                >
                  Profile picture
                </label>
                <div className="flex w-full flex-col items-start justify-start gap-4 md:w-4/6 md:flex-row md:items-center">
                  <div className="relative hover:opacity-60">
                    {userInfo.profile ? (
                      <div className="size-40 rounded-xl border-2 border-[#633BFE]">
                        <img
                          src={userInfo.profile}
                          alt={`Profile of ${userInfo.firstName}`}
                          className="size-40 rounded-xl"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="size-40 rounded-xl border-2 border-slate-200 bg-slate-200"></div>
                    )}
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.bmp"
                      onChange={handleImageUpload}
                      className="absolute left-0 top-0 z-30 size-40 cursor-pointer opacity-0"
                      aria-label="Upload profile picture"
                    />
                    <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 opacity-80">
                      <div className="flex w-full flex-col items-center justify-center gap-2">
                        <Image color="#fff" />
                        <p className="w-full text-center text-xs font-bold text-white shadow-lg">
                          Change Picture
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Image must be below 1024 * 1024. Use JPG, PNG, BMP format.
                  </p>
                </div>
              </div>
              {errors.profileImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.profileImage.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 bg-[#fafafa] p-4">
            <div className="mb-4">
              <div className="flex w-full flex-col items-start justify-start gap-1 md:flex-row md:items-center md:gap-4">
                <label
                  className="mb-1 block w-full font-medium text-gray-700 md:w-2/6"
                  htmlFor="firstName"
                >
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none md:w-4/6 ${
                    errors.firstName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  aria-describedby="firstNameError"
                />
              </div>
              {errors.firstName && (
                <p id="firstNameError" className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex w-full flex-col items-start justify-start gap-1 md:flex-row md:items-center md:gap-4">
                <label
                  className="mb-1 block w-full font-medium text-gray-700 md:w-2/6"
                  htmlFor="lastName"
                >
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none md:w-4/6 ${
                    errors.lastName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  aria-describedby="lastNameError"
                />
              </div>
              {errors.lastName && (
                <p id="lastNameError" className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex w-full flex-col items-start justify-start gap-1 md:flex-row md:items-center md:gap-4">
                <label
                  className="mb-1 block w-full font-medium text-gray-700 md:w-2/6"
                  htmlFor="email"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none md:w-4/6 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby="emailError"
                />
              </div>
              {errors.email && (
                <p id="emailError" className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-8 flex justify-center sm:justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-[#633BFE] px-8 py-2 font-bold text-white md:w-1/5"
              aria-label="Save profile information"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </WhiteBG>
  );
});
ProfileInfo.displayName = 'ProfileInfo';
