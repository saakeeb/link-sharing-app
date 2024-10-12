import { zodResolver } from '@hookform/resolvers/zod';
import { Image, Link } from 'lucide-react';
import React, { memo } from 'react';
import { useForm } from 'react-hook-form';

import { WhiteBG } from '@/components/ui/white-bg/white-bg';
import { useUserInfo } from '@/stores/user-store';

import { ProfileData, ProfileSchema } from '../types';

export const ProfileInfo: React.FC = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
  });

  const updateUserInfo = useUserInfo((state) => state.updateUserInfo);
  const userInfo = useUserInfo((state) => state.userInfo);

  const onSubmit = (data: ProfileData) => {
    if (data.profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUserInfo({
          profile: base64String,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
        // reset();
      };
      reader.readAsDataURL(data.profileImage);
    } else {
      updateUserInfo({
        profile: null,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      //   reset();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('profileImage', file); // Save the file to the form state
    }
  };

  return (
    <WhiteBG>
      <div className="">
        <p className="mb-3 mt-5 text-3xl font-bold">Profile Details</p>
        <p className="mb-10 text-xs text-slate-500">
          Add your details to create a personal touch to your profile
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      <div className="size-40 rounded-full border-2 border-violet-700">
                        <img
                          src={userInfo.profile}
                          alt={`Link Share by ${userInfo.firstName}`}
                          className="size-40 rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="size-40 rounded-full border-2 border-slate-200 bg-slate-200"></div>
                    )}
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.bmp"
                      onChange={handleImageUpload}
                      className="absolute left-0 top-0 z-30 size-40 cursor-pointer opacity-0"
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
                    Image must below 1024 * 1024. Use JPG, PNG, BMP format.
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
                  First name
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none md:w-4/6 ${
                    errors.firstName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
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
                  Last name
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none md:w-4/6 ${
                    errors.lastName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
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
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none md:w-4/6 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-8 flex justify-center sm:justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-violet-700 px-8 py-2 font-bold text-white md:w-1/5"
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
