import styled from "styled-components";
import { Box, Paper } from "@mui/material";

export const boxStyle = {
  margin: 'auto',
  border: '1px solid #c3c3c3',
  borderRadius: '5px',
  backgroundColor: 'white',
  width: '400px',
  padding: '20px',
};


export const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "auto",
  height: "40px",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#f6f6f6",
  borderRadius: "5px",
  fontWeight: "600",
}));

export const TableHeading = {
  color: "black",
  fontWeight: "600",
  backgroundColor: "#ccc",
};