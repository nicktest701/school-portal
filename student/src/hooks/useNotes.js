import { deleteNote, getAllNotes, postNote, putNote } from "@/api/noteAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "@/context/AlertProvider";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });
};

export const useCreateNote = () => {
  const { openAlert } = useAlert();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ...data }) => {
      postNote(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      openAlert("success", "Note Created");
    },
    onError: (error) => {
  
      openAlert("error", "An unknown error has occurred!");
    },
  });
};

export const useUpdateNote = () => {
  const { openAlert } = useAlert();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => putNote(id, data),
    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["notes"], (oldNotes) =>
        oldNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        )
      );
      openAlert("success", "Note Updated");
    },
    onError: (error) => {
      openAlert("error", error);
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const { openAlert } = useAlert();

  return useMutation({
    mutationFn: (id) => deleteNote(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["notes"], (oldNotes) =>
        oldNotes.filter((note) => note._id !== deletedId)
      );
      openAlert("success", "Note Removed");
    },
    onError: (error) => {
      openAlert("error", error);
    },
  });
};
