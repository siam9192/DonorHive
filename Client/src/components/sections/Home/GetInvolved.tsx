import Container from "../../container/Container";

const GetInvolved = () => {
  return (
    <section className="lg:py-32 py-28 bg-primary get-involved-section min-h-[300px]">
      <Container className="flex justify-center items-center flex-col gap-8">
        <h1 className="text-white md:text-5xl text-4xl font-semibold text-center">
          Helping Today Helping <br /> Tomorrow charity
        </h1>
        <p className="text-center text-gray-50">
        "Helping Today, Helping Tomorrow" embodies the spirit of charity, ensuring support for those in need both now and in the future. Through generosity, kindness, and sustainable efforts, we create lasting positive change, empowering individuals and communities for a better tomorrow.
        </p>
        <div className="flex md:flex-row flex-col items-center gap-2">
          <button className="px-8 py-3 hover:bg-gray-900 hover:border-none text-white border-2">
            Become a volunteer
          </button>
          <button className="px-8 py-3  hover:bg-gray-900 hover:border-none text-white border-2">
            Become a donor
          </button>
        </div>
      </Container>
    </section>
  );
};

export default GetInvolved;
