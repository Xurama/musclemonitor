import React, { useState } from "react";
import MonthlyStats from "../MonthlyStats";

const YearlyStats: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = [2023, 2024]; // Vous pouvez dynamiser cela en fonction des données disponibles

  return (
    <div>
      <h2>Yearly Statistics</h2>
      <div>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            style={{
              backgroundColor: selectedYear === year ? "#61dafb" : "#282c34",
              color: selectedYear === year ? "#282c34" : "white",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {year}
          </button>
        ))}
      </div>
      {selectedYear && <MonthlyStats year={selectedYear} />}
    </div>
  );
};

export default YearlyStats;
