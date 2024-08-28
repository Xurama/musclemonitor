import React, { useState } from "react";
import MonthlyStats from "../MonthlyStats";
import { StatsContainer, Button, Title, Select } from "./styles";

const YearlyStats: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = [2023, 2024];

  return (
    <StatsContainer>
      <Title>Yearly Statistics</Title>
      <div>
        {window.innerWidth > 768 ? (
          years.map((year) => (
            <Button
              key={year}
              isSelected={selectedYear === year}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))
        ) : (
          <Select
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            value={selectedYear || ""}
          >
            <option value="" disabled>
              Select Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        )}
      </div>
      {selectedYear && <MonthlyStats year={selectedYear} />}
    </StatsContainer>
  );
};

export default YearlyStats;
