import {use} from 'react'
import { deleteNote, getAllNotes, postNote, putNote } from '@/api/noteAPI';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from '@/context/actions/globalAlertActions';


export const useNotes = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: getAllNotes,
    });
};

export const useCreateNote = () => {
    const { schoolSessionDispatch } = use(SchoolSessionContext);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: postNote,
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])          
            schoolSessionDispatch(alertSuccess("Note Created"));
        },
        onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },

    });
};

export const useUpdateNote = () => {
    const { schoolSessionDispatch } = use(SchoolSessionContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }) => putNote(id, data),
        onSuccess: (updatedNote) => {
            queryClient.setQueryData(['notes'], (oldNotes) =>
                oldNotes.map(note =>
                    note._id === updatedNote._id ? updatedNote : note
                )
            );
            schoolSessionDispatch(alertSuccess("Note Updated"));
        },
        onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    const { schoolSessionDispatch } = use(SchoolSessionContext);

    return useMutation({
        mutationFn: (id) => deleteNote(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(['notes'], (oldNotes) =>
                oldNotes.filter(note => note._id !== deletedId)
            );
            schoolSessionDispatch(alertSuccess("Note Removed"));
        }, onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
    });
};