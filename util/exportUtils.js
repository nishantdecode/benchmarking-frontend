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
    ctx.font = "18px Arial";

    let length = checkedBanks?.length;
    let paddingFrame = 20;
    let totalTextWidth = 0;
    let totalTextWidth1 = 0;
    let totalTextWidth2 = 0;

    const rectangleWidth = 60;
    const rectangleHeight = 10;
    const padding = 20;

    let bankNames = data
      ? checkedBanks?.map((bank, index) => {
          return bank + " - " + data[index].toFixed(2) + "%";
        })
      : checkedBanks;
    let bankColors = checkedBanks?.map((bank) => {
      return banks.find((item) => item.name === bank).color;
    });
    bankNames?.forEach((item, index) => {
      if (index < 5) {
        totalTextWidth1 += ctx.measureText(item).width;
      } else {
        totalTextWidth2 += ctx.measureText(item).width;
      }
    });
    totalTextWidth1 +=
      length > 5 ? 4 * paddingFrame : (length - 1) * paddingFrame;
    totalTextWidth2 +=
      length - 5 > 5 ? 4 * paddingFrame : (length - 6) * paddingFrame;
    totalTextWidth =
      totalTextWidth1 > totalTextWidth2 ? totalTextWidth1 : totalTextWidth2;

    canvas.width =
      totalTextWidth > img.width
        ? totalTextWidth + 2 * paddingFrame
        : img.width + 2 * paddingFrame;
    canvas.height = banks
      ? length < 5
        ? img.height + 180 + 2 * paddingFrame
        : img.height + 240 + 2 * paddingFrame
      : img.height + 90 + 2 * paddingFrame;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    banks
      ? length < 5
        ? ctx.drawImage(
            img,
            (canvas.width - img.width) / 2 + paddingFrame,
            90 + paddingFrame
          )
        : ctx.drawImage(
            img,
            (canvas.width - img.width) / 2 + paddingFrame,
            150 + paddingFrame
          )
      : ctx.drawImage(img, 0 + paddingFrame, 0 + paddingFrame);

    const startX = (canvas.width - totalTextWidth1) / 2;
    const startY = paddingFrame;

    let currentX = startX;
    if (banks) {
      bankColors.forEach((color, index) => {
        const textWidth = ctx.measureText(bankNames[index]).width;
        if (index === 1) {
          currentX += fileName === "Market Share" ? 80 : 50;
        }
        let textX = currentX;
        const textY = index < 5 ? startY + 0 + 30 : startY + 60 + 30;

        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(bankNames[index], textX, textY);

        const rectangleX =
          index === 0
            ? currentX +
              (textWidth - rectangleWidth) / 2 +
              (fileName === "Market Share" ? 50 : 30)
            : currentX + (textWidth - rectangleWidth) / 2;
        const rectangleY = index < 5 ? startY : startY + 60;
        ctx.fillStyle = color;
        ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

        currentX += textWidth + padding;
        if (index === 4) {
          currentX = (canvas.width - totalTextWidth2) / 2;
        }
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
    ctx.font = "18px Arial";

    let length = checkedBanks?.length;
    let paddingFrame = 20;
    let totalTextWidth = 0;
    let totalTextWidth1 = 0;
    let totalTextWidth2 = 0;

    const rectangleWidth = 60;
    const rectangleHeight = 10;
    const padding = 20;

    let bankNames = data
      ? checkedBanks?.map((bank, index) => {
          return bank + " - " + data[index].toFixed(2) + "%";
        })
      : checkedBanks;
    let bankColors = checkedBanks?.map((bank) => {
      return banks.find((item) => item.name === bank).color;
    });
    bankNames?.forEach((item, index) => {
      if (index < 5) {
        totalTextWidth1 += ctx.measureText(item).width;
      } else {
        totalTextWidth2 += ctx.measureText(item).width;
      }
    });
    totalTextWidth1 +=
      length > 5 ? 4 * paddingFrame : (length - 1) * paddingFrame;
    totalTextWidth2 +=
      length - 5 > 5 ? 4 * paddingFrame : (length - 6) * paddingFrame;
    totalTextWidth =
      totalTextWidth1 > totalTextWidth2 ? totalTextWidth1 : totalTextWidth2;

    canvas.width =
      totalTextWidth > img.width
        ? totalTextWidth + 2 * paddingFrame
        : img.width + 2 * paddingFrame;
    canvas.height = banks
      ? length < 5
        ? img.height + 180 + 2 * paddingFrame
        : img.height + 240 + 2 * paddingFrame
      : img.height + 90 + 2 * paddingFrame;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    banks
      ? length < 5
        ? ctx.drawImage(
            img,
            (canvas.width - img.width) / 2 + paddingFrame,
            90 + paddingFrame
          )
        : ctx.drawImage(
            img,
            (canvas.width - img.width) / 2 + paddingFrame,
            150 + paddingFrame
          )
      : ctx.drawImage(img, 0 + paddingFrame, 0 + paddingFrame);

    const startX = (canvas.width - totalTextWidth1) / 2;
    const startY = paddingFrame;

    let currentX = startX;
    if (banks) {
      bankColors.forEach((color, index) => {
        const textWidth = ctx.measureText(bankNames[index]).width;
        if (index === 1) {
          currentX += fileName === "Market Share" ? 80 : 50;
        }
        let textX = currentX;
        const textY = index < 5 ? startY + 0 + 30 : startY + 60 + 30;

        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(bankNames[index], textX, textY);

        const rectangleX =
          index === 0
            ? currentX +
              (textWidth - rectangleWidth) / 2 +
              (fileName === "Market Share" ? 50 : 30)
            : currentX + (textWidth - rectangleWidth) / 2;
        const rectangleY = index < 5 ? startY : startY + 60;
        ctx.fillStyle = color;
        ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

        currentX += textWidth + padding;
        if (index === 4) {
          currentX = (canvas.width - totalTextWidth2) / 2;
        }
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

function isDecimal(number) {
  return number % 1 !== 0 ? 1 : 0;
}

export function downloadSheet(banks, value, fileName, sheetNames, exportData) {
  console.log({banks,value,fileName,sheetNames,exportData})
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
          if (key === "label" || key === "id" || key === "category" || key === "year") {
            return [key, dataObj[key]];
          }
          if (fileName === "Common Size Individual Bank" || fileName === "Market Share") {
            return [key, dataObj[key].toFixed(2)];
          }
          return (isDecimal(dataObj[key]) ? [key, parseFloat(dataObj[key]).toFixed(2)] : [key, dataObj[key]]);
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
