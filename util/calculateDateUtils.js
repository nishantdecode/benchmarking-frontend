export function calculateDates(interval, start, end) {
    let startDate, endDate;
  
    // Extracting year from start and end objects
    const startYear = start.second;
    const endYear = end.second;
  
    // Calculate start date based on interval
    if (interval === "YoY & YTD") {
      // Start date is set to 1st January of start year
      startDate = new Date(startYear, 0, 1).toISOString();
    } else if (interval === "Quarterly") {
      // Determine quarter start date based on start.first
      let month, day;
      switch (start.first) {
        case "Q1":
          month = 3; // April (financial year quarter start)
          break;
        case "Q2":
          month = 6; // July
          break;
        case "Q3":
          month = 9; // October
          break;
        case "Q4":
          month = 12; // January
          break;
        default:
          // Default to Q1 if start.first is not recognized
          month = 3;
      }
      day = 1; // Quarter start day is always 1st
      startDate = new Date(startYear, month - 1, day).toISOString(); // Month is 0-indexed in JavaScript Date object
    }
  
    // End date is set to 31st December of end year
    endDate = new Date(endYear, 11, 31).toISOString();
  
    return { startDate, endDate };
  }
  