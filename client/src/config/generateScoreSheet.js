import _ from 'lodash';

export const getColumns = (subjects) => {
  const customColumns = subjects.map((subject) => {
    return {
      title: subject,
      field: _.camelCase(subject),
    };
  });

  return [
    {
      title: 'Student Name',
      field: 'fullName',
      cellStyle: {
        width: 400,
        color: 'blue',
        whiteSpace: 'nowrap',
        minWidth:250
      },
    },
    ...customColumns,
    {
      title: 'Overall Score',
      field: 'overallScore',
      cellStyle: {
        color: 'red',
        fontWeight: 'bold',
      },
    },
    {
      title: 'Position',
      field: 'position',
      cellStyle: {
        color: 'green',
        fontWeight: 'bold',
      },
    },
  ];
};

export const getResults = (results, subjects) => {
  const customSubjects = subjects.map((subject) => {
    return {
      [_.camelCase(subject)]: 0,
    };
  });

  const customData = results.map(
    ({ fullName, scores, overallScore, position }) => {
      //extract total subject score
      const items = scores.map(({ subject, totalScore }) => {
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
        position,
        ...scoreSheet,
      };
    }
  );

  return _.orderBy(customData, 'overallScore', 'desc');
};
