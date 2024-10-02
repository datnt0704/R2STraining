import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Product {
  id: number;
  name: string;
  available: number;
  sold: number;
  category: string;
  colors: string;
  price: number;
}

const productData: Product[] = [
  {
    id: 1,
    name: "New name 2",
    available: 5,
    sold: 0,
    category: "cloth",
    colors: "Blue",
    price: 459.0,
  },
  {
    id: 2,
    name: "Backpack Elsassss",
    available: 1,
    sold: 0,
    category: "cloth",
    colors: "Blue",
    price: 370.0,
  },
  {
    id: 3,
    name: "2343",
    available: 1,
    sold: 0,
    category: "Accessory",
    colors: "Blue",
    price: 50000.324,
  },
  {
    id: 4,
    name: "3243",
    available: 1324,
    sold: 0,
    category: "Accessory",
    colors: "Blue",
    price: 50000,
  },
  {
    id: 5,
    name: "Test 2222",
    available: 10,
    sold: 0,
    category: "Accessory",
    colors: "Blue",
    price: 55.0,
  },
];

const Products = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Sold</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Colors</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.available}</TableCell>
              <TableCell>{product.sold}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.colors}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Products;
