import type { CSSProperties } from "react";

type Styles = {
  container: CSSProperties;
  content: CSSProperties;
};

export const styles: Styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f5f7fa", // רקע עדין
    display: "flex",
    flexDirection: "column",
  },

  content: {
    maxWidth: "900px",
    width: "100%",
    margin: "0 auto",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    flexGrow: 1,
  },
};
