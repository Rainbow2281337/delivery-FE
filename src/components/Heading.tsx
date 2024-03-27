interface HeadingProps {
  title: string;
  subtitle?: string | null;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-3xl font-bold dark:text-white">{title}</div>
      <div className="font-light text-neutral-500 mt-2 dark:text-neutral-400">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
