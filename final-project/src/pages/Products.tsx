import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index";
import { fetchProduct } from "../store/reducers/productReducer";
import { fetchColor } from "../store/reducers/colorReducer";
import { fetchCategories } from "../store/reducers/categoryReducer";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductDialog from "../components/ProductDialog";
import { styled } from "@mui/material/styles";
import { TableHeading } from "./styles";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/reducers/productReducer";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "auto",
  height: "40px",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#f6f6f6",
  borderRadius: "5px",
  fontWeight: "600",
}));

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

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
        (acc: any, id: any) => acc + (products[id]?.available || 0),
        0
      ),
    [productIds, products]
  );
  const totalSold = useMemo(
    () =>
      productIds.reduce(
        (acc: any, id: any) => acc + (products[id]?.sold || 0),
        0
      ),
    [productIds, products]
  );
  const revenue = useMemo(
    () =>
      productIds.reduce(
        (acc: any, id: any) =>
          acc + (products[id]?.price * products[id]?.sold || 0),
        0
      ),
    [productIds, products]
  );

  const handleSubmit = (submittedProduct: any) => {
    if (submittedProduct.id) {
      dispatch(updateProduct(submittedProduct));
    } else {
      dispatch(addProduct(submittedProduct));
    }
    setOpen(false);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      dispatch(deleteProduct(productToDelete))
        .unwrap()
        .then(() => {
          console.log(`Deleted product with ID: ${productToDelete}`);
          setProductToDelete(null);
          setOpenConfirm(false);
        })
        .catch((error) => {
          console.error("Failed to delete product:", error);
          setOpenConfirm(false);
        });
    }
  };

  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <TableContainer>
        <Box sx={{ marginBottom: "20px", display: "flex" }}>
          <Stack direction="row" spacing={2}>
            <DemoPaper variant="outlined">Total: {totalProducts}</DemoPaper>
            <DemoPaper variant="outlined">
              Available: {totalAvailable}
            </DemoPaper>
            <DemoPaper variant="outlined">Sold: {totalSold}</DemoPaper>
            <DemoPaper variant="outlined">Revenue: {revenue}</DemoPaper>
          </Stack>
          <Box>
            <Button
              variant="outlined"
              disableElevation
              color="success"
              type="submit"
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
              sx={{ height: 60, marginLeft: "10px" }}
            >
              ADD
            </Button>
          </Box>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={TableHeading}>No</TableCell>
              <TableCell style={TableHeading}>Name</TableCell>
              <TableCell style={TableHeading}>Available</TableCell>
              <TableCell style={TableHeading}>Sold</TableCell>
              <TableCell style={TableHeading}>Category</TableCell>
              <TableCell style={TableHeading}>Colors</TableCell>
              <TableCell style={TableHeading}>Price</TableCell>
              <TableCell style={TableHeading}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{products[id].name}</TableCell>
                <TableCell align="center">{products[id].available}</TableCell>
                <TableCell align="center">{products[id].sold}</TableCell>
                <TableCell align="center">
                  {categories[products[id].categoryId]?.name || "Unknown"}
                </TableCell>
                <TableCell>
                  {products[id].colorIds
                    ?.map((colorId: any) => colors[colorId]?.name)
                    .join(", ") || "No colors"}
                </TableCell>
                <TableCell>{products[id].price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CreateIcon />}
                    onClick={() => handleEditProduct(products[id])}
                    sx={{ marginRight: "10px", padding: "5px 10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteProduct(products[id].id)}
                    sx={{ padding: "5px 10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogs */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ProductDialog
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        product={selectedProduct}
      />
    </>
  );
};

export default Products;
