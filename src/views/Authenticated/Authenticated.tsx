import {
  AppBar,
  Box,
  Button,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Settings } from "..";
import { Route, Switch as RouteSwitch } from "react-router-dom";
import SingleClient from "./Management/SingleClient/SingleClient";

export function Authenticated(): JSX.Element {
  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon/> */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <RouteSwitch>
        <Route component={Settings} path="/settings" exact />
        <Route component={SingleClient} path="managment/:id" exact />
      </RouteSwitch>
    </Box>
  );
}
