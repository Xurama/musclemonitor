import React, { useState } from "react";
import { months } from "../../types/month";
import MonthDetails from "../MonthDetails";
import { StatsContainer, Button, Title, Select } from "./styles";

interface MonthlyStatsProps {
  year: number;
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ year }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value, 10);
    setSelectedMonth(month);
  };

  return (
    <StatsContainer>
      <Title>Monthly Statistics for {year}</Title>
      <div>
        {window.innerWidth > 768 ? (
          months.map((month, index) => (
            <Button
              key={index}
              isSelected={selectedMonth === index}
              onClick={() => setSelectedMonth(index)}
            >
              {month}
            </Button>
          ))
        ) : (
          <Select onChange={handleMonthChange} value={selectedMonth || ""}>
            <option value="" disabled>Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </Select>
        )}
      </div>
      {selectedMonth !== null && <MonthDetails year={year} month={selectedMonth} />}
    </StatsContainer>
  );
};

export default MonthlyStats;
