import React, { memo, useCallback } from "react";
import { TableCell, TableRow, Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

interface CategoryItemRowProps {
  category: { id: string; name: string };
  index: number;
  onEdit: (category: { id: string; name: string }) => void;
  onDelete: (id: string) => void;
}

const CategoryItemRow: React.FC<CategoryItemRowProps> = ({
  category,
  index,
  onEdit,
  onDelete,
}) => {
  const handleEdit = useCallback(() => onEdit(category), [onEdit, category]);
  const handleDelete = useCallback(
    () => onDelete(category.id),
    [onDelete, category.id]
  );

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell align="center">
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          startIcon={<CreateIcon />}
          sx={{ marginRight: "5px" }}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          disableElevation
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default memo(CategoryItemRow);
