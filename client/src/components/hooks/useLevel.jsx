import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { getAllLevels } from "@/api/levelAPI";
import _ from "lodash";
import { UserContext } from "@/context/providers/UserProvider";
function useLevel() {
  const {
    userState: { session },
  } = useContext(UserContext);

  const {
    isPending,
    isFetching,
    refetch,
    data: levels,
  } = useQuery({
    queryKey: ["levels", session.sessionId, session.termId],
    queryFn: () => getAllLevels(session.sessionId, session.termId),
    enabled: !!session.sessionId && !!session?.termId,
    initialData: [],
  });

  const levelsD = useMemo(() => {
    if (levels?.length !== 0) {
      const modifiedLevels = levels?.map(
        ({ _id, level, students, subjects, teacher }) => {
          return {
            _id,
            level,
            type: `${level?.name}${level?.type}`,
            noOfStudents: students?.length,
            noOfSubjects: subjects?.length,
            teacher,
          };
        }
      );

      // NUMBER OF LEVELS
      const noOfLevels = levels.length;

      // NUMBER OF SUBJECTS
      const modifiedSubjects = _.flatMap(levels, "subjects");
      const noOfSubjects = _.isEmpty(modifiedSubjects)
        ? 0
        : _.uniq(modifiedSubjects).length;

      //NUMBER OF ASSIGNED TEACHERS
      const modifiedTeachers = _.filter(levels, "teacher");
      const noOfAssignedTeachers = _.isEmpty(modifiedTeachers)
        ? 0
        : modifiedTeachers.length;

      return {
        students: levels,
        levelsOption: modifiedLevels,
        levelSummary: {
          noOfLevels,
          noOfSubjects,
          noOfAssignedTeachers,
        },
      };
    } else {
      return {
        students: [],
        levelsOption: [],
        levelSummary: {
          noOfLevels: 0,
          noOfSubjects: 0,
          noOfAssignedTeachers: 0,
        },
      };
    }
  }, [levels?.data]);

  return {
    levelLoading: isPending,
    levelIsFetching: isFetching,
    levelRefetch: refetch,
    ...levelsD,
  };
}

export default useLevel;
