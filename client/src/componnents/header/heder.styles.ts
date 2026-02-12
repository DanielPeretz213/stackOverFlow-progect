import { type CSSProperties} from "react"

const styles: Record<string,CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    background: "#001529",
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
