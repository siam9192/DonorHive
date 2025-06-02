import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { IInitDonationPayload } from "../../types/donation.type";
import { useRequestDonationMutation } from "../../redux/features/donation/donation.api";
import { ICampaign } from "../../types/campaign.type";

const paymentMethods = [
  // {
  //   name: "Paypal",
  //   logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
  //   value: "Paypal",
  // },
  {
    name: "Stripe",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    value: "Stripe",
  },
  {
    name: "SSLCommerze",
    logoUrl: "https://avatars.githubusercontent.com/u/19384040?v=4",
    value: "SSLCommerz",
  },
];

interface IProps {
  values: IInitDonationPayload & { campaign: Pick<ICampaign, "_id" | "title" | "category"> };
  close(): void;
  onSuccess(): void;
}
const DonationSubmitFormDetails = ({ values, close, onSuccess }: IProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [gotoPay, { isLoading }] = useRequestDonationMutation();
  const handelGotoPay = async () => {
    setErrorMessage("");
    try {
      let payload: any = {
        campaignId: values.campaign._id,
        paymentMethod: selectedPaymentMethod,
        amount: values.amount,
        isAnonymously: values.isAnonymously,
        comment: values.comment,
      };

      if (!values.isAnonymously) {
        payload.donorPersonalInfo = values.guestDonorInfo;
      }

      const cleanObject = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(cleanObject).filter((item) => item && Object.keys(item).length > 0);
        } else if (typeof obj === "object" && obj !== null) {
          const cleanedObj = Object.entries(obj).reduce((acc, [key, value]) => {
            const cleanedValue = cleanObject(value);
            if (
              cleanedValue !== undefined &&
              !(typeof cleanedValue === "object" && Object.keys(cleanedValue).length === 0)
            ) {
              acc[key] = cleanedValue;
            }
            return acc;
          }, {} as any);
          return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
        }
        return obj;
      };
      payload = cleanObject(payload);
      const res = await gotoPay(payload);
      if (res.data?.success) {
        window.location.href = res.data.data.paymentUrl;
        onSuccess();
      } else throw new Error();
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong");
    }
  };
  const { guestDonorInfo, amount } = values;

  return (
    <div
      onClick={close}
      className="fixed inset-0 w-full h-full bg-gray-900/75 flex justify-center items-center p-2 z-50  "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="lg:w-1/3 md:w-10/12 w-full min-h-[30vh] bg-white rounded-md md:p-10 p-5 max-h-[90vh]  overflow-y-auto no-scrollbar"
      >
        <div className="donation-details">
          <h1 className="md:text-2xl text-xl font-semibold">Donation Details</h1>
          <div className="mt-10 space-y-5">
            <div className="flex justify-center items-center gap-1 ">
              <span className="md:text-3xl text-2xl text-gray-600">
                <FaDollarSign />
              </span>
              <h1 className="md:text-4xl text-3xl font-semibold text-primary text-center">
                {amount}
              </h1>
            </div>
            <div>
              <h3 className=" md:text-xl text-lg font-medium">Campaign:</h3>
              <p className="mt-3 md:text-lg text-sm font-secondary">{values.campaign.title}</p>
            </div>
            {!values.isAnonymously && guestDonorInfo && Object.values(guestDonorInfo).length && (
              <div>
                <h3 className=" md:text-xl text-lg font-medium">Personal Information:</h3>
                <div className="mt-3 space-y-3 font-secondary">
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Full Name:</span>
                    <span>{guestDonorInfo.fullName}</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Email Address:</span>
                    <span>{guestDonorInfo.email || "N/A"}</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Phone Number:</span>
                    <span>{guestDonorInfo.phoneNumber || "N/A"}</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Address:</span>
                    <span>{Object.values(guestDonorInfo.address).join(",")}</span>
                  </p>
                </div>
              </div>
            )}
            <div className="mt-5">
              <h3 className=" md:text-xl text-lg font-medium">Comment:</h3>
              <p className="mt-3  font-secondary text-sm text-gray-600">
                {values.comment ? `"${values.comment}"` : "N/A"}
              </p>
            </div>
            <div>
              <h3 className=" md:text-xl text-lg font-medium">Select Method:</h3>
              <div className="mt-3 grid grid-cols-3 gap-3 ">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPaymentMethod(method.value)}
                    className={`p-5 border-2 ${selectedPaymentMethod === method.value ? "border-secondary" : "border-gray-500/20"} hover:cursor-pointer hover:bg-green-50 rounded-md  flex justify-center items-center `}
                  >
                    <img src={method.logoUrl} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button
              disabled={isLoading || selectedPaymentMethod == null}
              onClick={handelGotoPay}
              className="w-full py-3 bg-primary text-white disabled:bg-gray-100 disabled:text-gray-600 font-medium hover:bg-secondary hover:text-gray-900 duration-100  rounded-lg disabled:bg-gray-100"
            >
              Go to Pay
            </button>
          </div>
          {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default DonationSubmitFormDetails;
