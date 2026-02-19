import { type CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    background: "#295074",
  },
  conection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logInOutButton: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    padding: "6px 8px",
    lineHeight: "1",
  },
  logo: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  userBox: {
    cursor: "pointer",
  },
};

export default styles;
