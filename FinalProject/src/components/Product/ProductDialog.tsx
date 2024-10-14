import React, { useEffect, useState, useMemo, memo } from "react";
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
  SelectChangeEvent,
} from "@mui/material";
import { useSelector } from "react-redux";
import { validateProductForm } from "../../utils/validation";

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
    available: "",
    sold: "",
    categoryId: "",
    colorIds: [] as string[],
    price: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { entities: categories = {} } = useSelector(
    (state: any) => state.category
  );
  const { entities: colors = {} } = useSelector((state: any) => state.color);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id ?? null,
        name: product.name ?? "",
        available: product.available ?? "",
        sold: product.sold ?? "",
        categoryId: product.categoryId?.toString() ?? "",
        colorIds: product.colorIds?.map(String) ?? [],
        price: product.price ?? "",
      });
      setErrors({});
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: event.target.value,
    }));
    setErrors((prev) => ({ ...prev, categoryId: "" }));
  };

  const handleColorToggle = (colorId: string) => {
    setFormData((prev) => {
      const updatedColors = prev.colorIds.includes(colorId)
        ? prev.colorIds.filter((id) => id !== colorId)
        : [...prev.colorIds, colorId];
      setErrors((prevErrors) => ({ ...prevErrors, colorIds: "" }));
      return { ...prev, colorIds: updatedColors };
    });
  };

  const handleSubmit = () => {
    const validationErrors = validateProductForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      categoryId: parseInt(formData.categoryId, 10),
      colorIds: formData.colorIds.map(Number),
    });
    onClose();
  };

  const renderedCategories = useMemo(() => {
    return Object.values(categories).map((category: any) => (
      <MenuItem key={category.id} value={category.id.toString()}>
        {category.name}
      </MenuItem>
    ));
  }, [categories]);

  const renderedColors = useMemo(() => {
    return Object.values(colors).map((color: any) => (
      <Button
        key={color.id}
        variant={
          formData.colorIds.includes(color.id.toString())
            ? "contained"
            : "outlined"
        }
        onClick={() => handleColorToggle(color.id.toString())}
        sx={{
          margin: "4px",
          backgroundColor: formData.colorIds.includes(color.id.toString())
            ? color.hex
            : "transparent",
          color: formData.colorIds.includes(color.id.toString())
            ? "#fff"
            : "inherit",
        }}
      >
        {color.name}
      </Button>
    ));
  }, [colors, formData.colorIds]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Available"
          name="available"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.available}
          onChange={handleChange}
          error={!!errors.available}
          helperText={errors.available}
        />
        <TextField
          margin="dense"
          label="Sold"
          name="sold"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.sold}
          onChange={handleChange}
          error={!!errors.sold}
          helperText={errors.sold}
        />
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
        />
        <FormControl fullWidth margin="dense" error={!!errors.categoryId}>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.categoryId}
            onChange={handleCategoryChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120,
                  width: 250,
                  overflowY: "auto",
                },
              },
            }}
          >
            {renderedCategories}
          </Select>
          <Typography color="error" variant="caption">
            {errors.categoryId}
          </Typography>
        </FormControl>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Colors:
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
          gap={1}
          sx={{ marginTop: 1 }}
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

export default memo(ProductDialog);
