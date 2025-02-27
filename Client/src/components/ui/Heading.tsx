interface IProps {
  heading: string;
  title: string;
}

const Heading = ({ heading, title }: IProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-center  lg:text-4xl md:text-3xl text-2xl font-semibold text-black ">
        {heading}
      </h1>
      <p className="text-gray-800 md:w-1/2 mx-auto text-center font-secondary">{title}</p>
    </div>
  );
};

export default Heading;
