import { ChangeEvent, FormEvent, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import categories from "../../data/categories";
import Select from "../select/Select";
import { getFormValues, uploadImageToImgBB } from "../../utils/function";
import { ICampaign } from "../../types/campaign.type";
import {
  useAddCampaignMutation,
  useGetCampaignByIdForManageQuery,
  useUpdateCampaignMutation,
} from "../../redux/features/campaign/campaign.api";
import { toast } from "sonner";

interface IProps {
  onAdd?: () => void;
  id: string;
}
type TFieldError = Record<string, string>;

const EditCampaignForm = ({ onAdd, id }: IProps) => {
  const { data, isLoading, isError } = useGetCampaignByIdForManageQuery(id);

  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [fieldError, setFieldError] = useState<Record<string, string>>({});

  const handelCoverPhotoInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length) setCoverPhoto(files[0]);
  };

  const selectCategoryOptions = categories.map((category) => ({
    display: category,
    value: category,
  }));

  selectCategoryOptions.unshift({
    display: "Select Category",
    value: "",
  });

  const [update] = useUpdateCampaignMutation();
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFieldError({});
    const values = getFormValues(e.target as HTMLFormElement, [
      "title",
      "minimumAmount",
      "targetAmount",
      "description",
      "startAt",
      "endAt",
      "status",
    ]);

    const { title, minimumAmount, targetAmount, startAt, description, endAt, status } = values;
    const fieldError: TFieldError = {};

    if (!title || title.trim().length < 3 || title.trim().length > 150) {
      fieldError["title"] = "Title is required and must be between 3 and 150 characters.";
    }

    if (!selectedCategory) {
      fieldError["category"] = "Category is required.";
    }

    if (minimumAmount && isNaN(parseInt(minimumAmount))) {
      fieldError["minimumAmount"] = "Minimum amount must be a valid number.";
    }

    if (!targetAmount || isNaN(parseInt(targetAmount))) {
      fieldError["targetAmount"] = "Target amount is required and must be a valid number.";
    }

    if (!description || description.trim().length < 150 || description.trim().length > 10000) {
      fieldError["description"] =
        "Description is required and must be between 150 and 10000 characters.";
    }

    if (isScheduled) {
      if (!startAt) {
        fieldError["startAt"] = "Start date is required.";
      }
    }

    if (!endAt) {
      fieldError["endAt"] = "End date is required.";
    } else if (new Date(startAt).getTime() > new Date(endAt).getTime()) {
      fieldError["endAt"] = "End date must be after the start date.";
    }

    if (Object.values(fieldError).length) {
      return setFieldError(fieldError);
    }

    const loadingToast = toast.loading("Campaign is adding...");
    try {
      let coverImageUrl = campaign!.coverImageUrl;
      if (coverPhoto) {
        coverImageUrl = await uploadImageToImgBB(coverPhoto!);
      }

      const payload: Pick<
        ICampaign,
        | "title"
        | "description"
        | "category"
        | "targetAmount"
        | "startAt"
        | "endAt"
        | "coverImageUrl"
        | "status"
      > = {
        title,
        description,
        coverImageUrl,
        category: selectedCategory!,
        targetAmount: parseInt(targetAmount),
        startAt: isScheduled ? new Date(startAt) : new Date(campaign!.startAt),
        endAt: new Date(endAt),
        status: campaign!.status,
      };
      const res = await update({ id, payload });

      if (res.data.success) {
        toast.success("Campaign updated successfully");
        toast.dismiss(loadingToast);
        onAdd && onAdd();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
    }
  };

  const campaign = data?.data;

  if (isLoading) return <></>;
  if (!campaign) return <p>Something went wrong!</p>;
  const isScheduled = new Date(campaign.startAt).getTime() > new Date().getTime();
  return (
    <form action="" onSubmit={handelSubmit}>
      <h1 className="lg:text-3xl text-2xl font-semibold text-black ">Add New Campaign</h1>
      <div className="mt-10">
        {/* Cover photo */}
        <>
          <div className="p-2 border-2 w-fit rounded-md border-secondary">
            <img
              src={coverPhoto ? URL.createObjectURL(coverPhoto) : campaign?.coverImageUrl}
              alt=""
              className=" h-60 rounded-lg hover:cursor-pointer"
              onClick={() => ref.current && ref.current.click()}
            />
          </div>

          <input
            onChange={handelCoverPhotoInputOnChange}
            type="file"
            ref={ref}
            className="hidden"
          />
        </>

        {/* Others Info  */}
        <div className="mt-5 space-y-6">
          <div>
            <input
              name="title"
              type="text"
              placeholder="Campaign Name Title"
              defaultValue={campaign.title}
              className="w-full py-3 px-2 border-2 text-black border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
            <p className="mt-1 text-red-500">{fieldError["title"]}</p>
          </div>
          <div>
            <Select
              options={selectCategoryOptions}
              onChange={(value) => setSelectedCategory(value)}
              defaultValue={campaign.category}
            />
            <p className="mt-1 text-red-500">{fieldError["category"]}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                name="minimumAmount"
                type="number"
                placeholder="Minimum Amount (optional)"
                className="w-full py-3 px-2 border-2 text-black border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
              />
              <p className="mt-1 text-red-500">{fieldError["minimumAmount"]}</p>
            </div>
            <div>
              <input
                name="targetAmount"
                type="number"
                defaultValue={campaign.targetAmount}
                placeholder="Target Amount"
                className="w-full py-3 px-2 text-black border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
              />
              <p className="mt-1 text-red-500">{fieldError["targetAmount"]}</p>
            </div>
          </div>
          <div>
            <textarea
              placeholder="Description"
              name="description"
              defaultValue={campaign.description}
              className="w-full py-3 px-2 h-52 text-black border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
            <p className="mt-1 text-red-500">{fieldError["description"]}</p>
          </div>
        </div>
        {/* Start at and End at */}
        <div className="mt-5  overflow-x-auto">
          <h3 className="mb-2 md:text-xl text-lg text-gray-800 font-medium">
            {isScheduled ? "Change Start Date & End Date" : "Change End Date"}
          </h3>
          {/* <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateState([item.selection as any])}
            moveRangeOnFirstSelection={false}
            ranges={dateState as any}
          /> */}
          <div className="grid grid-cols-2 gap-3">
            {isScheduled === true && (
              <div>
                <input
                  type="datetime-local"
                  name="startAt"
                  defaultValue={new Date(campaign.startAt).toISOString().slice(0, 16)}
                  className="w-full py-3 px-2 text-black border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
                />
                <p className="mt-1 text-red-500">{fieldError["startAt"]}</p>
              </div>
            )}
            <div>
              <input
                type="datetime-local"
                name="endAt"
                defaultValue={new Date(campaign.endAt).toISOString().slice(0, 16)}
                className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
              />
              <p className="mt-1 text-red-500">{fieldError["endAt"]}</p>
            </div>
          </div>
        </div>
        {isScheduled === false && (
          <div className="mt-5">
            <label htmlFor="" className="font-medium block text-xl text-black">
              Status
            </label>
            <select
              name="status"
              id=""
              defaultValue={campaign.status}
              className="mt-1 w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary md:w-1/2"
            >
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        )}
      </div>

      <div className="mt-5 lg:text-end">
        <button className=" py-3 lg:w-1/2 w-full bg-primary text-white rounded-md">Save</button>
      </div>
    </form>
  );
};

export default EditCampaignForm;
