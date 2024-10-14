import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { validateName } from "../../utils/validation"; // Import hàm validate

interface CategoryDialogProps {
  open: boolean; // Nhận prop open để mở/đóng dialog
  onClose: () => void;
  onAddCategory: (category: any) => void;
  category?: any; // Nhận category khi chỉnh sửa
  dialogTitle: string; // Tiêu đề động
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

  // Tối ưu useEffect: Chỉ chạy khi open hoặc category thay đổi
  useEffect(() => {
    if (open) {
      setNewCategory({ name: category?.name || "" });
      setError(null);
    }
  }, [open, category]);

  // Sử dụng useCallback để tránh re-create hàm không cần thiết
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

    // Thêm hoặc cập nhật category
    onAddCategory({ ...newCategory, id: category?.id || undefined });
    onClose(); // Đóng dialog sau khi thêm hoặc cập nhật
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

// Sử dụng React.memo để ngăn re-render không cần thiết
export default memo(CategoryDialog);
