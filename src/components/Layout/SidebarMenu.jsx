import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MENU_ITEMS } from "../../constants/menuItems";
import { Link, useNavigate } from "react-router-dom";

export default function SidebarMenu(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography onClick={props.onTitleClick} variant="h6" sx={{ my: 2 }}>
        HRM
      </Typography>
      <Divider />
      <List>
        {MENU_ITEMS.map((item) => {
          return (
            <Link
              style={{ textDecoration: "none", color: "unset" }}
              to={item.path}
            >
              <ListItem key={item.label} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );
}
