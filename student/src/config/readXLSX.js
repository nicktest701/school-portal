import * as XLSX from "xlsx";
import _ from 'lodash'
export const readXLSX = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });

        if (sheetData.length === 0) {
          resolve([])
        }
        // Function to filter out empty or undefined rows

        const modifiedData = sheetData.filter((row) =>
          Object.values(row).some(
            (value) => value !== undefined && value !== ""
          )
        );

        const headers = modifiedData[0].map((header) =>
          _.lowerCase(header)
        );
        const rows = modifiedData.slice(1);

        const results = rows.map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        resolve(results);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
};




