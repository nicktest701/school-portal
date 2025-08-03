
import api from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation({
    mutationFn: async ({ studentId, password }) => {
      const res = await api.post("/student-auth/login", { studentId, password });
      return res.data;
    },
  });

export const useRequestReset = () =>
  useMutation({
    mutationFn: async ({ studentId }) => {
      const res = await api.post("/student-auth/reset-password-request", { studentId });
      return res.data;
    },
  });

export const useConfirmCode = () =>
  useMutation({
    mutationFn: async ({ studentId, code }) => {
      const res = await api.post("/student-auth/confirm-reset-code", { studentId, code });
      return res.data;
    },
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: async ({ studentId, newPassword }) => {
      const res = await api.post("/student-auth/reset-password", {
        studentId,
        newPassword,
      });
      return res.data;
    },
  });
