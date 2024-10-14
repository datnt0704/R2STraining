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
import AddIcon from "@mui/icons-material/Add";
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

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<string | null>(null);

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
    (colorName: string) => {
      const newId = (
        colorIds.length > 0 ? Math.max(...colorIds) + 1 : 1
      ).toString();
      const newColor = { id: newId, name: colorName };

      dispatch(addColor(newColor))
        .unwrap()
        .then(() => {
          setSnackBarMessage("Color added successfully!");
          setSnackBarSeverity("success");
          setSnackBarOpen(true);
        })
        .catch(() => {
          setSnackBarMessage("Failed to add color.");
          setSnackBarSeverity("error");
          setSnackBarOpen(true);
        });

      setOpen(false);
    },
    [dispatch, colorIds]
  );

  const handleDeleteColor = useCallback((id: string) => {
    setColorToDelete(id);
    setOpenConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (colorToDelete !== null) {
      dispatch(deleteColor(colorToDelete))
        .unwrap()
        .then(() => {
          setSnackBarMessage("Color deleted successfully!");
          setSnackBarSeverity("success");
          setSnackBarOpen(true);
        })
        .catch(() => {
          setSnackBarMessage("Failed to delete color.");
          setSnackBarSeverity("error");
          setSnackBarOpen(true);
        });

      setColorToDelete(null);
      setOpenConfirm(false);
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
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ alignSelf: "flex-start", marginTop: "5px" }} // Đảm bảo Button căn theo dòng đầu tiên
        >
          Add Color
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
        message="Are you sure you want to delete this color?"
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
