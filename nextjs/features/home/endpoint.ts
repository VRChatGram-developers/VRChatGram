import { Session } from "next-auth";
import { Notifications } from "./types/notification";
import prisma from "@/prisma/cleint";

const API_GET_URL = "http://localhost:3000";

export const fetchNotifications = async (): Promise<Notifications> => {
  console.log(`prisma`);
  console.log(prisma);

  const response = await fetch(`${API_GET_URL}/api/v1/notifications`);
  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }
  return response.json();
};

export const fetchHomeFeed = async <T>(session: Session | null): Promise<T> => {
  const response = await fetch(`${API_GET_URL}/api/v1/home-feed`, {
    method: "POST",
    body: JSON.stringify({ session }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

