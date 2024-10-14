import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { validateName } from "./../utils/validation"; // Import hàm validate

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
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewColor(value);

    // Nếu có lỗi trước đó và người dùng đang nhập, xóa lỗi
    if (error) {
      const validationError = validateName(value, "color");
      if (!validationError) {
        setError(null);
      }
    }
  };

  const handleAddColor = () => {
    const validationError = validateName(newColor, "color");
    if (validationError) {
      setError(validationError); // Hiển thị lỗi nếu có
      return;
    }

    onAddColor(newColor.trim());
    setNewColor("");
    setError(null); // Xóa lỗi nếu thành công
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
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
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
