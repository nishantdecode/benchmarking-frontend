import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import jsonexport from "jsonexport";

export const downloadImage = (ref) => {
  const link = document.createElement("a");
  link.download = "benchmarkingChart.png";
  link.href = ref.current.toBase64Image();
  link.click();
};

export const downloadPDF = async (ref) => {
  const imageDataURL = ref.current.toBase64Image();
  const pdfDoc = await PDFDocument.create();
  const pngImage = await pdfDoc.embedPng(imageDataURL);
  const page = pdfDoc.addPage([pngImage.width, pngImage.height]);
  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: pngImage.width,
    height: pngImage.height,
  });
  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(pdfBlob);
  link.download = "benchmarkingChart.pdf";
  link.click();
};

export function downloadSheet(exportData, sheetNames, fileName) {
  let ind = 0;
  let csvData = {};
  for (const item of exportData) {
    jsonexport(item, function (err, csv) {
      if (err) return console.error(err);
      csvData[sheetNames[ind]] = csv;
    });
    ind++;
  }

  const reversedCSVData = Object.fromEntries(
    sheetNames.map((table) => {
      const rows = csvData[table].split("\n");

      const modifiedRows = rows.map((row) => {
        const columns = row.split(",");
        columns.reverse();
        return columns.slice(1);
      });
      return [table, modifiedRows.join("\n")];
    })
  );

  const workbook = XLSX.utils.book_new();

  Object.entries(reversedCSVData).forEach(([table, csvContent]) => {
    const csvData = csvContent.split("\n").map((row) => row.split(","));
    const worksheet = XLSX.utils.aoa_to_sheet(csvData);
    XLSX.utils.book_append_sheet(workbook, worksheet, table);
  });

  const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  const excelBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(excelBlob, fileName + ".xlsx");
}
