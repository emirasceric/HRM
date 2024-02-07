import { useState } from "react";
import MaterialBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import SidebarMenu from "./SidebarMenu";
import { Link, useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../../constants/menuItems";

export default function AppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MaterialBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HRM
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {MENU_ITEMS.map((item) => (
              <Link
                style={{ textDecoration: "none" }}
                key={item.label}
                to={item.path}
              >
                <Button sx={{ color: "#fff" }}>{item.label}</Button>
              </Link>
            ))}
          </Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </MaterialBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <SidebarMenu onTitleClick={handleDrawerToggle} />
        </Drawer>
      </Box>
    </Box>
  );
}
