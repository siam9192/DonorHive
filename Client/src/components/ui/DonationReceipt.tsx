import React, { Ref } from "react";

interface IProps {
  ref: Ref<HTMLDivElement>;
}

const DonationReceipt = ({ ref }: IProps) => {
  const currentDate = new Date().toDateString();
  return (
    <div ref={ref} className="  p-5" style={{ display: 1 && "none" }}>
      <h2 className="text-center text-xl font-semibold mb-4">Donation Receipt</h2>
      <p>
        <strong>Date:</strong> {currentDate}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold border-b pb-1">Donation Details</h3>
        <p>
          <strong>Donation Amount:</strong> $120 USD
        </p>
        <p>
          <strong>Donation ID:</strong> 34485656436545
        </p>
        <p>
          <strong>Is Anonymous:</strong> No
        </p>
        <p>
          <strong>Created At:</strong> {currentDate}
        </p>
        <p>
          <strong>Updated At:</strong> {currentDate}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold border-b pb-1">Campaign Information</h3>
        <p>
          <strong>Campaign Name:</strong> Education For Everyone
        </p>
        <p>
          <strong>Category:</strong> Food
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold border-b pb-1">Donor Information</h3>
        <p>
          <strong>Full Name:</strong> John Doe
        </p>
        <p>
          <strong>Email Address:</strong> johndoe@mail.com
        </p>
        <p>
          <strong>Phone Number:</strong> +98785655
        </p>
        <p>
          <strong>Address:</strong> 123 Belicon, New York, Bangladesh
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold border-b pb-1">Payment Information</h3>
        <p>
          <strong>Transaction ID:</strong> R576753F873KS
        </p>
        <p>
          <strong>Amount:</strong> $120 USD
        </p>
        <p>
          <strong>Currency:</strong> USD
        </p>
        <p>
          <strong>Payment Method:</strong> Paypal
        </p>
        <p>
          <strong>Status:</strong> Success
        </p>
      </div>

      <p className="text-center mt-4">
        Thank you for your generous donation! Your support is greatly appreciated.
      </p>
      <p className="text-center">For any inquiries, please contact us at support@example.com.</p>
    </div>
  );
};

export default DonationReceipt;
