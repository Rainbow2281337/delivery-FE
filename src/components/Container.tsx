interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
			max-w-full
			mx-auto
			xl:px-20
			md:px-10
			sm:px-2
			px-4
      dark:bg-neutral-900
	  	"
    >
      {children}
    </div>
  );
};

export default Container;
