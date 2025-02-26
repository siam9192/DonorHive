import Container from "../../container/Container";

const GetInvolved = () => {
  return (
    <section className="lg:py-32 py-28 bg-primary get-involved-section min-h-[300px]">
      <Container className="flex justify-center items-center flex-col gap-8">
        <h1 className="text-white md:text-5xl text-4xl font-semibold text-center">
          Helping Today Helping <br /> Tomorrow charity
        </h1>
        <p className="text-center text-gray-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti aliquam earum officiis
          dolore laborum magnam recusandae eum explicabo fugit quia at tenetur sint expedita eius,
          consectetur aut velit veniam alias placeat quibusdam.
        </p>
        <div className="flex md:flex-row flex-col items-center gap-2">
          <button className="px-8 py-3 hover:bg-gray-900 hover:border-none text-white border-2">
            Become a volunteer
          </button>
          <button className="px-8 py-3  hover:bg-gray-900 hover:border-none text-white border-2">
            Become a volunteer
          </button>
        </div>
      </Container>
    </section>
  );
};

export default GetInvolved;
