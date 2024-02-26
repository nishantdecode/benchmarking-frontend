import xlsx from "json-as-xlsx";
import { PDFDocument } from "pdf-lib";

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

export function downloadSheet(data, sheetName, fileName) {
  const dataColumns = Object.keys(data[0])
    .filter((key) => key !== "id")
    .reverse()
    .map((key, index) => {
      if (index === 0) {
        return { label: key, value: key };
      } else {
        return { label: key, value: key };
      }
    });
    
  let columns = [
    {
      sheet: sheetName,
      columns: dataColumns,
      content: data,
    },
  ];

  let settings = {
    fileName: fileName,
  };

  xlsx(columns, settings);
}
