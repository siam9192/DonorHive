import { Link } from "react-router-dom";
import UseScreen from "../../hooks/UseScreen";

const CampaignCard = () => {
  const { screenType } = UseScreen();
  let description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quae at vel culpa. Eius
  ullam nulla distinctio architecto laboriosam numquam molestiae sunt aut,`;

  const showLength = screenType === "lg" ? 150 : screenType === "md" ? 90 : 60;
  const shortDescription = description.slice(0, showLength);

  return (
    <Link to={"/campaigns/example"}>
      <div className="bg-white">
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/496276728/photo/group-of-happy-gypsy-indian-children-desert-village-india.jpg?s=612x612&w=0&k=20&c=p7WwGJTF0rIbBbj2Gt4TGAol4nbmjjHekXc9qxkk3Os="
            alt=""
            className="rounded-md"
          />
          {/* <div className="absolute w-full bottom-1  flex items-center justify-end gap-1  px-1">
          <div className=" p-2 bg-secondary text-gray-900 font-medium text-sm">2H</div>
          <div className=" p-2 bg-secondary text-gray-900 font-medium text-sm">12M</div>
          <div className="p-2 bg-secondary text-gray-900 font-medium text-sm">43S</div>
        </div> */}
        </div>
        <div className="md:mt-4 mt-3 space-y-1">
          <div className=" font-medium text-end md:text-[1rem] md:text-sm text-[0.5rem]">
            20 days left
          </div>
          <p className="text-yellow-600 font-medium text-[0.8rem]">Education</p>
          <h2 className="md:text-xl text-[1rem] text-gray-950 font-medium">
            Education is for everyone
          </h2>
          <p className="text-gray-800 font-secondary text-[0.9rem]">
            {shortDescription}
            {description.length !== shortDescription.length ? "..." : null}
          </p>
        </div>
        <div className=" md:mt-8 mt-6 space-y-1 relative">
          <div className="absolute -top-6 left-[80%] px-2 py-1 bg-secondary text-gray-900 text-[0.5rem] font-medium ">
            80%
          </div>
          <div className="bg-gray-100 rounded-full">
            <div className="w-[80%] h-1 bg-green-700 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-950 md:block hidden">
              Raised: <span className="text-amber-500 font-medium">$129</span>
            </p>
            <p className="text-gray-950 md:text-lg text-sm">
              Goal: <span className="text-amber-500 font-medium">$129</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
