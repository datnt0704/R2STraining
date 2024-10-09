import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void;
  product?: any;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onClose,
  onSubmit,
  product,
}) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    available: 0,
    sold: 0,
    categoryId: 0,
    colorIds: [] as number[],
    price: 0,
  });

  const { entities: categories = {} } = useSelector(
    (state: any) => state.category
  );
  const { entities: colors = {} } = useSelector((state: any) => state.color);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || null,
        name: product.name || "",
        available: product.available || 0,
        sold: product.sold || 0,
        categoryId: product.categoryId || 0,
        colorIds: product.colorIds || [],
        price: product.price || 0,
      });
    } else {
      // Nếu thêm mới thì reset form
      setFormData({
        id: null,
        name: "",
        available: 0,
        sold: 0,
        categoryId: 0,
        colorIds: [],
        price: 0,
      });
    }
  }, [product]);

  const handleColorToggle = useCallback((colorId: number) => {
    setFormData((prev) => {
      const updatedColors = prev.colorIds.includes(colorId)
        ? prev.colorIds.filter((id) => id !== colorId)
        : [...prev.colorIds, colorId];
      return { ...prev, colorIds: updatedColors };
    });
  }, []);

  const handleSubmit = useCallback(() => {
    console.log("Submitting product:", formData);
    onSubmit(formData);
    onClose();
  }, [formData, onSubmit, onClose]);

  const renderedCategories = useMemo(() => {
    return Object.values(categories).map((category: any) => (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    ));
  }, [categories]);

  // Hiển thị danh sách colors
  const renderedColors = useMemo(() => {
    return Object.values(colors).map((color: any) => (
      <Button
        key={color.id}
        variant={
          formData.colorIds.includes(color.id) ? "contained" : "outlined"
        }
        onClick={() => handleColorToggle(color.id)}
        sx={{
          margin: "4px",
          backgroundColor: formData.colorIds.includes(color.id)
            ? color.hex
            : "transparent",
          color: formData.colorIds.includes(color.id) ? "#fff" : "inherit",
        }}
      >
        {color.name}
      </Button>
    ));
  }, [colors, formData.colorIds, handleColorToggle]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />

        <TextField
          margin="dense"
          label="Available"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.available}
          onChange={(e) =>
            setFormData({ ...formData, available: parseInt(e.target.value) })
          }
          sx={{ marginBottom: "10px" }}
        />

        <TextField
          margin="dense"
          label="Sold"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.sold}
          onChange={(e) =>
            setFormData({ ...formData, sold: parseInt(e.target.value) })
          }
          sx={{ marginBottom: "10px" }}
        />

        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseInt(e.target.value) })
          }
          sx={{ marginBottom: "10px" }}
        />

        <FormControl fullWidth margin="dense" sx={{ marginBottom: "10px" }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoryId: parseInt(e.target.value as string),
              })
            }
          >
            {renderedCategories}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
          Colors:
        </Typography>
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          sx={{ marginBottom: "10px" }}
        >
          {renderedColors}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {product ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
