import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import React, { memo, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import DropDownSelect from '@/components/ui/dropdown-box/dropdown-box';
import { WhiteBG } from '@/components/ui/white-bg/white-bg';
import { useLinksShare } from '@/stores/links-store';

import { FormData, linkSchema } from '../types';

const initialValues: FormData = {
  links: [{ platform: '', url: '', id: '', color: '' }],
};

const urlLinks = [
  { value: 'Github', label: 'Github', id: 1, color: 'bg-[#181717]' },
  { value: 'LinkedIn', label: 'LinkedIn', id: 2, color: 'bg-[#0077B5]' },
  { value: 'Twitter', label: 'Twitter', id: 3, color: 'bg-[#1DA1F2]' },
  { value: 'Facebook', label: 'Facebook', id: 4, color: 'bg-[#1877F2]' },
  { value: 'Instagram', label: 'Instagram', id: 5, color: 'bg-[#E4405F]' },
  { value: 'YouTube', label: 'YouTube', id: 6, color: 'bg-[#FF0000]' },
  { value: 'Pinterest', label: 'Pinterest', id: 7, color: 'bg-[#E60023]' },
  { value: 'Snapchat', label: 'Snapchat', id: 8, color: 'bg-[#FFFC00]' },
  { value: 'TikTok', label: 'TikTok', id: 9, color: 'bg-[#010101]' },
  { value: 'Reddit', label: 'Reddit', id: 10, color: 'bg-[#FF4500]' },
  { value: 'Tumblr', label: 'Tumblr', id: 11, color: 'bg-[#36465D]' },
  { value: 'WhatsApp', label: 'WhatsApp', id: 12, color: 'bg-[#25D366]' },
  { value: 'Telegram', label: 'Telegram', id: 13, color: 'bg-[#0088CC]' },
  { value: 'Discord', label: 'Discord', id: 14, color: 'bg-[#7289DA]' },
  { value: 'Medium', label: 'Medium', id: 15, color: 'bg-[#00AB6C]' },
  { value: 'Quora', label: 'Quora', id: 16, color: 'bg-[#B92B27]' },
  { value: 'Others', label: 'Others', id: 17, color: 'bg-[#CCCCCC]' },
];

export const LinkCreate = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: initialValues,
    resolver: zodResolver(linkSchema),
  });

  const updateSocialLinks = useLinksShare((state) => state.updateSocialLinks);
  const selectedSocialLink = useLinksShare((state) => state.selectedSocialLink);
  const setSelectedSocialLink = useLinksShare(
    (state) => state.setSelectedSocialLink,
  );
  const removeSocialLink = useLinksShare((state) => state.removeSocialLink);

  useEffect(() => {
    if (selectedSocialLink) {
      setValue('links', [
        {
          platform: selectedSocialLink.platform || '',
          url: selectedSocialLink.url || '',
          id: selectedSocialLink.id || '',
          color: selectedSocialLink.color || '',
        },
      ]);
    }
  }, [selectedSocialLink, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const onSubmit = (data: FormData) => {
    const dataWithIds = data.links.map((link) => {
      const selectedPlatform = urlLinks.find(
        (option) => option.label === link.platform,
      );
      return {
        ...link,
        id: link.id || nanoid(),
        color: selectedPlatform ? selectedPlatform.color : 'bg-[#ccc]',
      };
    });

    updateSocialLinks(dataWithIds);
    reset();
    setSelectedSocialLink({});
  };

  const handleRemoveLink = (id: number, field: any) => {
    if (selectedSocialLink) {
      removeSocialLink(selectedSocialLink);
      reset();
    }
    if (Array.isArray(field.links) && field.links.length > 1) {
      remove(id);
    }
  };

  return (
    <WhiteBG>
      <div className=" ">
        <p className="mb-3 mt-5 text-3xl font-bold">Customize Your Links</p>
        <p className="mb-10 text-xs text-slate-500">
          Add/edit/remove links below and then share all your profile with the
          world!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            type="button"
            variant="violate_border"
            className="mb-4 size-full text-lg"
            onClick={() =>
              append({
                platform: '',
                url: '',
                id: selectedSocialLink?.id ? selectedSocialLink.id : nanoid(),
              })
            }
          >
            + Add new link
          </Button>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 bg-[#fafafa] p-4">
              <div className="mb-2 flex items-center justify-between rounded-lg">
                <p className="font-semibold text-slate-600">
                  Link #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index, field)}
                  className="px-4 py-2 text-slate-600 shadow-sm"
                >
                  Remove
                </button>
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`links.${index}.platform`}
                  className="block text-xs text-slate-600"
                >
                  Platform
                </label>
                <Controller
                  name={`links.${index}.platform`}
                  control={control}
                  render={({ field }) => (
                    <DropDownSelect
                      id={`links.${index}.platform`}
                      options={urlLinks}
                      placeholder="Select Platform"
                      isClearable={false}
                      isMulti={false}
                      value={
                        urlLinks.find(
                          (option) => option.label === field.value,
                        ) || null
                      }
                      onChange={(selectedOption: any) => {
                        if (selectedOption && !Array.isArray(selectedOption)) {
                          field.onChange(selectedOption.label);
                        }
                      }}
                      className="h-[58px] w-full rounded-lg py-2"
                    />
                  )}
                />

                {errors.links?.[index]?.platform && (
                  <p className="text-sm text-red-500">
                    {errors.links[index].platform?.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor={`links.${index}.url`}
                  className="block text-xs text-slate-600"
                >
                  URL
                </label>
                <Controller
                  control={control}
                  name={`links.${index}.url`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={`border ${
                        errors.links?.[index]?.url
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } w-full rounded-lg px-4 py-2`}
                      placeholder="e.g., https://github.com/username"
                    />
                  )}
                />
                {errors.links?.[index]?.url && (
                  <p className="text-sm text-red-500">
                    {errors.links[index].url?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="mb-8 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-violet-700 px-8 py-2 font-bold text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </WhiteBG>
  );
});

LinkCreate.displayName = 'LinkCreate';
