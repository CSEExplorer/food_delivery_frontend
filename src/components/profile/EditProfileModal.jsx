import { useState } from "react";
import PropTypes from "prop-types";

const EditProfileModal = ({ profile, onSave, onClose }) => {
  const [form, setForm] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    phone: profile.phone || "",
    bio: profile.bio || "",
    country: profile.country || "",
    city: profile.city || "",
    language: profile.language || "",
    timezone: profile.timezone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Edit Profile</h3>

        {/* Name */}
        <div style={styles.row}>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            style={styles.input}
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            style={styles.input}
          />
        </div>

        {/* Contact */}
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          style={styles.input}
        />

        {/* Bio */}
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
          rows={3}
          style={styles.textarea}
        />

        {/* Location */}
        <div style={styles.row}>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            style={styles.input}
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            style={styles.input}
          />
        </div>

        {/* Preferences */}
        <div style={styles.row}>
          <input
            name="language"
            value={form.language}
            onChange={handleChange}
            placeholder="Language"
            style={styles.input}
          />

          <input
            name="timezone"
            value={form.timezone}
            onChange={handleChange}
            placeholder="Timezone"
            style={styles.input}
          />
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button style={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.save} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Styles ---------- */
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    padding: "28px",
    borderRadius: "18px",
    width: "420px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  },

  title: {
    margin: "0 0 16px",
    fontSize: "18px",
    fontWeight: 600,
  },

  row: {
    display: "flex",
    gap: "12px",
  },

  input: {
    flex: 1,
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    resize: "none",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "16px",
  },

  cancel: {
    background: "transparent",
    border: "none",
    color: "#555",
    cursor: "pointer",
  },

  save: {
    background: "#007AFF",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

/* ---------- Props Validation ---------- */
EditProfileModal.propTypes = {
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

    country: PropTypes.string,
    city: PropTypes.string,
    language: PropTypes.string,
    timezone: PropTypes.string,
  }).isRequired,

  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;
