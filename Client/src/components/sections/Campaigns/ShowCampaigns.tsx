import Container from "../../container/Container";
import CampaignCard from "../../cards/CampaignCard";
import Pagination from "../../pagination/Pagination";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CampaignLoadingCard from "../../loading-cards/CampaignLoadingCard";
import useLoadingBounce from "../../../hooks/useLoadingBounce";
import { useGetCampaignsQuery } from "../../../redux/features/campaign/campaign.api";
import { IParam } from "../../../interfaces/response.interface";
import { ChangeEvent, useEffect, useRef } from "react";
import { handelSearch } from "../../../utils/function";

const sortOptions = [
  {
    display: "Sortby(Default)",
    value: "",
  },
  {
    display: "Date(asc)",
    value: "createdAt-asc",
  },
  {
    display: "Date(desc)",
    value: "createdAt-desc",
  },
  {
    display: "Name(asc)",
    value: "title-asc",
  },
  {
    display: "Name(desc)",
    value: "title-desc",
  },
  {
    display: "End Date(asc)",
    value: "endAt-asc",
  },
  {
    display: "End Date(desc)",
    value: "endAt-desc",
  },
];

const ShowCampaigns = () => {
  const popularSearchers = ["Food", "House", "Education", "Children"];
  const { search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const params: IParam[] = [];
  const ref = useRef<HTMLElement>(null);

  urlSearchParams.forEach((value, key) => {
    params.push({ name: key, value });
  });

  const { data, isLoading, isFetching, refetch } = useGetCampaignsQuery(params);

  const campaigns = data?.data;
  const meta = data?.meta;
  const bouncedLoading = useLoadingBounce(isLoading || isFetching);

  useEffect(() => {
    refetch();
  }, [search]);

  const handelPaginationSearch = (page: number) => {
    handelSearch([{ name: "page", value: page }], navigate);
    const current = ref.current;
    current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handelSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [sortBy, sortOrder] = value.split("-");

    handelSearch(
      [
        { name: "sortBy", value: sortBy },
        { name: "sortOrder", value: sortOrder },
      ],
      navigate,
    );
  };

  return (
    <section ref={ref} className="md:py-10 py-6">
      <Container>
        <div className="flex justify-center md:flex-row flex-col items-center gap-4 my-4">
          <p>Popular Search:</p>
          <div className="flex items-center flex-wrap gap-2">
            {popularSearchers.map((item) => (
              <Link to="" key={item} className="text-secondary font-medium hover:text-primary">
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="md:text-xl text-[1rem] font-semibold text-primary">
            {meta?.totalResult} Campaigns Found
          </p>
          <select
            name=""
            id=""
            className="px-4 py-2 border-2 border-secondary outline-none rounded-md"
            onChange={handelSorting}
          >
            <option value="">Sort By(Default)</option>
            {sortOptions.map((_, index) => (
              <option value={_.value} key={_.value}>
                {_.display}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 grid-cols-2  md:gap-5 gap-3">
          {bouncedLoading || isFetching
            ? Array.from({ length: 14 }).map((_, index) => <CampaignLoadingCard key={index} />)
            : campaigns?.map((campaign, index) => (
                <CampaignCard campaign={campaign} key={campaign._id} />
              ))}
        </div>

        {!bouncedLoading && !isFetching && !campaigns?.length ? (
          <div className="h-[80vh]">
            <img src="/images/no-result.webp" alt="" className="mx-auto w-fit" />
            <p className="text-center text-gray-600 text-2xl ">No campaigns found</p>
          </div>
        ) : null}

        {campaigns?.length
          ? meta && (
              <div className="mt-10 flex justify-center items-center">
                <Pagination {...meta} onPageChange={handelPaginationSearch} />
              </div>
            )
          : null}
      </Container>
    </section>
  );
};

export default ShowCampaigns;
