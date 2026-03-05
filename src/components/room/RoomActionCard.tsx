interface RoomActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const RoomActionCard = ({
  icon,
  title,
  description,
  onClick,
}: RoomActionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-dashed border-[#334155] rounded-xl p-10 flex flex-col items-center justify-center hover:bg-[#1E293B]/40 transition cursor-pointer"
    >
      <div className="w-14 h-14 bg-[#1E293B] rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm text-center">{description}</p>
    </button>
  );
};

export default RoomActionCard;
