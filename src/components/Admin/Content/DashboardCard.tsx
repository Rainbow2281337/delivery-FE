interface DashboardCardProps {
  title: string;
  value: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div
      className="
	  		w-60
			flex
			flex-col
			gap-1
			items-start
			justify-start
			p-4
			bg-neutral-100
			hover:bg-neutral-50
			rounded-lg
			shadow-md
			transition
      	  dark:bg-neutral-800
          dark:hover:bg-neutral-700
		"
    >
      <div className="mb-1 text-xl md:text-2xl font-semibold dark:text-white">
        {title}
      </div>

      <div className="text-lg text-neutral-500 dark:text-neutral-400">
        {value}
      </div>
    </div>
  );
};

export default DashboardCard;
