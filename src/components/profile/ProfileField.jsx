import PropTypes from "prop-types";

const ProfileField = ({ label, value, muted }) => {
  const displayValue =
    value === null || value === undefined || value === "" ? "—" : value;

  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <span
        style={{
          ...styles.value,
          ...(muted ? styles.muted : {}),
        }}
      >
        {displayValue}
      </span>
    </div>
  );
};

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },

  label: {
    color: "#6e6e73", // Apple system gray
    fontSize: "13px",
    fontWeight: 500,
  },

  value: {
    color: "#1d1d1f",
    fontWeight: 500,
    fontSize: "14px",
    maxWidth: "60%",
    textAlign: "right",
    wordBreak: "break-word",
  },

  muted: {
    color: "#8e8e93",
    fontWeight: 400,
  },
};

/* ---------- Props validation ---------- */
ProfileField.propTypes = {
  label: PropTypes.string.isRequired,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.node,
  ]),

  // optional visual hint (eg. unverified, disabled)
  muted: PropTypes.bool,
};

ProfileField.defaultProps = {
  muted: false,
};

export default ProfileField;
