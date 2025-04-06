import _ from 'lodash'


const defaultGrades = [
  {
    "lowestMark": 0,
    "highestMark": 39,
    "grade": "F9",
    "remarks": "Fail",
    "id": "e0681c5d-a5cb-4740-9b83-41f6aa6e7ffd"
  },
  {
    "lowestMark": 40,
    "highestMark": 44,
    "grade": "E8",
    "remarks": "Weak",
    "id": "c177921e-4f08-4915-8e93-90ffe69e61a6"
  },
  {
    "lowestMark": 45,
    "highestMark": 49,
    "grade": "D7",
    "remarks": "Pass",
    "id": "44c99170-f372-4a9c-a14c-35656c471bbd"
  },
  {
    "lowestMark": 50,
    "highestMark": 54,
    "grade": "C6",
    "remarks": "Average",
    "id": "a6e0181e-c3e5-4a4e-949a-ded1fd407db1"
  },
  {
    "lowestMark": 55,
    "highestMark": 59,
    "grade": "C5",
    "remarks": "Average",
    "id": "3a401ecf-cd4f-4c71-a7af-1999d7c7214c"
  },
  {
    "lowestMark": 60,
    "highestMark": 64,
    "grade": "C4",
    "remarks": "Good",
    "id": "0a3d55ef-c0dc-480c-97cf-09f7b0c2747c"
  },
  {
    "lowestMark": 65,
    "highestMark": 69,
    "grade": "B3",
    "remarks": "Good",
    "id": "54fc1fff-d0de-4916-80cf-adf1fa929f31"
  },

  {
    "lowestMark": 70,
    "highestMark": 74,
    "grade": "B2",
    "remarks": "Very Good",
    "id": "0b93cb16-9774-46cb-bb29-b590e032ff19"
  },
  {
    "lowestMark": 75,
    "highestMark": 100,
    "grade": "A1",
    "remarks": "Excellent",
    "id": "3c4cd6dc-33ce-4e6b-b551-9efdc0c21edc"
  }
]

export const generateCustomGrade = (score, grades) => {
  let selected = {}
  if (_.isEmpty(grades)) {

    selected = defaultGrades?.find(
      (grade) => grade?.lowestMark <= score && score <= grade.highestMark
    );

  } else {
    selected = grades?.find(
      (grade) => grade?.lowestMark <= score && score <= grade.highestMark
    );
  }

  return {
    totalScore: score,
    grade: selected?.grade,
    remarks: selected?.remarks
  };
};
