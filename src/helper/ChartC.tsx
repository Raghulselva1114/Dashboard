import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import * as XLSX from "xlsx";
import { FileSpreadsheet, ImageDown, Maximize } from "lucide-react";

const CombinedChart = () => {
  const chartRefC = useRef<HTMLCanvasElement | null>(null);
  const chartRefD = useRef<HTMLCanvasElement | null>(null);
  const chartRefE = useRef<HTMLCanvasElement | null>(null);
  const chartRefF = useRef<HTMLCanvasElement | null>(null);

  const containerRefC = useRef<HTMLDivElement | null>(null);
  const containerRefD = useRef<HTMLDivElement | null>(null);
  const containerRefE = useRef<HTMLDivElement | null>(null);
  const containerRefF = useRef<HTMLDivElement | null>(null);

  const chartInstanceC = useRef<Chart | null>(null);
  const chartInstanceD = useRef<Chart | null>(null);
  const chartInstanceE = useRef<Chart | null>(null);
  const chartInstanceF = useRef<Chart | null>(null);

  const chartCData = {
    labels: ["Chhattisgarh", "Jharkhand", "Odisha", "Maharashtra", "Others"],
    values: [113.97, 56.82, 51, 26.14, 9.86],
  };

  const chartDData = {
    labels: ["IOC", "BPCL", "HPCL", "CPCL", "NRL", "MRPL", "ONGC", "RIL Jamnagar", "RIL SEZ", "Nyara", "HMEL"],
    series1: [95, 103, 101, 106, 99, 100, 101, 95, 79, 91, 106],
    series2: [99, 104, 104, 105, 103, 99, 95, 98, 75, 96, 106],
  };

  const chartEData = {
    labels: [
      "31.03.2015", "31.03.2016", "31.03.2017", "31.03.2018", "31.03.2019",
      "31.03.2020", "31.03.2021", "31.03.2022", "31.03.2023", "31.03.2024(P)"
    ],
    utilities: [277740, 298059, 313395, 330860, 351423, 370106, 382211, 398583, 413389, 437924],
    nonUtilities: [40709, 42835, 44604, 45308, 66134, 67735, 70050, 70238, 70254, 70263],
    total: [318449, 340894, 358999, 376168, 417557, 437841, 452261, 468821, 483643, 508187],
  };

  const chartFData = {
    labels: chartEData.labels,
    datasets: [
      {
        label: "Thermal",
        data: [70, 68, 66, 65, 65, 64, 63, 62, 61, 60],
        backgroundColor: "#ADD8E6",
        stack: "stack1",
      },
      {
        label: "Hydro",
        data: [12, 12, 13, 13, 12, 12, 11, 11, 11, 10],
        backgroundColor: "#E07A5F",
        stack: "stack1",
      },
      {
        label: "Nuclear",
        data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        backgroundColor: "#9EBC73",
        stack: "stack1",
      },
      {
        label: "RES*",
        data: [15, 17, 18, 19, 20, 21, 23, 24, 25, 27],
        backgroundColor: "#D4A76A",
        stack: "stack1",
      },
    ],
  };

  const exportToExcel = (chartType: "C" | "D" | "E" | "F") => {
    let data;
    if (chartType === "C") {
      data = chartCData.labels.map((label, i) => ({
        State: label,
        "Installed Capacity (MTY)": chartCData.values[i],
      }));
    } else if (chartType === "D") {
      data = chartDData.labels.map((label, i) => ({
        Refinery: label,
        "2022-23": chartDData.series1[i],
        "2023-24(P)": chartDData.series2[i],
      }));
    } else if (chartType === "E") {
      data = chartEData.labels.map((label, i) => ({
        Date: label,
        Utilities: chartEData.utilities[i],
        "Non-Utilities": chartEData.nonUtilities[i],
        "Total Capacity": chartEData.total[i],
      }));
    } else {
      data = chartFData.labels.map((label, i) => ({
        Date: label,
        Thermal: chartFData.datasets[0].data[i],
        Hydro: chartFData.datasets[1].data[i],
        Nuclear: chartFData.datasets[2].data[i],
        "RES*": chartFData.datasets[3].data[i],
      }));
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ChartData");
    XLSX.writeFile(wb, `Chart${chartType}_Data.xlsx`);
  };

  const downloadChartImage = (chartType: "C" | "D" | "E" | "F") => {
    const chartCanvas =
      chartType === "C" ? chartRefC.current :
      chartType === "D" ? chartRefD.current :
      chartType === "E" ? chartRefE.current : chartRefF.current;

    if (chartCanvas) {
      const url = chartCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `Chart${chartType}.png`;
      link.click();
    }
  };

  const enterFullscreen = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const initChart = (ctx: CanvasRenderingContext2D, config: any, instanceRef: React.MutableRefObject<Chart | null>) => {
      if (instanceRef.current) instanceRef.current.destroy();
      instanceRef.current = new Chart(ctx, config);
    };

    if (chartRefC.current) {
      initChart(chartRefC.current.getContext("2d")!, {
        type: "bar",
        data: {
          labels: chartCData.labels,
          datasets: [{
            label: "Installed Capacity (MTY)",
            data: chartCData.values,
            backgroundColor: ["#4B9CD3", "#FFD700", "#FF7F50", "#90EE90", "#9370DB"],
            borderColor: ["#1E6091", "#DAA520", "#FF6347", "#2E8B57", "#6A5ACD"],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "State-wise Installed Capacity of Coal Washeries (MTY)",
              font: { size: 16 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Capacity (MTY)" },
            },
          },
        },
      }, chartInstanceC);
    }

    if (chartRefD.current) {
      initChart(chartRefD.current.getContext("2d")!, {
        type: "bar",
        data: {
          labels: chartDData.labels,
          datasets: [
            { label: "2022-23", data: chartDData.series1, backgroundColor: "#87CEFA" },
            { label: "2023-24(P)", data: chartDData.series2, backgroundColor: "#FF7F50" },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Refinery-wise Capacity Utilisation (in %)",
              font: { size: 16 },
            },
            legend: { position: "bottom" },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 110,
              title: { display: true, text: "Utilisation (%)" },
            },
          },
        },
      }, chartInstanceD);
    }

    if (chartRefE.current) {
      initChart(chartRefE.current.getContext("2d")!, {
        type: "line",
        data: {
          labels: chartEData.labels,
          datasets: [
            { label: "Utilities", data: chartEData.utilities, borderColor: "#D2691E", backgroundColor: "#D2691E", tension: 0.4, fill: false },
            { label: "Non-Utilities", data: chartEData.nonUtilities, borderColor: "#87CEFA", backgroundColor: "#87CEFA", tension: 0.4, fill: false },
            { label: "Grand Total", data: chartEData.total, borderColor: "#90EE90", backgroundColor: "#90EE90", tension: 0.4, fill: false },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Trends in Installed Electricity Generation Capacity (MW) in India",
              font: { size: 16 },
            },
            legend: { position: "bottom" },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: { display: true, text: "Capacity (MW)" },
            },
          },
        },
      }, chartInstanceE);
    }

    if (chartRefF.current) {
      initChart(chartRefF.current.getContext("2d")!, {
        type: "bar",
        data: chartFData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Installed Electricity Generation Capacity from Utilities (%) - Sourcewise",
              font: { size: 16 },
            },
            legend: { position: "bottom" },
          },
          scales: {
            x: { stacked: true },
            y: {
              stacked: true,
              max: 100,
              ticks: { callback: (value) => `${value}%` },
              title: { display: true, text: "Percentage (%)" },
            },
          },
        },
      }, chartInstanceF);
    }
  }, []);

  const ChartBlock = ({ title, canvasRef, containerRef, chartType, note }: {
    title: string;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    chartType: "C" | "D" | "E" | "F";
    note?: string;
  }) => (
    <div ref={containerRef} className="relative w-full h-[450px] p-4 shadow-lg rounded bg-white">
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <FileSpreadsheet size={20} className="cursor-pointer text-green-600 hover:text-green-800" onClick={() => exportToExcel(chartType)} />
        <ImageDown size={20} className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => downloadChartImage(chartType)} />
      </div>
      <div className="absolute bottom-2 left-2 z-10">
        <Maximize size={20} className="cursor-pointer text-gray-600 hover:text-black" onClick={() => enterFullscreen(containerRef)} />
      </div>
      <div className="h-[360px]">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="mt-2 flex justify-between text-gray-500">
  {note ? (
    <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>{note}</span>
  ) : (
    <span></span>
  )}
  <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>DataSource: Ministry of statistics</span>
</div>


    </div>
  );
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Installed Capacity and Capacity Utilization
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartBlock title="Coal Washeries" canvasRef={chartRefC} containerRef={containerRefC} chartType="C" note="Others include UP, WB, MP, and Telangana." />
        <ChartBlock title="Refinery Utilisation" canvasRef={chartRefD} containerRef={containerRefD} chartType="D" />
        <ChartBlock title="Electricity Generation Trend" canvasRef={chartRefE} containerRef={containerRefE} chartType="E" />
        <ChartBlock title="Sourcewise Share (%)" canvasRef={chartRefF} containerRef={containerRefF} chartType="F" />
      </div>
    </div>
  );
  
};

export default CombinedChart; 
