import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index";
import {
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/reducers/productReducer";
import { fetchColor } from "../store/reducers/colorReducer";
import { fetchCategories } from "../store/reducers/categoryReducer";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import ProductDialog from "../components/Product/ProductDialog";
import NotificationSnackbar from "../components/NotificationSnackbar";
import {
  summaryContainerStyle,
  addButtonStyle,
  summaryItemStyle,
  summaryDetailsStyle,
  summaryTextStyle,
  TableHeading,
} from "./styles";
import PaginationControl from "../components/PaginationControl";
import ProductListTable from "../components/Product/ProductListTable";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    entities: products = {},
    ids: productIds = [],
    status,
  } = useSelector((state: any) => state.product);
  const { entities: categories = {} } = useSelector(
    (state: any) => state.category
  );
  const { entities: colors = {} } = useSelector((state: any) => state.color);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
      dispatch(fetchCategories());
      dispatch(fetchColor());
    }
  }, [status, dispatch]);

  const totalProducts = useMemo(() => productIds.length, [productIds]);

  const totalAvailable = useMemo(
    () =>
      productIds.reduce(
        (acc: number, id: string) => acc + (products[id]?.available || 0),
        0
      ),
    [productIds, products]
  );

  const totalSold = useMemo(
    () =>
      productIds.reduce(
        (acc: number, id: string) => acc + (products[id]?.sold || 0),
        0
      ),
    [productIds, products]
  );

  const revenue = useMemo(
    () =>
      productIds.reduce(
        (acc: number, id: string) =>
          acc + (products[id]?.price * products[id]?.sold || 0),
        0
      ),
    [productIds, products]
  );

  const handleNotification = useCallback(
    (message: string, severity: "success" | "error") => {
      setSnackBarMessage(message);
      setSnackBarSeverity(severity);
      setSnackBarOpen(true);
    },
    []
  );

  const handleCloseSnackBar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setSnackBarOpen(false);
    },
    []
  );

  const handleSubmit = useCallback(
    (submittedProduct: any) => {
      const action = submittedProduct.id
        ? updateProduct(submittedProduct)
        : addProduct(submittedProduct);

      dispatch(action)
        .unwrap()
        .then(() =>
          handleNotification(
            submittedProduct.id ? "Product updated!" : "Product added!",
            "success"
          )
        )
        .catch(() =>
          handleNotification(
            submittedProduct.id ? "Failed to update!" : "Failed to add!",
            "error"
          )
        );
      setOpen(false);
    },
    [dispatch, handleNotification]
  );

  const handleAddProduct = useCallback(() => {
    setSelectedProduct(null);
    setOpen(true);
  }, []);

  const handleEditProduct = useCallback((product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  }, []);

  const handleDeleteProduct = useCallback((id: number) => {
    setProductToDelete(id);
    setOpenConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (productToDelete !== null) {
      dispatch(deleteProduct(productToDelete))
        .unwrap()
        .then(() =>
          handleNotification("Product deleted successfully!", "success")
        )
        .catch(() => handleNotification("Failed to delete product.", "error"));
      setProductToDelete(null);
      setOpenConfirm(false);
    }
  }, [dispatch, productToDelete, handleNotification]);

  const totalPages = useMemo(
    () => Math.ceil(productIds.length / itemsPerPage),
    [productIds, itemsPerPage]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return productIds.slice(start, end);
  }, [productIds, currentPage, itemsPerPage]);

  return (
    <>
      <TableContainer>
        <h1>Seller</h1>
        <div style={summaryContainerStyle}>
          <div style={summaryDetailsStyle}>
            <div style={{ ...summaryItemStyle, ...summaryTextStyle }}>
              Total: {totalProducts}
            </div>
            <div style={{ ...summaryItemStyle, ...summaryTextStyle }}>
              Available: {totalAvailable}
            </div>
            <div style={{ ...summaryItemStyle, ...summaryTextStyle }}>
              Sold: {totalSold}
            </div>
            <div style={{ ...summaryItemStyle, ...summaryTextStyle }}>
              Revenue: {revenue}
            </div>
            <Button
              variant="outlined"
              color="success"
              disableElevation
              startIcon={<LibraryAddOutlinedIcon />}
              onClick={handleAddProduct}
              sx={addButtonStyle}
            >
              Add
            </Button>
          </div>
        </div>

        <Table>
          <ProductListTable
            products={products}
            productIds={paginatedProducts}
            categories={categories}
            colors={colors}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            TableHeading={TableHeading}
          />
        </Table>

        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </TableContainer>

      <ProductDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        product={selectedProduct}
      />

      <ConfirmDeleteDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />

      <NotificationSnackbar
        open={snackBarOpen}
        message={snackBarMessage}
        severity={snackBarSeverity}
        onClose={handleCloseSnackBar}
      />
    </>
  );
};

export default Products;
