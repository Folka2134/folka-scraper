import Image from "next/image";

type PriceInfoCardProps = {
  title: string;
  iconSrc: string;
  value: string;
  borderColour: string;
};

const PriceInfoCard = ({
  title,
  iconSrc,
  value,
  borderColour,
}: PriceInfoCardProps) => {
  return (
    <div className={`price-info_card border-l-[${borderColour}]`}>
      <p className="text-base text-black-100">{title}</p>
      <div className="flex gap-1">
        <Image src={iconSrc} alt={title} width={24} height={24} />
        <p className="text-2xl font-bold text-secondary">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
