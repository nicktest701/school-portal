import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLevel } from "@/api/levelAPI";

function useLevelById(id) {
  const queryClient = useQueryClient();

  const levels = useQuery({
    queryKey: ["level", id],
    queryFn: () => getLevel(id),
    enabled: !!id,
    initialData: queryClient
      .getQueryData(["levels"])
      ?.find((level) => level?._id === id),
  });

  const levelData = useMemo(() => {
    if (levels.data) {
      return {
        students: levels?.data?.students,
        gradeSystem: levels?.data?.grades,
        subjects: levels?.data?.subjects,
        rollNumber: levels?.data?.students?.length,
        levelName: `${levels?.data?.level?.name}${levels?.data?.level?.type}`,
        teacher: {
          _id: levels?.data?.teacher?._id,
          fullName: levels?.data?.teacher?.fullname,
          profile: levels?.data?.teacher?.profile,
        },
      };
    } else {
      return {
        students: [],
        gradeSystem: [],
        subjects: [],
        rollNumber: 0,
      };
    }
  }, [levels.data]);

  return {
    levelLoading: levels.isPending || levels.isLoading,
    refetch: levels.refetch,
    levelError: levels?.error,
    ...levelData,
  };
}

export default useLevelById;
