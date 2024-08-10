import React from "react";
import { TextField, styled } from "@mui/material";
export const CustomizeInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& label.Mui-focused": {
    color: "white",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& label": {
    color: "white",
    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent",
  },
  "& .MuiOutlinedInput-root": {
    border: "none",
    outline: "none",
    fontSize: "40px",
    color: "#fff",
    backgroundColor: "#050505",
    "& fieldset": {
      borderColor: "none !important",
    },
    "&:hover fieldset": {
      //  borderColor: "#828282",
    },
    "&:active fieldset": {
      borderColor: "none !important",
      //  borderColor: "#828282",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#504c54",
      border: "none",
      outline: "none",
    },
    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        // borderColor: "#828282",
      },
    },
  },
}));
