const _ = require('lodash');
module.exports = generateTotalGrade = (scores) => {
  const coreSubjects = [
    'English Language',
    'Mathematics',
    'Integrated Science',
    'Social Studies',
    'Our World,Our People',
  ];
  //GET Student Grade
  const allSubjectsGrades = _.map(scores, ({ grade, subject }) => {
    return {
      subject,
      grade: Number(grade.split('')[1]),
    };
  });

  //Get core subjects grade
  const allCoreSubjectsGrades = allSubjectsGrades.filter(({ subject }) =>
    coreSubjects.includes(subject)
  );

  //Get grades of other subjects
  const allOtherSubjectsGrades = allSubjectsGrades
    .sort((a, b) => a.grade - b.grade)
    .filter(({ subject }) => !coreSubjects.includes(subject))
    .slice(0, 2);

  return _.sumBy(
    _.union(allCoreSubjectsGrades, allOtherSubjectsGrades),
    'grade'
  );
};
