import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Outlet, useNavigate } from "react-router-dom";
import { drawerStyle } from "./styles";

const menuItems = [
  { text: "Products", route: "/products", icon: <ShoppingCartIcon /> },
  { text: "Categories", route: "/categories", icon: <CategoryIcon /> },
  { text: "Colors", route: "/colors", icon: <ColorLensIcon /> },
];

const Drawer = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div style={{ display: "flex" }}>
      <Box style={drawerStyle}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Outlet />
    </div>
  );
};

export default Drawer;
