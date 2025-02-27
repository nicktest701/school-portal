export const generateCustomGrade = (score, grades) => {
  const selected = grades?.find(
    (grade) => grade?.lowestMark <= score && score <= grade.highestMark
  );

  return {
    totalScore: score,
    grade: selected?.grade || "N/A",
    remarks: selected?.remarks || "N/A",
  };
};
