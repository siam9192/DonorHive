interface IProps {
  heading: string;
  title: string;
}

const Heading = ({ heading, title }: IProps) => {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <span className="mx-auto block h-1 w-12 rounded-full bg-secondary" />
      <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
        {heading}
      </h2>
      <p className="mx-auto text-center leading-7 text-slate-600 font-secondary">{title}</p>
    </div>
  );
};

export default Heading;
