import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import categories from "../../data/categories";
import Select from "../select/Select";
import { getFormValues, uploadImageToImgBB } from "../../utils/function";
import { object } from "zod";
import { ICampaign } from "../../types/campaign.type";
import { useAddCampaignMutation } from "../../redux/features/campaign/campaign.api";
import { toast } from "sonner";

interface IProps {
  onAdd?: () => void;
}
type TFieldError = Record<string, string>;

const AddCampaignForm = ({ onAdd }: IProps) => {
  const endDate = new Date();
  endDate.setMonth(new Date().getMonth() + 6);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
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

  const [add] = useAddCampaignMutation();
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
    ]);
    const { title, minimumAmount, targetAmount, startAt, description, endAt } = values;
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

    if (!startAt) {
      fieldError["startAt"] = "Start date is required.";
    }

    if (!endAt) {
      fieldError["endAt"] = "End date is required.";
    } else if (new Date(startAt).getTime() > new Date(endAt).getTime()) {
      fieldError["endAt"] = "End date must be after the start date.";
    }

    if (!coverPhoto) {
      fieldError["coverPhoto"] = "Cover photo is required.";
    }

    if (Object.values(fieldError).length) {
      return setFieldError(fieldError);
    }

    const loadingToast = toast.loading("Campaign is adding...");
    try {
      const coverImageUrl = await uploadImageToImgBB(coverPhoto!);

      const payload = {
        title,
        description,
        coverImageUrl,
        category: selectedCategory!,
        targetAmount: parseInt(targetAmount),
        startAt: new Date(startAt),
        endAt: new Date(endAt),
      };
      const res = await add(payload);

      if (res.data.success) {
        toast.success("Campaign added successfully");
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

  return (
    <form action="" onSubmit={handelSubmit}>
      <h1 className="lg:text-3xl text-2xl font-semibold ">Add New Campaign</h1>
      <div className="mt-10">
        {/* Cover photo */}
        <>
          {!coverPhoto ? (
            <div>
              <div
                onClick={() => ref.current && ref.current.click()}
                className="lg:h-60 h-52  border-2 hover:bg-gray-50 rounded-md text-gray-700/15 flex flex-col gap-2 justify-center items-center"
              >
                <img
                  src="https://icones.pro/wp-content/uploads/2021/08/icone-photo-bleue.png"
                  alt=""
                  className="size-32 "
                />
                <p className="text-gray-800 font-medium">Cover photo</p>
              </div>
              <p className="mt-1 text-red-500">{fieldError["coverPhoto"]}</p>
            </div>
          ) : (
            <div className="p-2 border-2 w-fit rounded-md border-secondary">
              <img
                src={URL.createObjectURL(coverPhoto)}
                alt=""
                className=" h-60 rounded-lg hover:cursor-pointer"
                onClick={() => ref.current && ref.current.click()}
              />
            </div>
          )}
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
              placeholder="Campaign Name,Title"
              className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
            <p className="mt-1 text-red-500">{fieldError["title"]}</p>
          </div>
          <div>
            <Select
              options={selectCategoryOptions}
              onChange={(value) => setSelectedCategory(value)}
            />
            <p className="mt-1 text-red-500">{fieldError["category"]}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                name="minimumAmount"
                type="number"
                placeholder="Minimum Amount (optional)"
                className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
              />
              <p className="mt-1 text-red-500">{fieldError["minimumAmount"]}</p>
            </div>
            <div>
              <input
                name="targetAmount"
                type="number"
                placeholder="Target Amount"
                className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
              />
              <p className="mt-1 text-red-500">{fieldError["targetAmount"]}</p>
            </div>
          </div>
          <div>
            <textarea
              placeholder="Description"
              name="description"
              className="w-full py-3 px-2 h-52 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
            <p className="mt-1 text-red-500">{fieldError["description"]}</p>
          </div>
        </div>
        {/* Start at and End at */}
        <div className="mt-5  overflow-x-auto">
          <h3 className="mb-2 md:text-xl text-lg text-gray-800 font-medium">
            Select Start Date & End Date
          </h3>
          {/* <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateState([item.selection as any])}
            moveRangeOnFirstSelection={false}
            ranges={dateState as any}
          /> */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="datetime-local"
                name="startAt"
                className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
              />
              <p className="mt-1 text-red-500">{fieldError["startAt"]}</p>
            </div>
            <div>
              <input
                type="datetime-local"
                name="endAt"
                className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
              />
              <p className="mt-1 text-red-500">{fieldError["endAt"]}</p>
            </div>
          </div>
        </div>
      </div>
      {/* {
        Object.values(fieldError).length  ? 
        <div className="mt-5">
        {
        Object.entries(fieldError).map(([field,value])=><p className="text-red-500">
        <span>
          {field}-
        </span>
        {
          value
        }
        </p>)
        }
        </div>
        :
        null
      } */}
      <div className="mt-5 lg:text-end">
        <button className=" py-3 lg:w-1/2 w-full bg-primary text-white rounded-md">Submit</button>
      </div>
    </form>
  );
};

export default AddCampaignForm;
