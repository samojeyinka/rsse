import React from "react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
export default function BigOrangeButton(props) {
  let { children, loading, bgColor, hideIcon } = props;
  return (
    <LoadingButton
      // endIcon={hideIcon ? null : <SendIcon />}
      loadingPosition="end"
      variant="contained"
      type="submit"
      loading={loading}
      sx={{
        textTransform: "capitalize",
        backgroundColor: "#4D7249",
        color: "white",
        borderRadius: "47px",
        fontSize: "18px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
        "&:hover,&:disabled": {
          backgroundColor: "#4D7249a1",
        },
      }}
      disabled={loading}
      {...props}
    >
      {loading ? "Processing" : children}
    </LoadingButton>
  );
}
