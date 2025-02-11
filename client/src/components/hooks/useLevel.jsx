import { useQuery } from "@tanstack/react-query";
import { getAllLevels } from "@/api/levelAPI";
import _ from "lodash";

function useLevel() {
  const session = JSON.parse(localStorage.getItem("@school_session"));

  const {
    isPending,
    isFetching,
    refetch,
    data: levels,
  } = useQuery({
    queryKey: ["levels", session?.sessionId, session?.termId],
    queryFn: () => getAllLevels(session?.sessionId, session?.termId),
    enabled: !!session?.sessionId && !!session?.termId,
    initialData: {
      students: [],
      levelsOption: [],
      fees: [],
      levelSummary: {
        noOfLevels: 0,
        noOfSubjects: 0,
        noOfAssignedTeachers: 0,
      },
    },
  });

  return {
    levelLoading: isPending,
    levelIsFetching: isFetching,
    levelRefetch: refetch,
    ...levels,
  };
}

export default useLevel;
