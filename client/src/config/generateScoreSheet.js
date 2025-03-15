import _ from 'lodash';

export const getColumns = (subjects) => {
 
  const customColumns = subjects?.map((subject) => {
    return {
      title: subject?.name,
      field: _.camelCase(subject?.name),
    };
  });


  return [
    {
      title: 'No',
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      title: 'STUDENT NAME',
      field: 'fullName',
      cellStyle: {
        width: 400,
        // color: 'blue',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        minWidth: 300,
      },
    },
    ...customColumns,
    {
      title: 'OVERALL SCORE',
      field: 'overallScore',
      cellStyle: {
        color: 'red',
        fontWeight: 'bold',
      },
    },
    {
      title: 'GRADE',
      field: 'grade',
      cellStyle: {
        color: 'blue',
        fontWeight: 'bold',
      },
    },
    {
      title: 'POSITION',
      field: 'position',
      cellStyle: {
        color: 'green',
        fontWeight: 'bold',
      },
      // export: false,
    },
  ];
};

export const getResults = (results = [], subjects = []) => {
  const customSubjects = subjects?.map((subject) => {
    return {
      [_.camelCase(subject?.name)]: 0,
    };
  });

  const customData = results?.map(
    ({ fullName, scores, overallScore, grade, position }) => {
      //extract total subject score
      const items = scores?.map(({ subject, totalScore }) => {
        return {
          [_.camelCase(subject)]: totalScore,
        };
      });

      //  convert array of scores to object

      const score = {};
      items.forEach((item) => {
        const key = Object.keys(item)[0];
        score[key] = item[key];
      });

      //  convert array of subjects to object

      const subject = {};
      customSubjects.forEach((item) => {
        const key = Object.keys(item)[0];
        subject[key] = item[key];
      });

      //Merge scores with subject
      const scoreSheet = { ...score };

      for (let key in subject) {
        if (scoreSheet[key] === undefined) {
          scoreSheet[key] = subject[key];
        }
      }

      return {
        fullName,
        overallScore,
        grade,
        position,
        ...scoreSheet,
      };
    }
  );

  return _.orderBy(customData, 'overallScore', 'desc');
};
