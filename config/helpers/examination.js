// This module provides functions to retrieve the best scores from student records.

const ordinal = require("ordinal-suffix");
const _ = require("lodash");
const Examination = require("../../models/examinationModel");

const LEVEL_OPTIONS = [
  "Day Care",
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Kindergarten 1",
  "Kindergarten 2",
  "Basic 1",
  "Basic 2",
  "Basic 3",
  "Basic 4",
  "Basic 5",
  "Basic 6",
  "Basic 7",
  "Basic 8",
  "Basic 9",
  "Basic 10",
  "Basic 11",
  "Basic 12",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Stage 1",
  "Stage 2",
  "Stage 3",
  "Stage 4",
  "Stage 5",
  "Stage 6",
  "Stage 7",
  "Stage 8",
  "Stage 9",
  "Stage 10",
  "Stage 11",
  "Stage 12",
  "J.H.S 1",
  "J.H.S 2",
  "J.H.S 3",
  "S.H.S 1",
  "S.H.S 2",
  "S.H.S 3",
];

const TERM_OPTIONS = [
  "Term 1",
  "Term 2",
  "Term 3",
  "Semester 1",
  "Semester 2",
  "Semester 3",
];

function getPos(students) {
  const sorted = _.map(
    _.orderBy(students, "overallScore", "desc"),
    "overallScore"
  );
  return students.slice().map((student) => {
    return {
      _id: student._id,
      overallScore: student.overallScore,
      level: student?.level?.levelName,
      term: student?.term?.term,
      position: sorted.indexOf(student.overallScore) + 1,
    };
  });
}

function sortByLevelAndTerm(records) {
  return records.sort((a, b) => {
    // find index of each level and term in the defined arrays
    const levelAIndex = LEVEL_OPTIONS.indexOf(a.level);
    const levelBIndex = LEVEL_OPTIONS.indexOf(b.level);

    if (levelAIndex !== levelBIndex) {
      return levelAIndex - levelBIndex; // sort by level order
    }

    const termAIndex = TERM_OPTIONS.indexOf(a.term);
    const termBIndex = TERM_OPTIONS.indexOf(b.term);

    return termAIndex - termBIndex; // sort by term order
  });
}

function getBestOverallScore(records) {
  if (!Array.isArray(records) || records.length === 0) {
    return null; // handle empty input
  }

  return records.reduce((best, current) => {
    return current.overallScore > best.overallScore ? current : best;
  });
}

function getOverallBestSubject(records) {
  console.log(records);
  // This function retrieves the best score across all subjects from a list of student records.
  if (!Array.isArray(records) || records.length === 0) {
    return null;
  }

  let best = {
    level: "Not Available", // capture the levelId
    term: "Not Available", // capture the termId
    score: 0, // this will hold the best score object
  };

  records.forEach((record) => {
    if (Array.isArray(record.scores)) {
      record.scores.forEach((score) => {
        if (!best || score.totalScore > best.score.totalScore) {
          best = {
            level: record.level, // capture the levelId
            term: record.term, // capture the termId
            score: score,
          };

          console.log(best);
        }
      });
    }
  });

  return best;
}

// This function retrieves the best score for a specific subject from a list of student records.
// It assumes each record has a 'scores' object with subject names as keys.
function getBestSubjectScore(records, subject) {
  if (!Array.isArray(records) || records.length === 0 || !subject) {
    return null; // handle empty input or missing subject
  }

  return records.reduce(
    (best, current) => {
      const currentScore = current.scores[subject];
      if (currentScore > (best.scores[subject] || -Infinity)) {
        return current;
      }
      return best;
    },
    { scores: {} }
  );
}

//Get best position of students based on their overall scores
// function getBestPosition(students) {
//   const sorted = students.slice().sort((a, b) => b.overallScore - a.overallScore);
//   return sorted.map((student, index) => ({
//     _id: student._id,
//     overallScore: student.overallScore,
//     position: index + 1,
//   }));
// }

const getStudentPosition = async function (records, student) {
  if (!Array.isArray(records) || records.length === 0 || !student) {
    return null; // handle empty input or missing student
  }
  // This function retrieves the position of a student based on their overall score in a specific level and term.
  const allPostions = records.map(async ({ level, term, _id }) => {
    const studentOverallScores = await Examination.find({
      level: level,
      term: term,
    })
      .select(["_id", "level", "scores", "overallScore"])
      .populate({
        path: "level",
        select: ["level", "subjects"],
      })
      .populate({
        path: "term",
        select: ["term", "academicYear"],
      });

    //GET student position
    const positions = getPos(studentOverallScores);
    const position = positions.find((exams) => {
      return exams._id.toString() === _id.toString();
    });

    return {
      level: position?.level,
      term: position?.term,
      position: ordinal(position.position),
    }; // Convert position to ordinal format
  });
  const pos = await Promise.all(allPostions);

  return pos.reduce((best, current) => {
    const bestNum = parseInt(best.position, 10);
    const currentNum = parseInt(current.position, 10);

    const actualPosition = currentNum < bestNum ? current : best;

    return {
      position: actualPosition,
      level: position?.level,
      term: position?.term,
    };
  });
};

