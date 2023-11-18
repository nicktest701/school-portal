const _ = require('lodash');
const Subject = require('../models/subjectModel');

module.exports = generateTotalGrade = async (scores, gradeSystem) => {
  const subjects = await Subject.find({
    isCore: true,
  });
  // console.log(gradeSystem)

  const coreSubjects = _.map(subjects, 'name');
  //GET Student Grade
  const allSubjectsGrades = _.map(scores, ({ totalScore, subject }) => {
    const selected = gradeSystem?.find(
      (grade) =>
        grade?.lowestMark <= totalScore && totalScore <= grade?.highestMark
    );
    const highestMark = selected?.highestMark;

    let gradeValue = 0;
    if (highestMark >= 75) {
      gradeValue = 1;
    } else if (highestMark >= 70) {
      gradeValue = 2;
    } else if (highestMark >= 65) {
      gradeValue = 3;
    } else if (highestMark >= 60) {
      gradeValue = 4;
    } else if (highestMark >= 55) {
      gradeValue = 5;
    } else if (highestMark >= 50) {
      gradeValue = 6;
    } else if (highestMark >= 45) {
      gradeValue = 7;
    } else if (highestMark >= 40) {
      gradeValue = 8;
    } else {
      gradeValue = 9;
    }

    return {
      subject,
      grade: gradeValue,
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
