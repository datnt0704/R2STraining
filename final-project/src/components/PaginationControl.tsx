import React from "react";
import { Pagination, Box } from "@mui/material";
import {
  paginationContainerStyle,
  paginationButtonStyle,
  paginationButtonHoverStyle,
  paginationButtonDisabledStyle,
} from "../pages/styles";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControl: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box sx={{ ...paginationContainerStyle }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        siblingCount={1}
        boundaryCount={2}
        sx={{
          ...paginationButtonStyle,
          ...paginationButtonHoverStyle,
          ...paginationButtonDisabledStyle,
        }}
      />
    </Box>
  );
};

export default PaginationControl;
