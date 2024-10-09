import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/reducers/categoryReducer";
import CategoryDialog from "../components/CategoryDialog";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: categories = {},
    ids: categoryIds = [],
    status,
  } = useSelector((state: any) => state.category);

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleOpen = () => {
    setSelectedCategory(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleAddCategory = (category: any) => {
    if (category.id) {
      dispatch(updateCategory(category));
    } else {
      dispatch(addCategory(category));
    }
    setOpen(false);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    setCategoryToDelete(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete));
      setCategoryToDelete(null);
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 16px",
          }}
        >
          <Button
            variant="outlined"
            color="success"
            startIcon={<LibraryAddIcon />}
            onClick={handleOpen}
          >
            Add
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{categories[id].name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    disableElevation
                    color="primary"
                    startIcon={<CreateIcon />}
                    sx={{ marginRight: "5px" }}
                    onClick={() => handleEditCategory(categories[id])}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    disableElevation
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteCategory(id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CategoryDialog
        open={open}
        onClose={handleClose}
        onAddCategory={handleAddCategory}
        category={selectedCategory}
      />

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this category?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Categories;
