import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Settings, TrackingList } from "..";
import { Route, Switch as RouteSwitch } from "react-router-dom";

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
        <Route component={Settings} path="/settings" />
        <Route component={TrackingList} exact path="/tracker" />
      </RouteSwitch>
    </Box>
  );
}
