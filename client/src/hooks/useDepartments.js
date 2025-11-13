import { use } from "react";
import {
  deleteDepartment,
  getAllDepartments,
  getDepartment,
  postDepartment,
  putDepartment,
} from "@/api/departmentAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { useAuth } from "./useAuth";

export const useDepartments = () => {
  const { user } = useAuth();

  const departments = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
    initialData: [],
    enabled: !!user?._id,
  });

  return {
    ...departments,
    data:
      departments.data === "Unauthorized Access.Please contact administrator"
        ? []
        : departments?.data,
  };
};

export const useDepartment = (id) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["departments", id],
    queryFn: () => getDepartment(id),
    initialData: () => {
      const departments = queryClient.getQueryData(["departments"]);
      return departments?.find((dept) => dept._id === id);
    },
    enabled: !!id,
  });
};

export const useCreateDepartment = () => {
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      schoolSessionDispatch(alertSuccess("Department Created"));
    },
    onError: (error) => {
      schoolSessionDispatch(alertError(error));
    },
  });
};

export const useUpdateDepartment = () => {
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => putDepartment(id, data),
    onSettled: () => {
      queryClient.invalidateQueries(["departments"]);
    },
    onSuccess: (updatedDepartment) => {
      queryClient.setQueryData(["departments"], (oldDepartments) =>
        oldDepartments.map((department) =>
          department._id === updatedDepartment._id
            ? updatedDepartment
            : department
        )
      );
      schoolSessionDispatch(alertSuccess("Department Updated"));
    },
    onError: (error) => {
      schoolSessionDispatch(alertError(error));
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = use(SchoolSessionContext);

  return useMutation({
    mutationFn: (id) => deleteDepartment(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["departments"], (oldDepartments) =>
        oldDepartments.filter((department) => department._id !== deletedId)
      );
      schoolSessionDispatch(alertSuccess("Department Removed"));
    },
    onError: (error) => {
      schoolSessionDispatch(alertError(error));
    },
  });
};
