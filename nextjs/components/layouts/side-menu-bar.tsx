import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import styles from "@/components/styles/side-menu-bar.module.scss";

// propsのインターフェース名も変更
interface SideMenuBarProps {
  open: boolean;
  menuItems: {
    name: string;
    path: string;
    icon: React.ReactNode;
  }[];
}

export function SideMenuBar({ open, menuItems }: SideMenuBarProps) {
  return (
    <Drawer
      sx={{
        width:200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      className={styles.sideMenuBarContainer}
    >
      <Toolbar/>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <Link href={item.path} className={styles.sideMenuBarLink}>
                  {item.icon}
                  <ListItemText primary={item.name} sx={{ fontSize: '0.8rem' }} slotProps={{ primary: { sx: { fontSize: '0.9rem', fontWeight: 'bold' } } }}/>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}