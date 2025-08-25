"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { SideMenuBar } from "./side-menu-bar";
import { GoHome } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { IoMdAlbums } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CiMedal } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { Header } from "./header";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${200}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header open={open} drawerWidth={drawerWidth} onDrawerToggle={toggleDrawer} />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <SideMenuBar
          open={open}
          menuItems={[
            { name: "ホーム", path: "/", icon: <GoHome /> },
            { name: "メッセージ", path: "/", icon: <IoChatbubblesOutline /> },
            { name: "フレンド", path: "/", icon: <LiaUserFriendsSolid /> },
            { name: "コンテスト", path: "/", icon: <CiMedal /> },
            { name: "アルバム", path: "/", icon: <IoMdAlbums /> },
            { name: "ランキング", path: "/", icon: <CiTrophy /> },
            { name: "イベント", path: "/", icon: <IoCalendarNumberOutline /> },
          ]}
        />
      </Drawer>
      <Main open={open}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
}
