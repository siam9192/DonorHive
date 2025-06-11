import MyDonationDetailsPopup from "../ui/MyDonationDetailsPopup";
import { TMyDonation } from "../../types/donation.type";
import envConfig from "../../config/env.config";

interface IProps {
  donation: TMyDonation;
}

const MyDonationCard = ({ donation }: IProps) => {
  const downloadUrl: string = `${envConfig.serverBaseUrl}/donations/${donation._id}/receipt`;
  function downloadReceipt() {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.setAttribute("target", `_blank`);
    a.setAttribute("download", `donation receipt-${new Date().toString()}`); // Fallback filename
    // DO NOT set target="_blank" to prevent opening in a new tab
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className=" md:p-3 p-2 border-2 rounded-md border-gray-400/20 mt-3 space-y-2 relative">
      {donation.isAnonymously ? (
        <p className="text-red-400 font-medium text-sm">Anonymous</p>
      ) : null}
      <h4 className=" font-medium text-gray-950 md:text-[1rem] text-[0.7rem]">
        {donation.campaign.title}
      </h4>

      <div className="flex md:flex-row flex-col md:items-center justify-between">
        <p className="font-medium text-sm text-gray-500 md:text-[1rem] text-[0.6rem]">
          {new Date(donation.createdAt).toDateString()}.
          {new Date(donation.createdAt).toLocaleTimeString()}
        </p>
        <div className="flex  items-center gap-2 justify-end md:text-sm text-[0.7rem]">
          <MyDonationDetailsPopup id={donation._id}>
            <div className="text-primary font-medium">Details</div>
          </MyDonationDetailsPopup>
          <button onClick={downloadReceipt} className="text-amber-500 font-medium">
            Download Receipt
          </button>
        </div>
      </div>
      <h4 className="absolute top-2 right-2 font-semibold text-sm text-primary">
        ${parseFloat(donation.amount.toString()).toFixed(2)}
      </h4>
    </div>
  );
};

export default MyDonationCard;
