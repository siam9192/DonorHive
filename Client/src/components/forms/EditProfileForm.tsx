import React, { ChangeEvent, FormEvent, use, useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useCurrentUser } from "../../provider/CurrentUserProvider";
import { getFormValues, uploadImageToImgBB } from "../../utils/function";
import { useUpdateMyProfileMutation } from "../../redux/features/profile/profile.api";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const { user } = useCurrentUser();
  const [error, setError] = useState<Record<string, any>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [update] = useUpdateMyProfileMutation(undefined);

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const target = e.target as HTMLFormElement;
      const values = getFormValues(target, [
        "fullName",
        "phoneNumber",
        "address.street",
        "address.city",
        "address.state",
        "address.country",
      ]);

      const payload: any = {
        fullName: values.fullName,
        profilePhotoUrl: user?.profilePhotoUrl,
        phoneNumber: values.phoneNumber || user?.phoneNumber, // Prioritize form value, fallback to user data
        address: {
          street: values["address.street"],
          city: values["address.city"],
          state: values["address.state"],
          county: values["address.country"],
        },
      };

      // Function to remove empty fields recursively
      const removeEmptyFields = (obj: any) => {
        Object.keys(obj).forEach((key) => {
          if (obj[key] && typeof obj[key] === "object") {
            removeEmptyFields(obj[key]); // Recursively clean nested objects
            if (Object.keys(obj[key]).length === 0) {
              delete obj[key]; // Remove empty objects
            }
          } else if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
            delete obj[key]; // Remove empty values
          }
        });
      };
      removeEmptyFields(payload);

      if (newProfilePhoto) {
        const url = await uploadImageToImgBB(newProfilePhoto);
        payload.profilePhotoUrl = url;
      }

      const res = await update(payload);

      if (!res.data?.success) {
        throw new Error();
      }
      navigate("/profile/personal-information");
    } catch (error) {
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handelImageInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setNewProfilePhoto(files[0]);
  };
  return (
    <form action="" onSubmit={handelSubmit}>
      <div>
        <div className="md:w-10/12 w-full mx-auto">
          <div className="relative w-fit size-32 mx-auto">
            <img
              src={newProfilePhoto ? URL.createObjectURL(newProfilePhoto) : user?.profilePhotoUrl}
              alt=""
              className="size-32 rounded-full "
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              type="button"
              className="text-xl text-white p-2 bg-primary rounded-full absolute bottom-0 -right-1"
            >
              <MdModeEdit />
            </button>
            <input
              ref={imageInputRef}
              onChange={handelImageInputOnChange}
              type="file"
              accept="/image/*"
              className="hidden"
            />
          </div>
          <div className="mt-10 space-y-2 font-secondary">
            <div className="space-y-2">
              <label className="text-lg font-medium block">Full Name:</label>
              <input
                name="fullName"
                defaultValue={user?.fullName}
                className="px-2 py-3 font-medium bg-green-50  w-full"
              />
              {error["fullname"] && <p className="text-red-500 font-medium">{error["fullname"]}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-lg font-medium block">Email Address:</label>
              <input
                value={user?.email}
                readOnly
                className="px-2 py-3 font-medium bg-green-50  w-full"
              />
              {error["email"] && <p className="text-red-500 font-medium">{error["email"]}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-lg font-medium block">Phone Number:</label>
              <input
                defaultValue={user?.phoneNumber}
                className="px-2 py-3 font-medium bg-green-50  w-full"
                name="phoneNumber"
              />
              {error["phoneNumber"] && (
                <p className="text-red-500 font-medium">{error["phoneNumber"]}</p>
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold">Address:</h1>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-lg font-medium block">Street:</label>
                  <input
                    defaultValue={user?.address?.street}
                    className="px-2 py-3 font-medium bg-green-50  w-full"
                    name="address.street"
                  />
                  {error["address.street"] && (
                    <p className="text-red-500 font-medium">{error["address.street"]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-lg font-medium block">City:</label>
                  <input
                    defaultValue={user?.address?.city}
                    className="px-2 py-3 font-medium bg-green-50  w-full"
                    name="address.city"
                  />
                  {error["address.city"] && (
                    <p className="text-red-500 font-medium">{error["address.street"]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-lg font-medium block">State:</label>
                  <input
                    defaultValue={user?.address?.state}
                    className="px-2 py-3 font-medium bg-green-50  w-full"
                    name="address.state"
                  />
                  {error["address.state"] && (
                    <p className="text-red-500 font-medium">{error["address.state"]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-lg font-medium block">Country:</label>
                  <input
                    defaultValue={user?.address?.country}
                    className="px-2 py-3 font-medium bg-green-50  w-full"
                    name="address.country"
                  />
                  {error["address.country"] && (
                    <p className="text-red-500 font-medium">{error["address.country"]}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-5 text-end ">
            <button
              disabled={isLoading}
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-secondary text-white rounded-lg"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
