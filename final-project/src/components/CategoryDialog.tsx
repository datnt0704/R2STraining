import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (category: any) => void;
  category?: any;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  onClose,
  onAddCategory,
  category,
}) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  useEffect(() => {
    setNewCategory({
      name: category?.name || "",
    });
  }, [category]);

  const handleSubmit = () => {
    if (category?.id) {
      onAddCategory({ ...newCategory, id: category.id });
    } else {
      onAddCategory(newCategory);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          type="text"
          fullWidth
          variant="outlined"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
