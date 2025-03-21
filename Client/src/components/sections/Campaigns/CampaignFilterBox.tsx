import Container from "../../container/Container";
import Select from "../../select/Select";
import categories from "../../../data/categories";
import SearchTermInput from "../../input/SearchTermInput";
import { IParam } from "../../../interfaces/response.interface";
import { useNavigate } from "react-router-dom";
import { handelSearch } from "../../../utils/function";

const CampaignFilterBox = () => {
  const navigate = useNavigate();
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
            <Select
              options={selectCategoryOptions}
              onChange={(value) => handelSearch([{ name: "category", value }], navigate)}
            />
          </div>
          <div className="lg:w-1/3 md:w-1/2">
            <SearchTermInput
              onChange={(value) => handelSearch([{ name: "searchTerm", value }], navigate)}
              placeholder="Search campaign by keyword.."
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CampaignFilterBox;
