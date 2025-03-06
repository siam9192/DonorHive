import React, { ChangeEvent, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import categories from "../../data/categories";
import Select from "../select/Select";

const AddCampaignForm = () => {
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

  return (
    <form action="">
      <h1 className="lg:text-3xl text-2xl font-semibold ">Add New Campaign</h1>
      <div className="mt-10">
        {/* Cover photo */}
        <>
          {!coverPhoto ? (
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
          <input
            type="text"
            placeholder="Campaign Name"
            className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
          />
          <Select
            options={selectCategoryOptions}
            onChange={(value) => setSelectedCategory(value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Minimum Amount (optional)"
              className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
            <input
              type="number"
              placeholder="Target Amount"
              className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
          </div>
          <textarea
            placeholder="Description"
            name="description"
            className="w-full py-3 px-2 h-52 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
          />
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
            <input
              type="datetime-local"
              name="startDate"
              className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
            <input
              type="datetime-local"
              name="endDate"
              className="w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 lg:text-end">
        <button className=" py-3 lg:w-1/2 w-full bg-primary text-white rounded-md">Submit</button>
      </div>
    </form>
  );
};

export default AddCampaignForm;
