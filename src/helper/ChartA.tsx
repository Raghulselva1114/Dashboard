import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, ChartDataset } from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import { FaFileExcel, FaDownload } from "react-icons/fa";

const ChartA: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const labels = [
    "2014-15",
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
    "2022-23",
    "2023-24",
    "2024-25",
  ];

  const datasets: ChartDataset[] = [
    {
      label: "Wind Power",
      data: [2311.77, 3423.05, 5502.37, 1865.23, 1480.97, 2117.79, 1503.3, 1110.53, 2275.55, 3253.38, 2702.05],
      backgroundColor: "blue",
    },
    {
      label: "Solar Power",
      data: [1171.62, 3130.36, 5658.63, 9563.69, 6750.97, 6510.06, 5628.8, 12760.5, 12783.8, 15033.24, 20752.41],
      backgroundColor: "orange",
    },
    {
      label: "Small Hydro Power",
      data: [251.68, 218.11, 106.38, 105.95, 107.34, 90.01, 103.65, 62.09, 95.4, 58.95, 97.3],
      backgroundColor: "green",
    },
    {
      label: "Biomass (Bagasse) Cogeneration",
      data: [295.67, 304.85, 161.95, 519.1, 402.7, 97, 173.37, 59.69, 0.0, 0.0, 387.76],
      backgroundColor: "red",
    },
    {
      label: "Biomass (Non-bagasse) Cogeneration",
      data: [60.05, 59.24, 2.2, 9.5, 12, 0.0, 97.24, 0.0, 42.4, 107.34, 0.0],
      backgroundColor: "purple",
    },
    {
      label: "Waste to Power",
      data: [0.0, 0.0, 23.5, 24.22, 0.0, 9.34, 21, 54.5, 25, 1.6, 59.6],
      backgroundColor: "brown",
    },
    {
      label: "Waste to Energy (Off-grid)",
      data: [9.71, 5.69, 11.77, 5.55, 6.58, 19.11, 20.75, 34.66, 52.28, 30.17, 65.89],
      backgroundColor: "cyan",
    },
  ];

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: "bar",
      data: { labels: labels, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "top" } },
        scales: {
          x: { stacked: true, title: { display: true, text: "Year" } },
          y: { stacked: true, title: { display: true, text: "Cumulative Achievements" }, beginAtZero: true },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  const downloadPNG = () => {
    if (chartInstance.current) {
      const link = document.createElement("a");
      link.href = chartInstance.current.toBase64Image();
      link.download = "energy_chart.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadExcel = () => {
    const data = datasets.map((dataset) => {
      const row: any = { Name: dataset.label };
      labels.forEach((label, i) => {
        row[label] = dataset.data[i];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Energy Data");
    XLSX.writeFile(workbook, "full_energy_data.xlsx");
  };

  return (
    <div className="container mt-4 position-relative">
      <div className="p-3 mb-5">
        <div className="card-body">
          <h5 className="card-title text-center">Energy Sector Growth (2014-2025)</h5>
          <div className="chart-container" style={{ width: "100%", height: "500px" }}>
            <canvas ref={chartRef} />
          </div>
          <div className="position-absolute top-0 end-0 p-3 d-flex align-items-center">
            <FaDownload
              className="text-primary mx-2"
              size={20}
              onClick={downloadPNG}
              style={{ cursor: "pointer" }}
            />
            <FaFileExcel
              className="text-success mx-2"
              size={20}
              onClick={downloadExcel}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="position-absolute -bottom-5 end-0 p-3 text-muted" style={{ fontSize: "0.8rem" }}>
            Data Source: Ministry of New and Renewable Energy
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartA;
