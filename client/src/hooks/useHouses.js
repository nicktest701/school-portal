import { use } from "react";
import {
  deleteHouse,
  getAllHouses,
  getHouse,
  postHouse,
  putHouse,
} from "@/api/houseAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";

export const useHouses = () => {
  return useQuery({
    queryKey: ["houses"],
    queryFn: getAllHouses,
  });
};

export const useHouse = (id) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["houses", id],
    queryFn: () => getHouse(id),
    initialData: () => {
      const houses = queryClient.getQueryData(["houses"]);
      return houses?.find((dept) => dept._id === id);
    },
    enabled: !!id,
  });
};

export const useCreateHouse = () => {
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postHouse,
    onSuccess: () => {
      queryClient.invalidateQueries(["houses"]);
      schoolSessionDispatch(alertSuccess("House Created"));
    },
    onError: (error) => {
      schoolSessionDispatch(alertError(error));
    },
  });
};

export const useUpdateHouse = () => {
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => putHouse(id, data),
    onSettled: () => {
      queryClient.invalidateQueries(["houses"]);
    },
    onSuccess: (updatedHouse) => {
      queryClient.setQueryData(["houses"], (oldHouses) =>
        oldHouses.map((house) =>
          house._id === updatedHouse._id ? updatedHouse : house
        )
      );
      schoolSessionDispatch(alertSuccess("House Updated"));
    },
    onError: (error) => {
      schoolSessionDispatch(alertError(error));
    },
  });
};

export const useDeleteHouse = () => {
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = use(SchoolSessionContext);

  return useMutation({
    mutationFn: (id) => deleteHouse(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["houses"], (oldHouses) =>
        oldHouses.filter((house) => house._id !== deletedId)
      );
      schoolSessionDispatch(alertSuccess("House Removed"));
    },
    onError: (error) => {
      schoolSessionDispatch(alertError(error));
    },
  });
};
