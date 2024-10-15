import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Button, Table, TableContainer } from "@mui/material";
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
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import ProductDialog from "../components/Product/ProductDialog";
import NotificationSnackbar from "../components/NotificationSnackbar";
import {
  summaryContainerStyle,
  addButtonStyle,
  summaryItemStyle,
  summaryDetailsStyle,
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

  const totalAvailable = useMemo(
    () =>
      productIds.reduce(
        (acc: number, id: string) =>
          acc + (Number(products[id]?.available) || 0),
        0
      ),
    [productIds, products]
  );

  const totalSold = useMemo(
    () =>
      productIds.reduce(
        (acc: number, id: string) => acc + (Number(products[id]?.sold) || 0),
        0
      ),
    [productIds, products]
  );

  const totalProducts = useMemo(
    () => totalAvailable + totalSold,
    [totalAvailable, totalSold]
  );

  const revenue = useMemo(
    () =>
      productIds.reduce(
        (acc: number, id: string) =>
          acc +
          Number(products[id]?.price || 0) * Number(products[id]?.sold || 0),
        0
      ),
    [productIds, products]
  );

  const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

  const formatNumber = useCallback(
    (value: number) => formatter.format(value),
    [formatter]
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
    async (submittedProduct: any) => {
      try {
        const action = submittedProduct.id ? updateProduct : addProduct;
        const productData = {
          ...submittedProduct,
          id: submittedProduct.id,
        };

        const resultAction = await dispatch(action(productData));

        if (action.fulfilled.match(resultAction)) {
          handleNotification(
            `Product ${
              submittedProduct.id ? "updated" : "added"
            } successfully!`,
            "success"
          );

          setOpen(false);
          setSelectedProduct(null);
        } else {
          handleNotification(
            `Failed to ${submittedProduct.id ? "update" : "add"} product.`,
            "error"
          );
        }
      } catch (error) {
        handleNotification(
          `Failed to ${submittedProduct.id ? "update" : "add"} product.`,
          "error"
        );
      } finally {
        setOpen(false);
        setSelectedProduct(null);
      }
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

  const totalPages = Math.ceil(productIds.length / itemsPerPage);

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
            <div style={summaryItemStyle}>
              Total: {formatNumber(totalProducts)}
            </div>
            <div style={summaryItemStyle}>
              Available: {formatNumber(totalAvailable)}
            </div>
            <div style={summaryItemStyle}>Sold: {formatNumber(totalSold)}</div>
            <div style={summaryItemStyle}>Revenue: {formatNumber(revenue)}</div>
            <Button
              variant="outlined"
              color="success"
              startIcon={<LibraryAddIcon />}
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
