import { useQuery } from "@tanstack/react-query";
import { getAllLevels } from "@/api/levelAPI";
import _ from "lodash";

function useLevel() {
  const session = JSON.parse(localStorage.getItem("@school_session"));

  const {
    isPending,
    isLoading,
    isFetching,
    refetch,
    data: levels,
  } = useQuery({
    queryKey: ["levels", session?.sessionId, session?.termId],
    queryFn: () => getAllLevels(session?.sessionId, session?.termId),
    enabled: !!session?.sessionId && !!session?.termId,
    initialData: {
      students: [],
      subjects: 0,
      levelsOption: [],
      fees: [],
      levelSummary: {
        noOfLevels: 0,
        noOfSubjects: 0,
        noOfAssignedTeachers: 0,
      },
    },
    // refetchOnMount: false,
  });

  sessionStorage.setItem(
    "levels",
    JSON.stringify(
      _.map(levels.levelsOption, (level) => {
        return { _id: level?._id, type: level?.type || "" };
      })
    )
  );

  return {
    levelLoading: isPending || isLoading,
    levelIsFetching: isFetching,
    levelRefetch: refetch,
    ...levels,
  };
}

export default useLevel;
