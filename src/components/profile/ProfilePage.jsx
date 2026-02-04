import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../features/profile/profileThunks";
import {
  selectProfile,
  selectIsProfileLoading,
} from "../../features/profile/profileSelectors";
import { useAuth } from "../../hooks/useAuth";
import ProfileCard from "../../components/profile/ProfileCard";
import EditProfileModal from "../../components/profile/EditProfileModal";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  console.log("Woo! user is coming in profile ", auth.user);

  const userId = auth.user.id;

  console.log(userId);

  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectIsProfileLoading);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId && !profile) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId, profile]);

  const handleSave = (data) => {
    dispatch(updateUserProfile(data));
    setIsEditing(false);
  };

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!profile) return null;

  return (
    <>
      <ProfileCard profile={profile} onEdit={() => setIsEditing(true)} />
      {isEditing && (
        <EditProfileModal
          profile={profile}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;
