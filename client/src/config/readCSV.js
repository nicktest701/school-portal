import papaparse from 'papaparse';
import _ from 'lodash';
export const readCSV = (result) => {
  return papaparse.parse(result, {
    header: true,
    skipEmptyLines: 'greedy',
    dynamicTyping: true,
    complete: function (results) {
      // const columns = _.keys(results.data);

      // const d = results.data;

      console.log(results.data);
    },
  }).data;
};
