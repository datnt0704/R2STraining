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
  TableHeading: React.CSSProperties;
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
  const handleEdit = useCallback(
    (category: { id: string; name: string }) => onEdit(category),
    [onEdit]
  );

  const handleDelete = useCallback((id: string) => onDelete(id), [onDelete]);

  return (
    <>
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

export default memo(CategoryListTable);
