import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface ColorDialogProps {
  open: boolean;
  onClose: () => void;
  onAddColor: (color: string) => void;
}

const ColorDialog: React.FC<ColorDialogProps> = ({
  open,
  onClose,
  onAddColor,
}) => {
  const [newColor, setNewColor] = useState("");

  const handleAddColor = () => {
    if (newColor.trim()) {
      onAddColor(newColor.trim());
      setNewColor("");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Color</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Color Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddColor} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorDialog;
