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
  // Sử dụng useCallback để tối ưu hàm gọi lại, tránh tạo lại không cần thiết
  const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
  const handleDelete = useCallback(
    () => onDelete(product.id),
    [onDelete, product.id]
  );

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>

      {/* Tooltip cho tên sản phẩm */}
      <Tooltip title={product.name} arrow>
        <TableCell style={ellipsisStyle}>{product.name}</TableCell>
      </Tooltip>

      <TableCell>{product.available}</TableCell>
      <TableCell>{product.sold}</TableCell>

      {/* Tooltip cho danh mục */}
      <Tooltip title={category} arrow>
        <TableCell>{category}</TableCell>
      </Tooltip>

      {/* Tooltip cho màu sắc */}
      <Tooltip title={colors} arrow>
        <TableCell>{colors}</TableCell>
      </Tooltip>

      <TableCell>{product.price}</TableCell>

      <TableCell>
        {/* Nút Edit */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CreateIcon />}
          sx={{ marginRight: "5px" }}
          onClick={handleEdit}
        >
          Edit
        </Button>

        {/* Nút Delete */}
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

// Bao bọc component bằng React.memo để tối ưu hóa render
export default memo(ProductItemRow);
