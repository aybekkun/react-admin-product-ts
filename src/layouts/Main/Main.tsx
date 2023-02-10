import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import SidebarLink from "./components/SidebarLink";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import { CHARTS, COURSES, INSTRUMENTS, LEADS, MAIN, ORDERS, SETTINGS, SUPPORT } from "../../helpers/constants/route";
import { Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import SelectLang from "./components/SelectLang";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Main() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 10 }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              flexGrow: 1,
            }}
          >
            <Box>
              <Typography variant="h6" noWrap component="div">
                Sales Up
              </Typography>
            </Box>
            <Box>
              <SelectLang />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer sx={{ zIndex: 5 }} variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <SidebarLink text={t("main")} to={MAIN} open={open} icon={<HomeOutlinedIcon />} />
        </List>
        <Divider />
        <List>
          <SidebarLink text={t("leads")} to={LEADS} open={open} icon={<PermContactCalendarIcon />} />
          <SidebarLink text={t("orders")} to={ORDERS} open={open} icon={<AddShoppingCartIcon />} />
          <SidebarLink text={t("courses")} to={COURSES} open={open} icon={<BookOutlinedIcon />} />
        </List>
        <Divider />
        <List>
          <SidebarLink text={t("instruments")} to={INSTRUMENTS} open={open} icon={<HandymanOutlinedIcon />} />
          <SidebarLink text={t("settings")} to={SETTINGS} open={open} icon={<TuneOutlinedIcon />} />
          <SidebarLink text={t("charts")} to={CHARTS} open={open} icon={<InsertChartOutlinedTwoToneIcon />} />
        </List>
        <Divider />
        <List>
          <SidebarLink text={t("support")} to={SUPPORT} open={open} icon={<QuestionMarkOutlinedIcon />} />
        </List>
      </Drawer>
      <Box bgcolor={"#F5F5F5"} component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
        <DrawerHeader />
        <Box sx={{ maxWidth: "1600px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
