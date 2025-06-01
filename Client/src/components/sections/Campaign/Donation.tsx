import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import DonorDetailsForm from "../../ui/DonorDetailsForm";
import { getFormValues } from "../../../utils/function";
import { useCurrentUser } from "../../../provider/CurrentUserProvider";
import { ICampaign } from "../../../types/campaign.type";
import DonationSubmitFormDetails from "../../ui/DonationSubmitFormDetails";
import { EUserRole } from "../../../types/user.type";
interface IProps {
  campaign: ICampaign;
}
const Donation = ({ campaign }: IProps) => {
  const featuredAmounts = [20, 50, 80, 100, 150, 200, 250, 300, 350, 500];
  const [isAnonymously, setIsAnonymously] = useState(false);
  const [isAddComment, setIsAddComment] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [error, setError] = useState<Record<string, any>>({});
  const { user: currentUser } = useCurrentUser();
  const amountInputRef = useRef<HTMLInputElement>(null);

  const handelOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate(e.target as HTMLFormElement);

    const errorFields = Object.keys(error);
    if (errorFields.length) {
      const field = e.currentTarget.elements.namedItem(errorFields[0]) as HTMLElement | null;
      field?.focus();
      field?.focus();
      return;
    }
  };

  const handelFormOnChange = (e: ChangeEvent<HTMLFormElement>) => {
    validate(e.currentTarget);
  };

  const validate = (e: HTMLFormElement) => {
    if (!e) return;

    // e.preventDefault();
    setError({});
    const fieldNames = [
      "amount",
      "comment",
      "guestDonorInfo.email",
      "guestDonorInfo.phoneNumber",
      "guestDonorInfo.fullName",
      "guestDonorInfo.email",
      "guestDonorInfo.phoneNumber",
      "guestDonorInfo.address.country",
      "guestDonorInfo.address.state",
      "guestDonorInfo.address.city",
      "guestDonorInfo.address.street",
    ];

    const values = getFormValues(e, fieldNames);

    let data: any = {
      amount: values.amount,
      comment: values.comment,
      isAnonymously,
    };
    const fieldError: Record<string, any> = {};

    if (isNaN(data.amount)) {
      fieldError.amount = "Enter a valid amount";
    } else if (data.amount < 1) {
      fieldError.amount = "Amount must be minimum $1";
    }

    if (!isAnonymously) {
      data.guestDonorInfo = {
        fullName: values["guestDonorInfo.fullName"],
        email: values["guestDonorInfo.email"],
        phoneNumber: values["guestDonorInfo.phoneNumber"],
        address: {
          street: values["guestDonorInfo.address.street"],
          city: values["guestDonorInfo.address.city"],
          state: values["guestDonorInfo.address.state"],
          country: values["guestDonorInfo.address.country"],
        },
      };

      const { guestDonorInfo } = data;

      // Email
      if (!guestDonorInfo.email) {
        fieldError["guestDonorInfo.email"] = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestDonorInfo.email)) {
        fieldError["guestDonorInfo.email"] = "Invalid email address";
      }

      // Full name
      if (!guestDonorInfo.fullName) {
        fieldError["guestDonorInfo.fullName"] = "Full name is required";
      } else if (guestDonorInfo.fullName.length < 2) {
        fieldError["guestDonorInfo.fullName"] = "Full name must be at least 2 characters";
      } else if (guestDonorInfo.fullName.length > 20) {
        fieldError["guestDonorInfo.fullName"] = "Full name must be at most 20 characters";
      }

      const address = guestDonorInfo.address;

      if (!address.street) {
        fieldError["guestDonorInfo.address.street"] = "Street is required";
      } else if (address.street.length < 2) {
        fieldError["guestDonorInfo.address.street"] = "Street must be at least 2 characters";
      } else if (address.street.length > 20) {
        fieldError["guestDonorInfo.address.street"] = "Street must be at most 20 characters";
      }

      if (!address.city) {
        fieldError["guestDonorInfo.address.city"] = "City is required";
      } else if (address.city.length < 2) {
        fieldError["guestDonorInfo.address.city"] = "City must be at least 2 characters";
      } else if (address.city.length > 20) {
        fieldError["guestDonorInfo.address.city"] = "City must be at most 20 characters";
      }

      if (!address.country) {
        fieldError["guestDonorInfo.address.country"] = "Country is required";
      } else if (address.country.length < 2) {
        fieldError["guestDonorInfo.address.country"] = "Country must be at least 2 characters";
      } else if (address.country.length > 20) {
        fieldError["guestDonorInfo.address.country"] = "Country must be at most 20 characters";
      }
    }
    if (!data.comment || Comment.length > 3) {
      fieldError.comment = "Comment must be minimum 3 character";
    }

    if (Object.values(fieldError).length) {
      return setError(fieldError);
    } else {
      setValues(data);
    }
  };

  const closeDetails = () => {
    setIsOpen(false);
  };

  const isValid =
    (currentUser && currentUser?.role !== EUserRole.Donor ? true : false) ||
    !Object.keys(error).length;

  return (
    <section className="p-5  min-h-[700px] ">
      <form ref={ref} action="" onSubmit={handelOnSubmit} onChange={handelFormOnChange}>
        <h2 className="text-2xl font-medium text-gray-950">Secure Donation</h2>

        <div className="mt-5 grid grid-cols-3 gap-3 font-secondary">
          {featuredAmounts.map((amount) => (
            <button
              type="button"
              onClick={() => {
                const current = amountInputRef.current;
                if (!current) return;
                setSelectedAmount(amount);
                current.value = amount.toFixed(2);
              }}
              key={amount}
              className={`w-full py-2    border-gray-600/15 rounded-md font-medium ${selectedAmount === amount ? "border-primary border-2" : "border"}`}
            >
              ${amount}
            </button>
          ))}
        </div>

        <div>
          <div className="mt-3 flex items-center gap-2 px-3 border-2 border-gray-700/10 rounded-lg">
            <span className="text-xl ">
              <FiDollarSign />
            </span>
            <input
              type="number"
              name="amount"
              ref={amountInputRef}
              onChange={(e) => {
                setSelectedAmount(parseInt(e.target.value));
              }}
              readOnly={false}
              className="w-full py-3 outline-none text-xl text-primary font-medium"
            />
            <p className="text-gray-500">USD</p>
          </div>
          {error["amount"] && <p className="mt-1 text-red-500">{error.amount}</p>}
        </div>
        <div className=" mt-8 flex items-center gap-2">
          <input
            onChange={(e) => setIsAnonymously(e.target.checked)}
            type="checkbox"
            className="size-5 accent-secondary"
            name="isAnonymously"
          />
          <label htmlFor="" className="text-gray-600 font-medium font-secondary">
            Donate as anonymously
          </label>
        </div>

        {!isAnonymously && error ? <DonorDetailsForm error={error} /> : null}

        <div className="mt-10 space-y-2">
          <button
            type="button"
            className=" text-gray-900 border-b font-medium block"
            // onClick={() => setIsAddComment((p) => !p)}
          >
            {/* {!isAddComment ? "Add comment" : "Remove comment"} */}
            Your comment
          </button>

          <textarea
            name="comment"
            id=""
            placeholder="Your comment"
            className=" w-full h-40 bg-gray-50  border-2 border-gray-600/10 rounded-lg resize-none p-2 outline-secondary "
          />
          {error["comment"] && <p className="mt-1 text-red-500">{error["comment"]}</p>}
        </div>
        <div className="mt-14">
          <button
            disabled={!isValid}
            type="submit"
            className="py-3 disabled:bg-gray-100 disabled:text-gray-600 bg-primary text-white font-semibold w-full rounded-lg font-secondary"
          >
            Donate {selectedAmount ? "$" + selectedAmount : ""}
          </button>
        </div>
      </form>
      {isOpen && values && (
        <DonationSubmitFormDetails
          onSuccess={closeDetails}
          close={closeDetails}
          values={{ ...values, campaign } as any}
        />
      )}
      <div className=" mt-10 pt-4 border-t border-gray-700/20">
        <button className="text-sm font-medium text-gray-900 border-b ">
          Our Refund Policies:
        </button>
        <p className="mt-2 text-gray-700 font-secondary text-sm">
          Donations to our campaign are non-refundable, as they directly support our mission and
          initiatives. However, if an error occurs during payment, please contact us within 7 days
          for resolution. Refunds may be considered in exceptional cases at our discretion. Thank
          you for your generous support and understanding.
        </p>
      </div>
    </section>
  );
};

export default Donation;
