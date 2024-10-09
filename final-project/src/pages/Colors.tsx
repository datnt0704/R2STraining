import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColor,
  addColor,
  deleteColor,
} from "../store/reducers/colorReducer";
import { AppDispatch } from "../store";
import {
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ColorDialog from "../components/ColorDialog";
import AddIcon from "@mui/icons-material/Add";

const Colors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: colors = {},
    ids: colorIds = [],
    status,
  } = useSelector((state: any) => state.color);

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColor());
    }
  }, [status, dispatch]);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleAddColor = (colorName: string) => {
    const newId = (
      colorIds.length > 0 ? Math.max(...colorIds) + 1 : 1
    ).toString();
    const newColor = {
      id: newId,
      name: colorName,
    };
    dispatch(addColor(newColor));
    setOpen(false);
  };

  const handleDeleteColor = (id: string) => {
    setColorToDelete(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (colorToDelete !== null) {
      dispatch(deleteColor(colorToDelete));
      setColorToDelete(null);
      setOpenConfirm(false);
    }
  };

  const handleCloseConfirm = () => setOpenConfirm(false);

  return (
    <div style={{ width: "100vw" }}>
      <h1>Color List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {colorIds.map((id: string) => (
          <Chip
            key={id}
            label={colors[id].name}
            onDelete={() => handleDeleteColor(id)}
            style={{ margin: "5px", backgroundColor: "#f0f0f0" }}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          style={{ marginLeft: "10px" }}
        >
          Add Color
        </Button>
      </div>

      <ColorDialog
        open={open}
        onClose={handleCloseDialog}
        onAddColor={handleAddColor}
      />

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Delete Color</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this color?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Colors;
