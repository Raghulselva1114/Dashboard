import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FaDownload, FaFileExcel } from "react-icons/fa";
import { Maximize } from "lucide-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ChartB = () => {
  const chartRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const chartInstances = useRef<Chart[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const chartData = [
    {
      title: "Estimated Reserves of Crude Oil in India (2024)",
      reserves: "Total Estimated reserves = 671.40 Million Tonnes",
      labels: [
        "Andhra Pradesh(1%)", "Assam(22%)", "Gujarat(18%)", "Rajasthan(19%)",
        "Tamil Nadu(1%)", "Eastern Offshore(6%)", "Western Offshore(32%)", "Others(1%)"
      ],
      data: [1, 22, 18, 19, 1, 6, 32, 1],
      colors: ["#8B0000", "#FF4500", "#DAA520", "#D2691E", "#4682B4", "#2E8B57", "#556B2F", "#A9A9A9"]
    },
    {
      title: "Estimated Reserves of Natural Gas in India (2024)",
      reserves: "Total Estimated reserves = 1094.19 BCM",
      labels: [
        "Andhra Pradesh(6%)", "Assam(15%)", "Gujarat(5%)", "Rajasthan(6%)",
        "Tamil Nadu(3%)", "Tripura(3%)", "West Bengal (CBM)(4%)",
        "Madhya Pradesh (CBM)(2%)", "Eastern Offshore(24%)", "Western Offshore(31%)", "Others(1%)"
      ],
      data: [6, 15, 5, 6, 3, 3, 4, 2, 24, 31, 1],
      colors: ["#8B0000", "#FF4500", "#DAA520", "#D2691E", "#4682B4", "#32CD32", "#8A2BE2", "#FF69B4", "#2E8B57", "#556B2F", "#A9A9A9"]
    },
    {
      title: "Estimated Reserves of Coal in India (2024)",
      reserves: "Total Estimated reserves = 389.42 Billion Tonnes",
      labels: ["Proved (55%)", "Indicated (38%)", "Inferred (7%)"],
      data: [55, 38, 7],
      colors: ["#2E5A87", "#7CDDDD", "#4A9DCB"]
    },
    {
      title: "Estimated Reserves of Lignite in India (2024)",
      reserves: "Total Estimated reserves = 47.30 Billion Tonnes",
      labels: ["Proved (17%)", "Indicated (53%)", "Inferred (30%)"],
      data: [17, 53, 30],
      colors: ["#22D3EE", "#B2F3FE", "#0E768F"]
    }
  ];

  useEffect(() => {
    chartData.forEach((chart, index) => {
      const canvas = chartRefs.current[index];
      if (canvas) {
        if (chartInstances.current[index]) {
          chartInstances.current[index].destroy();
        }
        const ctx = canvas.getContext("2d");
        if (ctx) {
          chartInstances.current[index] = new Chart(ctx, {
            type: "pie",
            data: {
              labels: chart.labels,
              datasets: [{ data: chart.data, backgroundColor: chart.colors }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: chart.title,
                  font: { size: 16 }
                }
              }
            }
          });
        }
      }
    });
  }, []);

  const enterFullscreen = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if ((ref.current as any).webkitRequestFullscreen) {
        (ref.current as any).webkitRequestFullscreen();
      } else if ((ref.current as any).mozRequestFullScreen) {
        (ref.current as any).mozRequestFullScreen();
      } else if ((ref.current as any).msRequestFullscreen) {
        (ref.current as any).msRequestFullscreen();
      }
    }
  };

  const downloadExcel = (index: number) => {
    const data = chartData[index].labels.map((label, i) => ({
      Type: label,
      Value: chartData[index].data[i]
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Chart_${index + 1}`);
    XLSX.writeFile(workbook, `chart_${index + 1}.xlsx`);
  };

  const downloadPNG = (index: number) => {
    const canvas = chartRefs.current[index];
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${chartData[index].title}.png`);
        }
      });
    }
  };

  const renderChart = (chart: any, index: number) => (
    <div
      key={index}
      ref={(el) => (containerRefs.current[index] = el)}
      className="relative rounded-2xl shadow-lg bg-white dark:bg-gray-900 p-4 transition-all h-[450px] w-full"
    >
      {/* Bottom-left fullscreen button */}
      <div className="absolute bottom-2 left-2 z-10">
        <Maximize
          size={20}
          className="cursor-pointer text-gray-600 hover:text-black"
          onClick={() => enterFullscreen({ current: containerRefs.current[index] })}
        />
      </div>

      {/* Top-right export buttons */}
      <div
        className="absolute top-4 right-4 flex gap-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <FaDownload className="text-blue-600 cursor-pointer" onClick={() => downloadPNG(index)} />
        <FaFileExcel className="text-green-600 cursor-pointer" onClick={() => downloadExcel(index)} />
      </div>

      <h5 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-2">{chart.title}</h5>
      <p className="text-sm text-center text-gray-500 dark:text-gray-300 mb-2">{chart.reserves}</p>

      <div className="h-[360px]">
        <canvas ref={(el) => (chartRefs.current[index] = el)} />
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Estimated Energy Reserves in India (2024)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartData.map((chart, index) => renderChart(chart, index))}
      </div>
    </div>
  );
};

export default ChartB;
