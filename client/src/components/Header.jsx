import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Upload CSV", path: "/upload", icon: <UploadFileIcon /> },
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <DashboardIcon sx={{ fontSize: 30 }} />
              <Typography variant="h6" fontWeight={700} letterSpacing={0.5}>
                NGO Impact Tracker
              </Typography>
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    ...navBtnStyle,
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255,255,255,0.2)"
                        : "transparent",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ color: "#fff", display: { xs: "flex", md: "none" } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.path}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

const navBtnStyle = {
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 2,
  px: 2,
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
};

export default Header;
