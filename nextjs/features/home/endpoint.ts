import { Session } from "next-auth";
import { Notification } from "@/features/notifications/type/index";
import { Tag } from "./types/index";

const API_GET_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchNotifications = async (): Promise<Notification[] | string> => {
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
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    console.error(response);
    return "Failed to fetch home feed";
  }
  return response.json();
};

export const fetchPopularTagListForHome = async (): Promise<Tag[] | string> => {
  const response = await fetch(
    `${API_GET_URL}/api/v1/tags/popular?limit=6&isFeatchedPostImage=true`,
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    console.error(response);
    return "Failed to fetch popular posts";
  }
  const data = await response.json();
  return data;
};

