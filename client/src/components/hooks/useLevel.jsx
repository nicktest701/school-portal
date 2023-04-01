import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { getAllLevels } from '../../api/levelAPI';
import _ from 'lodash';
import { UserContext } from '../../context/providers/userProvider';
function useLevel() {
  const {
    userState: { session },
  } = useContext(UserContext);

  const [levelsOption, setLevelOptions] = useState([]);
  const [levelSummary, setLevelSummary] = useState({
    noOfLevels: 0,
    noOfSubjects: 0,
    noOfAssignedTeachers: 0,
  });

  const levels = useQuery(
    ['levels'],
    () => getAllLevels(session.sessionId, session.termId),
    {
      enabled: !!session.sessionId,
      onSuccess: (levels) => {
        if (levels?.length !== 0) {
          const modifiedLevels = levels.map(({ _id, level, students }) => {
            return {
              _id,
              type: `${level?.name}${level?.type}`,
              noOfStudents: students?.length,
            };
          });

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
    }
  );

  return {
    levelLoading: levels.isLoading || levels.isFetching,
    levelRefetch: levels.refetch,
    levelsOption,
    levelSummary,
  };
}

export default useLevel;
