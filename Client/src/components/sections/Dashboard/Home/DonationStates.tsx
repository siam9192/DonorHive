import ChartBar from "../../../ui/ChartBar";

const DonationStates = () => {
  const data = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    data.unshift({
      total: Math.floor(Math.random() * (3000000 - 1000000) + 1000000),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    });
    currentDate.setMonth(currentDate.getMonth() - 1);
  }
  const maxTotal = Math.max(...data.map((item) => item.total));
  const max = maxTotal + (5 / 100) * maxTotal;
  return (
    <section className=" md:p-5 p-3 bg-gray-900 border-2 border-gray-600/10 rounded-lg h-fit ">
      <h1 className="md:text-2xl text-xl font-semibold text-gray-50">Last 12 Months</h1>
      <div className="mt-10 flex items-center justify-between h-[35vh] ">
        {data.map((item) => (
          <ChartBar data={item} max={max} />
        ))}
      </div>
    </section>
  );
};

export default DonationStates;
