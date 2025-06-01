import Container from "../../container/Container";
import Select from "../../select/Select";
import categories from "../../../data/categories";
import SearchTermInput from "../../input/SearchTermInput";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const searchParams = new URLSearchParams(window.location.search);

  return (
    <section className="py-10">
      <Container>
        <div className=" flex  md:flex-row flex-col justify-between md:items-center lg:gap-0 gap-2  ">
          <div className="lg:w-1/3 md:w-1/2">
            <Select
              options={selectCategoryOptions}
              onChange={(value) => handelSearch([{ name: "category", value }], navigate)}
              defaultValue={searchParams.get("category")}
            />
          </div>
          <div className="lg:w-1/3 md:w-1/2">
            <SearchTermInput
              defaultValue={searchParams.get("searchTerm") || ""}
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
