import ProfileSidebar from "../../components/ui/ProfileSidebar";
import { Outlet } from "react-router-dom";
import Container from "../../components/container/Container";
import { BiDonateHeart } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { GiTakeMyMoney } from "react-icons/gi";
import MyRecentDonations from "../../components/sections/Profile/MyRecentDonations";

const Profile = () => {
  const data = [
    {
      title: "Donate",
      icon: <BiDonateHeart />,
      value: 30,
      color: "#B3D8A8",
    },
    {
      title: "$Total Donated ",
      icon: <GiTakeMyMoney />,
      value: 3874,
      color: "#2D336B",
      iconColor: "#FFF",
    },
    {
      title: "Watch Listed",
      icon: <BsEye />,
      value: 3,
      color: "#F8E7F6",
    },
    {
      title: "Notifications ",
      icon: <GoBell />,
      value: 8,
      color: "#9ACBD0",
    },
  ];
  return (
    <Container>
      <section className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-3">
        {data.map((item) => (
          <div className="p-5 rounded-md  space-y-5  shadow" key={item.title}>
            <div
              className="p-3 size-fit text-2xl  rounded-md"
              style={{ backgroundColor: item.color, color: item.iconColor }}
            >
              {item.icon}
            </div>
            <h1 className="text-3xl  text-center font-bold  text-primary">{item.value}</h1>
            <p className="text-center text-gray-700 font-semibold">{item.title}</p>
          </div>
        ))}
      </section>
      <MyRecentDonations />
    </Container>
  );
};

export default Profile;
