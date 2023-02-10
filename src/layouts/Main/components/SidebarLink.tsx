import { ListItem, ListItemButton, ListItemIcon, ListItemIconProps, ListItemText, SvgIconProps } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
type SidebarLinkProps = {
  text: string;
  open: boolean;
  to: string;
  icon: React.ReactNode;
};

const SidebarLink = ({ text = "", open = false, to = "/", icon }: SidebarLinkProps) => {

  return (
    <ListItem component={Link} to={to} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarLink;
