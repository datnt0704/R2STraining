import React, { memo, useCallback } from "react";
import { TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import CategoryItemRow from "./CategoryItemRow";

interface CategoryListTableProps {
  categories: Record<string, { id: string; name: string }>;
  categoryIds: string[];
  currentPage: number;
  itemsPerPage: number;
  onEdit: (category: { id: string; name: string }) => void;
  onDelete: (id: string) => void;
  TableHeading: React.CSSProperties; // Truyền style từ prop
}

const CategoryListTable: React.FC<CategoryListTableProps> = ({
  categories,
  categoryIds,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
  TableHeading,
}) => {
  // Tạo các hàm sự kiện với useCallback để tránh re-create không cần thiết
  const handleEdit = useCallback(
    (category: { id: string; name: string }) => onEdit(category),
    [onEdit]
  );

  const handleDelete = useCallback((id: string) => onDelete(id), [onDelete]);

  return (
    <>
      {/* Phần TableHead được tích hợp vào đây */}
      <TableHead>
        <TableRow>
          <TableCell style={TableHeading}>No</TableCell>
          <TableCell style={TableHeading}>Name</TableCell>
          <TableCell style={TableHeading}></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {categoryIds.map((id, index) => (
          <CategoryItemRow
            key={id}
            category={categories[id]}
            index={index + (currentPage - 1) * itemsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </TableBody>
    </>
  );
};

// Sử dụng React.memo để tránh re-render không cần thiết
export default memo(CategoryListTable);
