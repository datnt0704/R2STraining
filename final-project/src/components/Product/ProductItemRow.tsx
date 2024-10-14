// ProductItemRow.tsx
import React, { memo, useCallback } from "react";
import { TableCell, TableRow, Button, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { ellipsisStyle } from "../styles";

interface ProductItemRowProps {
  product: any;
  index: number;
  category: string;
  colors: string;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

const ProductItemRow: React.FC<ProductItemRowProps> = ({
  product,
  index,
  category,
  colors,
  onEdit,
  onDelete,
}) => {
  const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
  const handleDelete = useCallback(
    () => onDelete(product.id),
    [onDelete, product.id]
  );

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>

      <Tooltip title={product.name} arrow>
        <TableCell style={ellipsisStyle}>{product.name}</TableCell>
      </Tooltip>

      <Tooltip title={product.available} arrow>
        <TableCell style={ellipsisStyle}>{product.available}</TableCell>
      </Tooltip>

      <Tooltip title={product.sold} arrow>
        <TableCell style={ellipsisStyle}>{product.sold}</TableCell>
      </Tooltip>

      <Tooltip title={category} arrow>
        <TableCell style={ellipsisStyle}>{category}</TableCell>
      </Tooltip>

      <Tooltip title={colors} arrow>
        <TableCell style={ellipsisStyle}>{colors}</TableCell>
      </Tooltip>

      <Tooltip title={product.price} arrow>
        <TableCell style={ellipsisStyle}>{product.price}</TableCell>
      </Tooltip>
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CreateIcon />}
          sx={{ marginRight: "5px" }}
          onClick={handleEdit}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
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

export default memo(ProductItemRow);
