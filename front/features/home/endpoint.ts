import { Notifications, Posts } from "./types/notification";

const API_GET_URL = "http://localhost:3000";

export const fetchNotifications = async (): Promise<Notifications> => {
  const response = await fetch(`${API_GET_URL}/api/notifications`);
  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }
  return response.json();
};

export const fetchLatestPosts = async (): Promise<Posts> => {
  const response = await fetch(`${API_GET_URL}/api/posts?order=desc&limit=4`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

