import Container from "../../components/container/Container";

import MyRecentDonations from "../../components/sections/Profile/MyRecentDonations";
import ProfileSummary from "../../components/sections/Profile/ProfileSummary";

const Profile = () => {
  return (
    <Container>
      <ProfileSummary />
      <MyRecentDonations />
    </Container>
  );
};

export default Profile;
