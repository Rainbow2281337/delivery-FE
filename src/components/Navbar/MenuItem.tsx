interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon }) => {
  return (
    <div
      onClick={onClick}
      className="
	  		flex
			  flex-row
			  items-center
			  gap-2
			  px-4
			  py-3
		  	hover:bg-neutral-100
			  transition
			  font-semibold
        dark:hover:bg-neutral-500
		  "
    >
      {icon}
      {label}
    </div>
  );
};

export default MenuItem;
