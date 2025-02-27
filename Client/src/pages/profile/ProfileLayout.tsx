import ProfileSidebar from "../../components/ui/ProfileSidebar";
import { Outlet } from "react-router-dom";
import Container from "../../components/container/Container";

const ProfileLayout = () => {
  return (
    <Container className="lg:h-[90vh] py-10">
      <div className="lg:grid grid-cols-6 gap-20 h-full ">
        <div className="col-span-2 h-full shadow ">
          <ProfileSidebar />
        </div>
        <div className="col-span-4 lg:overflow-y-auto no-scrollbar  py-10">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default ProfileLayout;
