export type NotificationType = "release" | "bug" | "important";

export type Notification = {
  id: number;
  title: string;
  content: string | null;
  notification_type: NotificationType;
  published_at: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};

export type Notifications = {
  notifications: Notification[];
};
