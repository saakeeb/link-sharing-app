interface InfoCardProps {
  icon: any;
  amount?: number | string;
  label?: string;
}

const InfoCard = ({ icon, amount, label }: InfoCardProps) => {
  const IconComponent = icon;

  return (
    <div className="border border-dashed border-[#D5D5D5] p-5 rounded-lg w-full 2xl:w-[250px]">
      <div className="flex flex-col items-start lg:flex-row gap-x-5">
        {IconComponent && <IconComponent className="h-8 w-8 text-primary-turquoise" aria-hidden="true" />}
        <div>
          <p className="font-extrabold text-xl lg:text-2xl 2xl:text-[28px] lg:whitespace-nowrap">
            {amount}
          </p>
          <p className="font-medium lg:text-lg 2xl:text-xl text-[#606568]">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
