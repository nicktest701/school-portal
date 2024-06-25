import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLevel } from '../../api/levelAPI';
import { useState } from 'react';


function useLevelById(id) {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const queryClient = useQueryClient();

  const levels = useQuery({
    queryKey: ['level', id],
    queryFn: () => getLevel(id),
    enabled: !!id,
    initialData: queryClient
      .getQueryData(['levels'])
      ?.find((level) => level?._id === id),
    onSuccess: (data) => {
      setStudents(data?.students);
      setSubjects(data?.subjects);
    },
  });

  return {
    levelLoading: levels.isLoading,
    students,
    gradeSystem: levels?.data?.grades,
    subjects: subjects,
    rollNumber: levels?.data?.students?.length,
    refetch: levels.refetch,
    levelError: levels?.error,
  };
}

export default useLevelById;
