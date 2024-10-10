import { useTranslation } from 'react-i18next';

const OverviewTab = ({ dataSources: data }: any) => {
  const { t } = useTranslation();

  const overview = [
    {
      title: t('common.form_label.name'),
      value: `${data?.firstName} ${data?.lastName}`,
    },
    {
      title: t('common.form_label.company_name'),
      value: data?.companyName,
    },
    {
      title: t('common.form_label.company_name'),
      value: `${data?.shift_name} (${data?.shift_start_time} - ${data?.shift_end_time})`,
    },
    {
      title: t('common.form_label.email'),
      value: data?.email,
    },
    {
      title: t('common.form_label.mobile'),
      value: data?.mobileNo,
    },
    {
      title: t('common.form_label.phone'),
      value: data?.phoneNo,
    },
    {
      title: t('common.form_label.designation'),
      value: data?.designationTitle,
    },
    {
      title: t('common.form_label.gender'),
      value: data?.genderName,
    },
    {
      title: t('common.form_label.language'),
      value: data?.languageName,
    },
    {
      title: t('common.form_label.address'),
      value: data?.address,
    },
    {
      title: t('common.form_label.city'),
      value: data?.city,
    },
    {
      title: t('common.form_label.state'),
      value: data?.state,
    },
    {
      title: t('common.form_label.country'),
      value: data?.countryName,
    },
    {
      title: t('common.form_label.bio'),
      value: data?.bio,
    },
    {
      title: t('common.form_label.time_zone'),
      value: data?.timeZone,
    },
  ];

  return (
    <div className="w-full">
      <table className="w-full text-left border-separate">
        <tbody>
          {overview.map((o, i) => (
            <tr key={i}>
              <td className="w-1/3 font-semibold text-[#606568] pb-5">{o.title}</td>
              <td className="w-2/3 font-bold text-[#383E42] pb-5">{o.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverviewTab;
