import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAddresses,
} from "../../features/profile/profileThunks";
import {
  selectProfile,
  selectIsProfileLoading,
  selectAddresses,
} from "../../features/profile/profileSelectors";
import { useAuth } from "../../hooks/useAuth";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileSidebar from "../profile/ProfileSidebar";
import ProfileContent from "./ProfileContent";

import EditProfileModal from "../../components/profile/EditProfileModal";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  // console.log("Hii i am auth from profile page", auth);
  const userId = auth?.user?.id;
  const profile = useSelector(selectProfile);
  const isLoading = useSelector(selectIsProfileLoading);
  const addresses = useSelector(selectAddresses);

  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId && !profile) dispatch(fetchUserProfile(userId));
  }, [dispatch, userId, profile]);

  useEffect(() => {
    if (profile?.userId) dispatch(fetchAddresses(profile.userId));
  }, [dispatch, profile]);

  const handleSave = (data) => {
    dispatch(updateUserProfile({ profileId: userId, input: data }));
    setIsEditing(false);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileHeader profile={profile} />

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 lg:flex-row flex-col">
        <ProfileSidebar active={activeTab} onChange={setActiveTab} />

        <ProfileContent
          active={activeTab}
          profile={profile}
          addresses={addresses}
          onEdit={() => setIsEditing(true)}
        />
      </div>

      {isEditing && (
        <EditProfileModal
          profile={profile}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
