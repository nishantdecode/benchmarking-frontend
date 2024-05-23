import React from "react";
import { BiCalendar } from "react-icons/bi";

const SarFilter = ({
  interval,
  setInterval,
  startPeriod,
  setStartPeriod,
  endPeriod,
  setEndPeriod,
}) => {
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
            {[...Array(20)].map((_, index) => (
              <option
                key={index}
                value={`${2011 + index}`}
                className="bg-secondary text-white px-4 py-2"
              >
                {2011 + index}
              </option>
            ))}
          </select>
        </div>
        <h1 className="mr-3">To</h1>
        <div className="relative">
          <BiCalendar
            size={20}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-100 pointer-events-none"
          />
          <select
            value={endPeriod}
            onChange={(e) => setEndPeriod(e.target.value)}
            className="bg-[#555677] border-2 border-white text-gray-100 rounded-md py-1 px-8 pr-10 appearance-none"
          >
            {[...Array(20)].map((_, index) => (
              <option
                key={index}
                value={`${2011 + index}`}
                className="bg-secondary text-white px-4 py-2"
              >
                {2011 + index}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SarFilter;
