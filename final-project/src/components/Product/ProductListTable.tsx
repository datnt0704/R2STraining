import React, { useCallback } from "react";
import ProductItemRow from "./ProductItemRow";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface ProductListTableProps {
  products: any;
  productIds: string[];
  categories: any;
  colors: any;
  currentPage: number;
  itemsPerPage: number;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
  TableHeading: React.CSSProperties;
}

const ProductListTable: React.FC<ProductListTableProps> = ({
  products,
  productIds,
  categories,
  colors,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
  TableHeading,
}) => {
  const getCategoryNameById = useCallback(
    (id: string) => categories[id]?.name,
    [categories]
  );

  const getColorNamesById = useCallback(
    (colorIds: number[]) =>
      colorIds.length
        ? colorIds.map((id) => colors[id]?.name || "Unknown").join(", ")
        : "No colors available",
    [colors]
  );

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell style={TableHeading}>No</TableCell>
          <TableCell style={TableHeading}>Name</TableCell>
          <TableCell style={TableHeading}>Available</TableCell>
          <TableCell style={TableHeading}>Sold</TableCell>
          <TableCell style={TableHeading}>Category</TableCell>
          <TableCell style={TableHeading}>Colors</TableCell>
          <TableCell style={TableHeading}>Price</TableCell>
          <TableCell style={TableHeading}></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {productIds.map((id, index) => (
          <ProductItemRow
            key={id}
            product={products[id]}
            index={index + (currentPage - 1) * itemsPerPage}
            category={getCategoryNameById(products[id].categoryId)}
            colors={getColorNamesById(products[id].colorIds || [])}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(ProductListTable);
