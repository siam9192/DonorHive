import { toast } from "sonner";
import { useDeleteCampaignMutation } from "../../redux/features/campaign/campaign.api";
import { ICampaign } from "../../types/campaign.type";
import ConfirmPopup from "../popup/ConfirmPopup";
import EditCampaignPopup from "../ui/EditCampaignPopup";

interface IProps {
  campaign: ICampaign;
}
const ManageCampaignCard = ({ campaign }: IProps) => {
  const endAt = new Date(campaign.endAt);
  const createdAt = new Date(campaign.createdAt);
  const updatedAt = new Date(campaign.updatedAt);
  const [deleteFn] = useDeleteCampaignMutation();

  const handelDelete = async () => {
    const res = await deleteFn(campaign._id);
    if (res.data?.success) {
      toast.success("Successfully Deleted");
    } else toast.error("Something went wrong");
  };

  const isScheduled = new Date(campaign.startAt).getTime() > new Date().getTime();
  return (
    <tr className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-1">
          <img src={campaign.coverImageUrl} alt="" className="size-12" />
          <h3 className="text-black">{campaign.title}</h3>
        </div>
      </th>
      <td className="px-6 py-4">{campaign.category}</td>
      <td className="px-6 py-4">{campaign.raisedAmount}</td>
      <td className="px-6 py-4">{campaign.targetAmount}</td>
      <td className="px-6 py-4">
        {endAt.toDateString()}-{endAt.toLocaleTimeString()}
      </td>
      <td className="px-6 py-4">{isScheduled ? "Scheduled" : campaign.status}</td>
      <td className="px-6 py-4">
        {createdAt.toDateString()}-{createdAt.toLocaleTimeString()}
      </td>
      <td className="px-6 py-4">
        {updatedAt.toDateString()}-{updatedAt.toLocaleTimeString()}
      </td>
      <td className="px-6 py-4 space-x-4">
        <button className="text-black font-medium">Details</button>
        <EditCampaignPopup id={campaign._id}>
          <button className="text-primary font-medium">Edit</button>
        </EditCampaignPopup>
        <ConfirmPopup onConfirm={handelDelete} heading="Delete Campaign">
          <button className="text-red-500 font-medium">Delete</button>
        </ConfirmPopup>
      </td>
    </tr>
  );
};

export default ManageCampaignCard;
