import ProfileField from "./ProfileField";
import PropTypes from "prop-types";

const ProfileCard = ({ profile, onEdit }) => {
  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.name}>
            {profile.firstName} {profile.lastName}
          </h2>
          <p style={styles.username}>@{profile.username}</p>
          <p style={styles.email}>{profile.email}</p>
        </div>

        <button style={styles.editBtn} onClick={onEdit}>
          Edit
        </button>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information">
        <ProfileField label="Phone" value={profile.phone} />
        <ProfileField label="Date of Birth" value={profile.dateOfBirth} />
        <ProfileField label="Gender" value={profile.gender} />
        <ProfileField label="Bio" value={profile.bio} />
      </Section>

      {/* Location */}
      <Section title="Location">
        <ProfileField label="Country" value={profile.country} />
        <ProfileField label="City" value={profile.city} />
        <ProfileField label="Timezone" value={profile.timezone} />
        <ProfileField label="Language" value={profile.language} />
      </Section>

      {/* Verification */}
      {profile.verification && (
        <Section title="Verification">
          <ProfileField
            label="Email Verified"
            value={profile.verification.isEmailVerified ? "Yes" : "No"}
          />
          <ProfileField
            label="Phone Verified"
            value={profile.verification.isPhoneVerified ? "Yes" : "No"}
          />
          <ProfileField
            label="KYC Status"
            value={profile.verification.kycStatus}
          />
        </Section>
      )}
    </div>
  );
};

/* ---------- Section Wrapper ---------- */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h4 style={styles.sectionTitle}>{title}</h4>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/* ---------- Styles ---------- */
const styles = {
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "28px",
    maxWidth: "640px",
    margin: "40px auto",
    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "28px",
  },

  name: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600,
  },

  username: {
    margin: "4px 0",
    color: "#888",
    fontSize: "14px",
  },

  email: {
    margin: 0,
    color: "#555",
    fontSize: "14px",
  },

  editBtn: {
    border: "none",
    background: "#007AFF",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    height: "fit-content",
  },

  section: {
    marginTop: "24px",
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#888",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
};

/* ---------- Props Validation ---------- */
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,

    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
    phone: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,

    country: PropTypes.string,
    city: PropTypes.string,
    language: PropTypes.string,
    timezone: PropTypes.string,

    verification: PropTypes.shape({
      isEmailVerified: PropTypes.bool,
      isPhoneVerified: PropTypes.bool,
      isIdentityVerified: PropTypes.bool,
      kycStatus: PropTypes.string,
    }),
  }).isRequired,

  onEdit: PropTypes.func.isRequired,
};

export default ProfileCard;
