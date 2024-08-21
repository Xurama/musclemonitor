import React, { useState } from "react";
import { months } from "../../types/month"; // Créez un fichier utils pour les mois
import MonthDetails from "../MonthDetails"; // Un autre composant pour afficher les détails du mois

interface MonthlyStatsProps {
  year: number;
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ year }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <div>
      <h3>Monthly Statistics for {year}</h3>
      <div>
        {months.map((month, index) => (
          <button
            key={index}
            onClick={() => setSelectedMonth(index)}
            style={{
              backgroundColor: selectedMonth === index ? "#61dafb" : "#282c34",
              color: selectedMonth === index ? "#282c34" : "white",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {month}
          </button>
        ))}
      </div>
      {selectedMonth !== null && <MonthDetails year={year} month={selectedMonth} />}
    </div>
  );
};

export default MonthlyStats;
