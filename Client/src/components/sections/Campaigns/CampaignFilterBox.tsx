import Container from "../../container/Container";
import Select from "../../select/Select";
import categories from "../../../data/categories";
import SearchTermInput from "../../input/SearchTermInput";

const CampaignFilterBox = () => {
  const selectCategoryOptions = categories.map((category) => ({
    display: category,
    value: category,
  }));

  selectCategoryOptions.unshift({
    display: "All Categories",
    value: "",
  });

  return (
    <section className="py-10">
      <Container>
        <div className=" flex  md:flex-row flex-col justify-between md:items-center lg:gap-0 gap-2  ">
          <div className="lg:w-1/3 md:w-1/2">
            <Select options={selectCategoryOptions} />
          </div>
          <div className="lg:w-1/3 md:w-1/2">
            <SearchTermInput />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CampaignFilterBox;
