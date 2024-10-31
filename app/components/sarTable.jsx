// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const SarTable = ({ data, interval, startPeriod, endPeriod }) => {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow className="sticky top-0 bg-secondary z-20">
//           <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider divide-x divide-[#1e293b]">
//             SAR
//           </TableHead>
//           {[
//             "Al Bilad",
//             "Al Inma",
//             "Al Rajhi",
//             "BSF",
//             "Riyad Bank",
//             "SABB",
//             "SIB",
//             "SNB",
//           ].map((bank) => (
//             <TableHead
//               key={bank}
//               colSpan="2"
//               className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
//             >
//               {bank}
//             </TableHead>
//           ))}
//         </TableRow>
//         <TableRow className="sticky top-0 bg-secondary z-20">
//           <TableHead className="px-6 py-3"></TableHead>
//           {new Array(8).fill(null).map((_, index) => (
//             <React.Fragment key={index}>
//               <TableHead className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
//                 {" "}
//                 {interval === "QUARTERLY" ? `Q1 ${startPeriod}` : startPeriod}
//               </TableHead>
//               <TableHead className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
//                 {" "}
//                 {interval === "QUARTERLY" ? `Q1 ${endPeriod}` : endPeriod}
//               </TableHead>
//             </React.Fragment>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody style={{ width: "10px", maxHeight: "650px" }}>
//         {data?.map((row, index) => (
//           <React.Fragment key={index}>
//             <TableRow className="text-center">
//               <TableCell
//                 rowSpan="2"
//                 className="bg-secondary border-r-[1px] sticky left-0 z-10 px-6 py-4 whitespace-nowrap text-sm text-gray-100"
//               >
//                 {row?.metric
//                   ? `${row.metric
//                       .replace(/_/g, " ")
//                       .replace(/([a-z])([A-Z])/g, "$1 $2")
//                       .slice(0, 20)}${row.metric.length > 20 ? "..." : ""}`
//                   : ""}
//               </TableCell>
//               <TableCell colSpan="2">{row["Al Inma"]?.net}</TableCell>
//               <TableCell colSpan="2">{row["Al Rajhi"]?.net}</TableCell>
//               <TableCell colSpan="2">{row["Al Bilad"]?.net}</TableCell>
//               <TableCell colSpan="2">{row["BSF"]?.net}</TableCell>
//               <TableCell colSpan="2">{row["Riyad Bank"]?.net}</TableCell>
//               <TableCell colSpan="2">{row["SNB"]?.net}</TableCell>
//               <TableCell colSpan="2">{row["SABB"]?.net}</TableCell>
//               <TableCell colSpan="2">{row["SIB"]?.net}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>
//                 {
//                   row["Al Inma"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["Al Inma"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>

//               <TableCell>
//                 {
//                   row["Al Rajhi"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["Al Rajhi"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>

//               <TableCell>
//                 {
//                   row["Al Bilad"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["Al Bilad"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>

//               <TableCell>
//                 {
//                   row["BSF"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["BSF"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>

//               <TableCell>
//                 {
//                   row["Riyad Bank"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["Riyad Bank"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>

//               <TableCell>
//                 {
//                   row["SNB"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["SNB"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>

//               <TableCell>
//                 {
//                   row["SABB"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["SABB"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>

//               <TableCell>
//                 {
//                   row["SIB"]?.[
//                     `${
//                       interval === "QUARTERLY"
//                         ? `Q1_${startPeriod}`
//                         : startPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//               <TableCell>
//                 {
//                   row["SIB"]?.[
//                     `${
//                       interval === "QUARTERLY" ? `Q1_${endPeriod}` : endPeriod
//                     }`
//                   ]
//                 }
//               </TableCell>
//             </TableRow>
//           </React.Fragment>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default SarTable;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SarTable = ({
  data,
  interval,
  startPeriod,
  endPeriod,
  quarter,
  quarter2,
}) => {
  const getCellValue = (bankData, period) => {
    return bankData?.[period] ?? 0;
  };

  return (
    <Table>
      <TableHeader className="sticky top-0 bg-secondary z-20">
        <TableRow className="sticky top-0 bg-secondary z-20">
          <TableHead className="px-6  bg-secondary z-30 sticky left-0 py-3 text-left text-xs font-medium  uppercase tracking-wider divide-x divide-[#1e293b]">
            SAR
          </TableHead>
          {[
            "Al Rajhi",
            "Al Inma",
            "Al Bilad",
            "BSF",
            "Riyad Bank",
            "SNB",
            "BAJ",
            "ANB",
            "SABB",
            "SIB",
          ].map((bank,i) => (
            <TableHead
              key={bank}
              colSpan="2"
              className={`px-6 ${i === 0 ? " ":""} py-3 text-left text-xs font-medium  uppercase tracking-wider`}
            >
              {bank}
            </TableHead>
          ))}
        </TableRow>
        <TableRow className="sticky top-0 bg-secondary z-20">
          <TableHead className="px-6 py-3 bg-secondary sticky left-0  z-30"></TableHead>
          {new Array(10).fill(null).map((_, index) => (
            <React.Fragment key={index}>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                {" "}
                {interval === "QUARTERLY"
                  ? `${quarter} ${startPeriod}`
                  : startPeriod}
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                {" "}
                {interval === "QUARTERLY"
                  ? `${quarter2} ${endPeriod}`
                  : endPeriod}
              </TableHead>
            </React.Fragment>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody style={{ width: "10px", maxHeight: "650px" }}>
        {data?.map((row, index) => (
          <React.Fragment key={index}>
            <TableRow className="text-center">
              <TableCell
                rowSpan="2"
                className="bg-secondary border-r-[1px] sticky left-0 z-10 px-6 py-4 whitespace-nowrap text-sm "
              >
                {row?.metric
                  ? `${row.metric
                    .replace(/([A-Z])/g, ' $1')
                      .split(' ') // Split the string into an array of words
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
                      .join(' ')
                      .slice(0, 20)}${row.metric.length > 20 ? "..." : ""}`
                  : ""}
              </TableCell>
              <TableCell colSpan="2">{row["Al Rajhi"]?.net}</TableCell>
              <TableCell colSpan="2">{row["Al Inma"]?.net}</TableCell>
              <TableCell colSpan="2">{row["Al Bilad"]?.net}</TableCell>
              <TableCell colSpan="2">{row["BSF"]?.net}</TableCell>
              <TableCell colSpan="2">{row["Riyad Bank"]?.net}</TableCell>
              <TableCell colSpan="2">{row["SNB"]?.net}</TableCell>
              <TableCell colSpan="2">{row["BAJ"]?.net}</TableCell>
              <TableCell colSpan="2">{row["ANB"]?.net}</TableCell>
              <TableCell colSpan="2">{row["SABB"]?.net}</TableCell>
              <TableCell colSpan="2">{row["SIB"]?.net}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {row["Al Rajhi"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["Al Rajhi"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["Al Inma"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["Al Inma"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["Al Bilad"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["Al Bilad"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["BSF"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["BSF"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["Riyad Bank"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["Riyad Bank"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["SNB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["SNB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["BAJ"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["BAJ"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["ANB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["ANB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["SABB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["SABB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>

              <TableCell>
                {row["SIB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter}_${startPeriod}`
                      : startPeriod
                  }`
                ] ?? 0}
              </TableCell>
              <TableCell>
                {row["SIB"]?.[
                  `${
                    interval === "QUARTERLY"
                      ? `${quarter2}_${endPeriod}`
                      : endPeriod
                  }`
                ] ?? 0}
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default SarTable;
