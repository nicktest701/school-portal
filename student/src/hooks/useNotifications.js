import {
  deleteNotification,
  markAllNotificationAsRead,
  markNotificationAsRead,
  deleteNotifications,
  getAllNotifications,
} from "@/api/notificationAPI";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthProvider";
import { useAlert } from "@/context/AlertProvider";

export const useNotifications = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["notifications", user?._id],
    queryFn: getAllNotifications,
    initialData: [],
    enabled: !!user?._id,
  });
};

export const useMarkAsRead = () => {
  const { openAlert } = useAlert();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      // openAlert("success","Marked As Read");
    },
    onError: () => {
      openAlert("error", "An unknown error has occurred!");
    },
  });
};
export const useMarkAll = () => {
  const { openAlert } = useAlert();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => markAllNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      openAlert("success", "Marked As Read");
    },
    onError: () => {
      openAlert("error", "An unknown error has occurred!");
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { openAlert } = useAlert();

  return useMutation({
    mutationFn: (id) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      // openAlert("success","Notification Removed");
    },
    onError: () => {
      openAlert("error", "An unknown error has occurred!");
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  const { openAlert } = useAlert();

  return useMutation({
    mutationFn: (id) => deleteNotifications(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      openAlert("success", "Notifications Removed");
    },
    onError: () => {
      openAlert("error", "An unknown error has occurred!");
    },
  });
};