function calculatePerformanceIndex(records) {
  if (!Array.isArray(records) || records.length === 0) {
    return [];
  }

  const indexes = records.map((record) => {
    const scores = record.scores || [];
    if (scores.length === 0) {
      return {
        term: record.term?.term,
        level: record.level?.levelName,
        levelType: `${record.level?.levelName} ${record.term?.term}`,
        performanceIndex: 0,
      };
    }

    const total = scores.reduce((sum, s) => sum + s.totalScore, 0);
    const average = total / scores.length;
    const performanceIndex = (average / 100) * 100; // normalize to percentage

    return {
      term: record.term?.term,
      level: record.level?.levelName,
      levelType: `${record.level?.levelName} ${record.term?.term}`,
      performanceIndex: performanceIndex.toFixed(2), // keep 2 decimal places
    };
  });

  return sortByLevelAndTerm(indexes);
}

function getBestPerformanceIndex(records) {
  if (!Array.isArray(records) || records.length === 0) {
    return null;
  }

  return records
    .map((record) => {
      const scores = record.scores || [];

      if (scores.length === 0) {
        return {
          studentId: record.student.$oid,
          levelId: record.level.$oid,
          performanceIndex: 0,
        };
      }

      const total = scores.reduce((sum, s) => sum + s.totalScore, 0);
      const average = total / scores.length;
      const performanceIndex = (average / 100) * 100;

      return {
        performanceIndex: parseFloat(performanceIndex.toFixed(2)),
      };
    })
    .reduce((best, current) =>
      current.performanceIndex > best.performanceIndex ? current : best
    );
}

function getAveragePerformanceIndex(records) {
  if (!Array.isArray(records) || records.length === 0) {
    return 0;
  }

  let totalPI = 0;
  let count = 0;

  records.forEach((record) => {
    const scores = record.scores || [];
    if (scores.length > 0) {
      const total = scores.reduce((sum, s) => sum + s.totalScore, 0);
      const average = total / scores.length;
      const performanceIndex = (average / 100) * 100; // normalize to %
      totalPI += performanceIndex;
      count++;
    }
  });

  return count > 0 ? parseFloat((totalPI / count).toFixed(2)) : 0;
}

function getTopSubjects(records, limit = 5) {
  if (!Array.isArray(records) || records.length === 0) {
    return [];
  }

  const allSubjects = [];

  // Collect all subjects with their level and term
  records.forEach((record) => {
    if (Array.isArray(record.scores)) {
      record.scores.forEach((score) => {
        allSubjects.push({
          level: record.level.levelName,
          term: record.term.term,
          subject: score?.subject,
          score: score?.totalScore,
        });
      });
    }
  });

  // Sort by totalScore descending
  allSubjects.sort((a, b) => b.score - a.score);

  // Return top N
  return allSubjects.slice(0, limit);
}
function getTopOverallScores(records, limit = 5) {
  if (!Array.isArray(records) || records.length === 0) {
    return [];
  }

  // Sort by totalScore descending
  const bestScores = records.sort((a, b) => b.overallScore - a.overallScore);

  const newRecords = bestScores.slice(0, limit);

  const bestWithIndex = newRecords.map((record) => {
    const scores = record.scores || [];
    if (scores.length === 0) {
      return {
        term: record.term?.term,
        level: record.level?.levelName,
        levelType: `${record.level?.levelName} ${record.term?.term}`,
        overallScore: record?.overallScore,
        performanceIndex: 0,
      };
    }

    const total = scores.reduce((sum, s) => sum + s.totalScore, 0);
    const average = total / scores.length;
    const performanceIndex = (average / 100) * 100; // normalize to percentage
    return {
      term: record.term?.term,
      level: record.level?.levelName,
      levelType: `${record.level?.levelName} ${record.term?.term}`,
      overallScore: record?.overallScore,
      performanceIndex,
    };
  });

  // Return top N
  return bestWithIndex;
}

async function getMyPosition(termId, levelId, examsId) {
  const studentOverallScores = await Examination.find({
    term: termId,
    level: levelId,
  }).select(["overallScore"]);

  const sorted = _.map(
    _.orderBy(studentOverallScores, "overallScore", "desc"),
    "overallScore"
  );
  const positions = studentOverallScores.slice().map((student) => {
    return {
      _id: student._id,
      overallScore: student.overallScore,
      position: sorted.indexOf(student.overallScore) + 1,
    };
  });

  const position =
    positions.find((exams) => {
      return exams._id.toString() === examsId.toString();
    }).position || "";

  return ordinal(position);
}

module.exports = {
  getBestOverallScore,
  getBestSubjectScore,
  getOverallBestSubject,
  getStudentPosition,
  getBestPerformanceIndex,
  calculatePerformanceIndex,
  getAveragePerformanceIndex,
  getTopSubjects,
  getTopOverallScores,
  getMyPosition,
  // getBestPosition, // Uncomment if you want to use this function
  // Add more functions as needed
};
