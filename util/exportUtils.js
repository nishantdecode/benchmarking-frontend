import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import jsonexport from "jsonexport";

export const downloadImage = (
  ref,
  banks,
  checkedBanks,
  fileName,
  text,
  backgroundColor,
  data
) => {
  const img = new Image();

  img.src = ref.current.toBase64Image();

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let length = checkedBanks?.length;

    canvas.width = img.width;
    canvas.height = banks
      ? length < 5
        ? img.height + 180
        : img.height + 240
      : img.height + 90;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    banks
      ? length < 5
        ? ctx.drawImage(img, 0, 90)
        : ctx.drawImage(img, 0, 150)
      : ctx.drawImage(img, 0, 0);

    let bankNames = data
      ? checkedBanks?.map((bank, index) => {
          return bank + " - " + data[index].toFixed(2) + "%";
        })
      : checkedBanks;
    let bankColors = checkedBanks?.map((bank) => {
      return banks.find((item) => item.name === bank).color;
    });

    const rectangleWidth = 60;
    const rectangleHeight = 10;
    const padding = 200;

    const totalRectangleWidth =
      length < 5
        ? length * (rectangleWidth + padding)
        : 5 * (rectangleWidth + padding);
    const startX = 70 + (canvas.width - totalRectangleWidth) / 2;
    const startY = 20;

    if (banks) {
      bankColors.forEach((color, index) => {
        const rectangleX =
          index < 5
            ? startX + index * (rectangleWidth + padding)
            : startX + (index - 5) * (rectangleWidth + padding);
        const rectangleY = index < 5 ? startY : startY + 60;
        ctx.fillStyle = color;
        ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

        const textWidth = ctx.measureText(bankNames[index]).width;
        const textX =
          index === 0
            ? rectangleX + (rectangleWidth - textWidth) / 2 - 30
            : rectangleX + (rectangleWidth - textWidth) / 2;
        const textY = rectangleY + 30;

        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(bankNames[index], textX, textY);
      });
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height - 20);

    const imageDataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = fileName + ".png";
    link.href = imageDataURL;

    link.click();
  };
};

export const downloadPDF = async (
  ref,
  banks,
  checkedBanks,
  fileName,
  text,
  backgroundColor,
  data
) => {
  const img = new Image();

  img.src = ref.current.toBase64Image();

  img.onload = async function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let length = checkedBanks?.length;

    canvas.width = img.width;
    canvas.height = banks
      ? length < 5
        ? img.height + 180
        : img.height + 240
      : img.height + 90;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    banks
      ? length < 5
        ? ctx.drawImage(img, 0, 90)
        : ctx.drawImage(img, 0, 150)
      : ctx.drawImage(img, 0, 0);

    let bankNames = data
      ? checkedBanks?.map((bank, index) => {
          return bank + " - " + data[index].toFixed(2) + "%";
        })
      : checkedBanks;
    let bankColors = checkedBanks?.map((bank) => {
      return banks.find((item) => item.name === bank).color;
    });

    const rectangleWidth = 60;
    const rectangleHeight = 10;
    const padding = 200;

    const totalRectangleWidth =
      length < 5
        ? length * (rectangleWidth + padding)
        : 5 * (rectangleWidth + padding);
    const startX = 70 + (canvas.width - totalRectangleWidth) / 2;
    const startY = 20;

    if (banks) {
      bankColors.forEach((color, index) => {
        const rectangleX =
          index < 5
            ? startX + index * (rectangleWidth + padding)
            : startX + (index - 5) * (rectangleWidth + padding);
        const rectangleY = index < 5 ? startY : startY + 60;
        ctx.fillStyle = color;
        ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

        const textWidth = ctx.measureText(bankNames[index]).width;
        const textX =
          index === 0
            ? rectangleX + (rectangleWidth - textWidth) / 2 - 30
            : rectangleX + (rectangleWidth - textWidth) / 2;
        const textY = rectangleY + 30;

        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(bankNames[index], textX, textY);
      });
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height - 20);

    const imageDataURL = canvas.toDataURL("image/png");

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
    link.download = fileName + ".pdf";
    link.click();
  };
};

export function downloadSheet(banks, value, fileName, sheetNames, exportData) {
  let data = exportData.map((item) => {
    return item.map((dataObj) => {
      return Object.fromEntries(
        Object.keys(dataObj).map((key) => {
          if (key !== "bankId" && key !== "id" && value) {
            return [key, dataObj[key][value]];
          }
          if (key === "bankId") {
            return [
              "bank",
              banks.find(
                (item) => item.id.toString() === dataObj[key].toString()
              ).name,
            ];
          }
          if(key === "label" || key === "id" || key === "category"){
            return [key, dataObj[key]];
          }
          return [key, dataObj[key].toFixed(4)];
        })
      );
    });
  });

  let ind = 0;
  let csvData = {};
  for (const item of data) {
    jsonexport(item, function (err, csv) {
      if (err) return console.error(err);
      csvData[sheetNames[ind]] = csv;
    });
    ind++;
  }

  const reversedCSVData = Object.fromEntries(
    sheetNames.map((table) => {
      const rows = csvData[table].split("\n");

      let flag = 1;
      const modifiedRows = rows.map((row) => {
        const columns = row.split(",");
        if (columns[0].toString() === "id") {
          flag = 0;
        }
        if (flag) {
          columns.reverse();
        }
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
