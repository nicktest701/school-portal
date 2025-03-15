import { use } from 'react'
import { deleteNotification, markAllNotificationAsRead, markNotificationAsRead, deleteNotifications, getAllNotifications } from '@/api/notificationAPI';
import { useMutation, useQueryClient,useQuery } from '@tanstack/react-query';
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from '@/context/actions/globalAlertActions';


export const useNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: getAllNotifications,
    });
};

export const useMarkAsRead = () => {
    const { schoolSessionDispatch } = use(SchoolSessionContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => markNotificationAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
            // schoolSessionDispatch(alertSuccess("Marked As Read"));
        },
        onError: () => {
            schoolSessionDispatch(alertError('An unknown error has occurred!'));
        },
    });
};
export const useMarkAll = () => {
    const { schoolSessionDispatch } = use(SchoolSessionContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => markAllNotificationAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
            schoolSessionDispatch(alertSuccess("Marked As Read"));
        },
        onError: () => {
            schoolSessionDispatch(alertError('An unknown error has occurred!'));
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    const { schoolSessionDispatch } = use(SchoolSessionContext);

    return useMutation({
        mutationFn: (id) => deleteNotification(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
            // schoolSessionDispatch(alertSuccess("Notification Removed"));
        }, onError: () => {
            schoolSessionDispatch(alertError('An unknown error has occurred!'));
        },
    });
};

export const useDeleteAllNotifications = () => {
    const queryClient = useQueryClient();
    const { schoolSessionDispatch } = use(SchoolSessionContext);

    return useMutation({
        mutationFn: (id) => deleteNotifications(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
            schoolSessionDispatch(alertSuccess("Notifications Removed"));
        }, onError: () => {
            schoolSessionDispatch(alertError('An unknown error has occurred!'));
        },
    });
};