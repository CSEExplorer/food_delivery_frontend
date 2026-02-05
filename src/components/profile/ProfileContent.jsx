// import BasicInfoSection from "./BasicInfoSection";
import AddressCard from "./AddressCard";
import ProfileCard from "./ProfileCard";
import PropTypes from "prop-types";
const ProfileContent = ({ active, profile, addresses, onEdit }) => {
  return (
    <main className="content">
      {active === "basic" && <ProfileCard profile={profile} onEdit={onEdit} />}
      {active === "address" && <AddressCard addresses={addresses} />}
    </main>
  );
};
ProfileContent.propTypes = {
  /** Active tab identifier */
  active: PropTypes.string.isRequired,

  /** Profile data (used when active === "basic") */
  profile: PropTypes.object.isRequired,

  /** Address data (used when active === "address") */
  addresses: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,

  /** Edit handler for profile */
  onEdit: PropTypes.func.isRequired,
};
export default ProfileContent;
