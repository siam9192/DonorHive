import { useGetRecentUsersQuery } from "../../../../redux/features/user/user.api";
import UserCard from "../../../cards/UserCard";

const RecentUsers = () => {
  const { data } = useGetRecentUsersQuery(undefined);
  const users = data?.data || [];
  return (
    <section className=" md:p-5 p-3 bg-white border-2 border-gray-600/10 rounded-lg  flex flex-col">
      <h1 className="md:text-2xl text-xl font-semibold ">Recent Users</h1>
      <div className="min-h-[60vh] overflow-y-scroll">
        {users.length ? (
          <div className="mt-5 my-4 flex-grow ">
            {users.map((_, index) => (
              <UserCard user={_} key={index} />
            ))}
          </div>
        ) : (
          <div className="p-3">
            <p>No recent user</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentUsers;
