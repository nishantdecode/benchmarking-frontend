import React from "react";
import { BiCalendar } from "react-icons/bi";

const SarFilter = ({
  interval,
  setInterval,
  startPeriod,
  setStartPeriod,
  endPeriod,
  setEndPeriod,
  quarter,
  setQuarter,
  quarter2,
  setQuarter2,
  years,
}) => {
  const filteredStartYears = years.filter(
    (year) => !endPeriod || year < endPeriod
  );
  const filteredEndYears = years.filter(
    (year) => !startPeriod || year > startPeriod
  );

  return (
    <div className="flex items-center justify-end mb-4">
      <div className="flex items-center">
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="bg-secondary text-gray-100 border-none rounded-md py-1 px-2 mr-4 p-[20px]"
          style={{ appearance: "none" }}
        >
          <option value="YEARLY" className="bg-secondary text-white py-2">
            Yearly
          </option>
          <option value="QUARTERLY" className="bg-secondary text-white py-2">
            Quarterly
          </option>
        </select>
      </div>

      {interval === "QUARTERLY" && (
        <div className="flex items-center">
          <select
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            className="bg-secondary text-gray-100 border-2 bg-none border-white rounded-md py-1 px-2 mr-4 p-[20px]"
            style={{ appearance: "none" }}
          >
            <option value="Q1" className="bg-secondary text-white py-2">
              Q1
            </option>
            <option value="Q2" className="bg-secondary text-white py-2">
              Q2
            </option>
            <option value="Q3" className="bg-secondary text-white py-2">
              Q3
            </option>
            <option value="Q4" className="bg-secondary text-white py-2">
              Q4
            </option>
          </select>
        </div>
      )}

      <div className="flex items-center">
        <div className="relative mr-4">
          <BiCalendar
            size={20}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-100 pointer-events-none"
          />
          <select
            value={startPeriod}
            onChange={(e) => setStartPeriod(e.target.value)}
            className="bg-[#555677] border-2 border-white text-gray-100 rounded-md py-1 px-8 pr-10 appearance-none"
          >
            {filteredStartYears.map((year, index) => (
              <option
                key={index}
                value={`${year}`}
                className="bg-secondary text-white px-4 py-2"
              >
                {year}
              </option>
            ))}
          </select>
        </div>
        <h1 className="mr-3">To</h1>
        {interval === "QUARTERLY" && (
          <div className="flex items-center">
            <select
              value={quarter2}
              onChange={(e) => setQuarter2(e.target.value)}
              className="bg-secondary text-gray-100  border-2 bg-none border-white rounded-md py-1 px-2 mr-4 p-[20px]"
              style={{ appearance: "none" }}
            >
              <option value="Q1" className="bg-secondary text-white py-2">
                Q1
              </option>
              <option value="Q2" className="bg-secondary text-white py-2">
                Q2
              </option>
              <option value="Q3" className="bg-secondary text-white py-2">
                Q3
              </option>
              <option value="Q4" className="bg-secondary text-white py-2">
                Q4
              </option>
            </select>
          </div>
        )}
        {/* background: none; padding: 0; */}
        <div className="relative">
          <BiCalendar
            size={20}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-100 pointer-events-none"
          />
          <select
            value={endPeriod}
            onChange={(e) => setEndPeriod(e.target.value)}
            className="bg-[#555677] border-2 bg-none  border-white text-gray-100 rounded-md py-1 px-8 pr-10 appearance-none"
          >
            {filteredEndYears.map((year, index) => (
              <option
                key={index}
                value={`${year}`}
                className="bg-secondary text-white px-4 py-2"
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SarFilter;
