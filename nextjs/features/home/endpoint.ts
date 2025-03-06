import { Session } from "next-auth";
import { Notifications } from "./types/notification";

const API_GET_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchNotifications = async (): Promise<Notifications | string> => {
  const response = await fetch(`${API_GET_URL}/api/v1/notifications`);
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch notifications";
  }
  return response.json();
};

export const fetchHomeFeed = async <T>(session: Session | null): Promise<T | string> => {
  const response = await fetch(`${API_GET_URL}/api/v1/home-feed`, {
    method: "POST",
    body: JSON.stringify({ session }),
  });

  if (!response.ok) {
    console.error(response);
    return "Failed to fetch home feed";
  }
  return response.json();
};

