import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { getAllLevels } from '../../api/levelAPI';
import _ from 'lodash';
import { UserContext } from '../../context/providers/UserProvider';
function useLevel() {
  const {
    userState: { session },
  } = useContext(UserContext);

  const [students, setStudents] = useState([]);
  const [levelsOption, setLevelOptions] = useState([]);
  const [levelSummary, setLevelSummary] = useState({
    noOfLevels: 0,
    noOfSubjects: 0,
    noOfAssignedTeachers: 0,
  });

  const levels = useQuery({
    queryKey: ['levels', session.sessionId, session.termId],
    queryFn: () => getAllLevels(session.sessionId, session.termId),
    enabled: !!session.sessionId&& !!session?.termId,
    onSuccess: (levels) => {
      if (levels?.length !== 0) {
        setStudents(levels);
        const modifiedLevels = levels.map(
          ({ _id, level, students, subjects, teacher }) => {
            // console.log(students)
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

        setLevelOptions(modifiedLevels);

        // NUMBER OF LEVELS
        const noOfLevels = levels.length;

        // NUMBER OF SUBJECTS
        const modifiedSubjects = _.flatMap(levels, 'subjects');
        const noOfSubjects = _.isEmpty(modifiedSubjects)
          ? 0
          : _.uniq(modifiedSubjects).length;

        //NUMBER OF ASSIGNED TEACHERS
        const modifiedTeachers = _.filter(levels, 'teacher');
        const noOfAssignedTeachers = _.isEmpty(modifiedTeachers)
          ? 0
          : modifiedTeachers.length;

        setLevelSummary({
          noOfLevels,
          noOfSubjects,
          noOfAssignedTeachers,
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    levelLoading: levels.isLoading,
    levelIsFetching: levels.isFetching,
    levelRefetch: levels.refetch,
    levelsOption,
    levelSummary,
    levels: students,
  };
}

export default useLevel;
