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
export const summaryTextStyle = {
  whiteSpace: 'nowrap',  
  overflow: 'hidden',    
  textOverflow: 'ellipsis', 
  maxWidth: '150px',     
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
  justifyContent: "flex-end",  // Căn về bên phải
  marginTop: "16px",
  paddingRight: "16px",  // Khoảng cách với lề bên phải của bảng
};

export const paginationButtonStyle = {
  "& .MuiPaginationItem-root": {
    width: "40px",  // Chiều rộng nút
    height: "40px", // Chiều cao để tạo hình tròn
    borderRadius: "50%",  // Tạo nút hình tròn
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ddd",
    transition: "background-color 0.3s ease",
  },
};

export const paginationButtonHoverStyle = {
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "#f0f0f0",  // Màu nền khi hover
  },
};

export const paginationButtonDisabledStyle = {
  "& .MuiPaginationItem-root.Mui-disabled": {
    opacity: 0.5,
    cursor: "not-allowed",  // Con trỏ không cho phép click
  },
};


export const productTitleCellStyle = {
  whiteSpace: 'normal',  // Cho phép xuống dòng
  wordWrap: 'break-word', // Ngắt từ nếu quá dài
  maxWidth: '200px',      // Điều chỉnh kích thước tối đa nếu cần
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
  alignItems: "flex-start", // Căn Button theo dòng đầu tiên
  gap: "16px",
  
};

export const colorListStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  width: "70%", // Chiếm 70% chiều ngang
  gap: "8px",
  maxHeight: "300px",
  overflowY: "auto", // Đảm bảo cuộn nếu vượt quá chiều cao
};
