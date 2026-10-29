import { IUser } from "../../types/user.type";
import { getTimeAgo } from "../../utils/function";
interface IProps {
  user: IUser;
}
const UserCard = (props: IProps) => {
  const user = props.user;
  return (
    <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-center gap-3">
        <img
          src={user.profilePhotoUrl || "https://cdn-icons-png.flaticon.com/512/3001/3001758.png"}
          alt=""
          className="size-11 rounded-full bg-white object-cover"
        />
        <div className="min-w-0 flex-1 font-secondary">
          <h3 className="truncate text-sm font-semibold text-slate-800">{user.fullName}</h3>
          <p className="truncate text-xs text-slate-500">{user.email}</p>
        </div>
        <span className="shrink-0 text-xs text-slate-500">{getTimeAgo(user.createdAt)} ago</span>
      </div>
    </article>
  );
};

export default UserCard;
