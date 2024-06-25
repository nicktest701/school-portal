import * as XLSX from "xlsx";

export const readXLSX = (result) => {
  try {
    const data = new Uint8Array(result);
    let readData = XLSX.read(data, { type: "array" });
    //work book
    const workBook = readData.SheetNames[0];
    const workSheet = readData.Sheets[workBook];
    /* Convert sheet to json*/
    const dataParse = XLSX.utils.sheet_to_json(workSheet, {
      header: 0,
    });

    return dataParse;
  } catch (error) {
    //console.log(error);
  }
};
