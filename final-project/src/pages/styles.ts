import { CSSProperties } from "react";

export const boxStyle = {
  margin: 'auto',
  border: '1px solid #c3c3c3',
  borderRadius: '5px',
  backgroundColor: 'white',
  width: '400px',
  padding: '20px',
};



export const summaryContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "10px",
  marginBottom: "20px",
  
};

export const summaryDetailsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

export const summaryItemStyle: React.CSSProperties = {
  backgroundColor: "#d4efdf",
  textAlign: "center",
  padding: "10px",
  borderRadius: "5px",
};

export const addButtonStyle = {
  height: "45px",
  fontWeight: "bold",
  padding: "0 20px",
  borderRadius: "5px",
  textTransform: "uppercase",
};



export const TableHeading = {
  color: "black",
  fontWeight: "600",
  backgroundColor: "#e6e6e6",
};

export const paginationContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",  
  marginTop: "16px",
  paddingRight: "16px",  
};

export const paginationButtonStyle = {
  "& .MuiPaginationItem-root": {
    width: "40px",  
    height: "40px", 
    borderRadius: "50%",  
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ddd",
    transition: "background-color 0.3s ease",
  },
};

export const paginationButtonHoverStyle = {
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "#f0f0f0",  
  },
};

export const paginationButtonDisabledStyle = {
  "& .MuiPaginationItem-root.Mui-disabled": {
    opacity: 0.5,
    cursor: "not-allowed", 
  },
};


export const productTitleCellStyle = {
  whiteSpace: 'normal', 
  wordWrap: 'break-word', 
  maxWidth: '200px',      
};

export const tableDataCellStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '80px',
};


export const colorChipStyle: CSSProperties = {
  margin: "7px",
  cursor: "pointer",
};

export const colorContainerStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start", 
  gap: "16px",
  
};

export const colorListStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  width: "70%",
  gap: "8px",
  maxHeight: "300px",
  overflowY: "auto", 
};
