import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Button, Table, TableContainer } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/reducers/categoryReducer";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import CategoryDialog from "../components/Category/CategoryDialog";
import NotificationSnackbar from "../components/NotificationSnackbar";
import PaginationControl from "../components/PaginationControl";
import { TableHeading, addButtonStyle } from "./styles";
import CategoryListTable from "../components/Category/CategoryListTable";

const Categories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    entities: categories = {},
    ids: categoryIds = [],
    status,
  } = useSelector((state: any) => state.category);

  const { entities: products = [] } = useSelector(
    (state: any) => state.product
  );

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [productCount, setProductCount] = useState(0); // Khai báo biến productCount

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleNotification = useCallback(
    (message: string, severity: "success" | "error") => {
      setSnackBarMessage(message);
      setSnackBarSeverity(severity);
      setSnackBarOpen(true);
    },
    []
  );

  const handleAddOrUpdateCategory = useCallback(
    async (category: any) => {
      try {
        const action = category.id ? updateCategory : addCategory;

        const newId = Date.now().toString();
        const categoryData = {
          ...category,
          id: category.id ? category.id : newId,
        };

        const resultAction = await dispatch(action(categoryData));

        if (action.fulfilled.match(resultAction)) {
          handleNotification(
            `Category ${category.id ? "updated" : "added"} successfully!`,
            "success"
          );

          setOpen(false);
          setSelectedCategory(null);
        } else {
          handleNotification(
            `Failed to ${category.id ? "update" : "add"} category.`,
            "error"
          );
        }
      } catch (error) {
        handleNotification(
          `Failed to ${category.id ? "update" : "add"} category.`,
          "error"
        );
      }
    },
    [dispatch, handleNotification]
  );

  const handleAddButtonClick = useCallback(() => {
    setSelectedCategory(null);
    setOpen(true);
  }, []);

  const handleEditCategory = useCallback((category: any) => {
    setSelectedCategory(category);
    setOpen(true);
  }, []);

  const handleDeleteCategory = useCallback(
    (id: string) => {
      const count = Object.values(products).filter((product: any) => {
        return String(product.categoryId) === String(id);
      }).length;

      setProductCount(count);
      setCategoryToDelete(id);
      setOpenConfirm(true);
    },
    [products]
  );

  const handleConfirmDelete = useCallback(() => {
    if (categoryToDelete !== null) {
      dispatch(deleteCategory(categoryToDelete))
        .unwrap()
        .then(() =>
          handleNotification("Category deleted successfully!", "success")
        )
        .catch(() => handleNotification("Failed to delete category.", "error"));
      setCategoryToDelete(null);
      setOpenConfirm(false);
    }
  }, [dispatch, categoryToDelete]);

  const handleCloseSnackBar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setSnackBarOpen(false);
    },
    []
  );

  const totalPages = Math.ceil(categoryIds.length / itemsPerPage);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return categoryIds.slice(start, start + itemsPerPage);
  }, [categoryIds, currentPage, itemsPerPage]);

  return (
    <>
      <TableContainer>
        <h1>Categories List</h1>
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
            onClick={handleAddButtonClick}
            sx={addButtonStyle}
          >
            Add
          </Button>
        </div>
        <Table sx={{ marginTop: "20px" }}>
          <CategoryListTable
            categories={categories}
            categoryIds={paginatedCategories}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
            TableHeading={TableHeading}
          />
        </Table>

        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </TableContainer>

      <CategoryDialog
        open={open}
        onClose={() => setOpen(false)}
        onAddCategory={handleAddOrUpdateCategory}
        category={selectedCategory}
        dialogTitle={selectedCategory ? "Edit Category" : "Add Category"}
      />

      <ConfirmDeleteDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`This category is being used by ${productCount} product(s). Are you sure you want to delete it?`}
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

export default memo(Categories);
