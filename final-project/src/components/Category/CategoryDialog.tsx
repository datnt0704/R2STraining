import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { validateName } from "../../utils/validation";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (category: any) => void;
  category?: any;
  dialogTitle: string;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  onClose,
  onAddCategory,
  category,
  dialogTitle,
}) => {
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setNewCategory({ name: category?.name || "" });
      setError(null);
    }
  }, [open, category]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewCategory({ name: value });

      if (error) {
        const validationError = validateName(value, "category");
        if (!validationError) {
          setError(null);
        }
      }
    },
    [error]
  );

  const handleSubmit = useCallback(() => {
    const validationError = validateName(newCategory.name, "category");
    if (validationError) {
      setError(validationError);
      return;
    }

    onAddCategory({ ...newCategory, id: category?.id || undefined });
    onClose();
  }, [newCategory, category, onAddCategory, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newCategory.name}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{category ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(CategoryDialog);
