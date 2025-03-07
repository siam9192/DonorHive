import ProfileSidebar from "../../components/ui/ProfileSidebar";
import { Outlet, useLocation } from "react-router-dom";
import Container from "../../components/container/Container";
import { useEffect, useRef } from "react";
import { boolean } from "zod";

const ProfileLayout = () => {
  const {pathname} = useLocation()
  const ref = useRef<HTMLDivElement>(null);
  const renderRef = useRef<boolean>(false);

  useEffect(() => {
  
    if (renderRef.current) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      renderRef.current = true;
    }
  }, [pathname]);

  return (
    <Container className="lg:h-[90vh] py-10">
      <div ref={ref} className="lg:grid grid-cols-6 gap-20 h-full ">
        <div className="col-span-2 h-full shadow ">
          <ProfileSidebar />
        </div>
        <div  className="col-span-4 lg:overflow-y-auto no-scrollbar  py-10">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default ProfileLayout;
