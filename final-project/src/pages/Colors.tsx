import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColor,
  addColor,
  deleteColor,
} from "../store/reducers/colorReducer";
import { AppDispatch } from "../store";
import { Button, Chip, Box } from "@mui/material";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ColorDialog from "../components/ColorDialog";
import NotificationSnackbar from "../components/NotificationSnackbar";
import { colorChipStyle, colorContainerStyle, colorListStyle } from "./styles";

const Colors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: colors = {},
    ids: colorIds = [],
    status,
  } = useSelector((state: any) => state.color);

  const { entities: products = [] } = useSelector(
    (state: any) => state.product
  );

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<string | null>(null);
  const [productCount, setProductCount] = useState(0);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColor());
    }
  }, [status, dispatch]);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleCloseConfirm = useCallback(() => setOpenConfirm(false), []);

  const handleAddColor = useCallback(
    async (colorName: string) => {
      try {
        const newId = Date.now().toString();
        const newColor = { id: newId, name: colorName };

        await dispatch(addColor(newColor)).unwrap();

        setSnackBarMessage("Color added successfully!");
        setSnackBarSeverity("success");
      } catch (error) {
        console.error("Error adding color:", error);
        setSnackBarMessage("Failed to add color.");
        setSnackBarSeverity("error");
      } finally {
        setSnackBarOpen(true);
        setOpen(false);
      }
    },
    [dispatch]
  );

  const handleDeleteColor = useCallback(
    (id: string) => {
      const count = Object.values(products).filter((product: any) => {
        return String(product.colorIds) === String(id);
      }).length;

      setProductCount(count);
      setColorToDelete(id);
      setOpenConfirm(true);
    },
    [products]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (colorToDelete !== null) {
      try {
        await dispatch(deleteColor(colorToDelete)).unwrap();
        setSnackBarMessage("Color deleted successfully!");
        setSnackBarSeverity("success");
      } catch (error) {
        setSnackBarMessage("Failed to delete color.");
        setSnackBarSeverity("error");
      } finally {
        setSnackBarOpen(true);
        setColorToDelete(null);
        setOpenConfirm(false);
      }
    }
  }, [colorToDelete, dispatch]);

  const handleCloseSnackBar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setSnackBarOpen(false);
    },
    []
  );

  const colorChips = useMemo(
    () =>
      colorIds.map((id: string) => (
        <Chip
          key={id}
          label={colors[id].name}
          onDelete={() => handleDeleteColor(id)}
          sx={colorChipStyle}
        />
      )),
    [colorIds, colors, handleDeleteColor]
  );

  return (
    <div style={{ width: "100vw", padding: "20px" }}>
      <h1>Color List</h1>

      <Box sx={colorContainerStyle}>
        <Box sx={colorListStyle}>{colorChips}</Box>

        <Button
          variant="outlined"
          color="success"
          startIcon={<LibraryAddIcon />}
          onClick={handleOpen}
          sx={{ alignSelf: "flex-start", marginTop: "5px" }}
        >
          Add
        </Button>
      </Box>

      <ColorDialog
        open={open}
        onClose={handleClose}
        onAddColor={handleAddColor}
      />

      <ConfirmDeleteDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Delete Color"
        message={`This color is being used by ${productCount} product(s). Are you sure you want to delete it?`}
      />

      <NotificationSnackbar
        open={snackBarOpen}
        message={snackBarMessage}
        severity={snackBarSeverity}
        onClose={handleCloseSnackBar}
      />
    </div>
  );
};

export default memo(Colors);
