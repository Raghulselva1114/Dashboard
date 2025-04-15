import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download, FileSpreadsheet, Maximize2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

// ---------- Shared Styles ----------
const containerStyle = "relative w-full md:w-[48%] bg-white shadow-md rounded-xl p-4 mb-6";
const titleStyle = "text-lg font-semibold mb-4 text-center";
const iconTopRightStyle = "absolute top-4 right-4 flex gap-2";
const fullscreenIconStyle = "absolute bottom-4 left-4";

// ---------- Export Helpers ----------
const exportChartAsImage = (ref: any, name: string) => {
  const chart = ref.current;
  if (chart) {
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.png`;
    link.click();
  }
};

const exportDataAsExcel = (labels: string[], data: number[], label: string, fileName: string) => {
  const wsData = [["Year", label], ...labels.map((year, i) => [year, data[i]])];
  const worksheet = XLSX.utils.aoa_to_sheet(wsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${fileName}.xlsx`);
};

const enterFullscreen = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current && ref.current.requestFullscreen) {
    ref.current.requestFullscreen();
  }
};

// ---------- Common Labels ----------
const years = [
  "2014-15", "2015-16", "2016-17", "2017-18", "2018-19",
  "2019-20", "2020-21", "2021-22", "2022-23", "2023-24(P)",
];

const productionData = [609.18, 639.23, 657.87, 675.40, 728.72, 730.87, 716.08, 778.21, 893.19, 997.83];
const importData = [217.78, 203.95, 190.95, 208.25, 235.35, 248.54, 215.25, 208.63, 237.67, 264.53];

const coalLigniteYears = ["2014-15", "2016-17", "2018-19", "2020-21", "2022-23"];
const coalData = [821.85, 896.06, 967.16, 1025.68, 1236.48];
const ligniteData = [46.95, 46.32, 45.76, 49.08, 42.64];

const crudeOilData = [
  226.90, 239.79, 249.94, 256.12, 260.70,
  259.12, 226.95, 242.07, 261.88, 263.62,
];

const petroleumData = [179, 201, 214, 223, 235, 241, 220, 231, 250, 262];
const petroleumColors = [
  "#2196F3", "#4CAF50", "#FF9800", "#9C27B0", "#F44336",
  "#3F51B5", "#009688", "#FF5722", "#00BCD4", "#8BC34A",
];

const naturalGasData = [51.30, 52.51, 55.70, 59.17, 60.79, 64.14, 60.82, 64.14, 59.95, 67.47];
const electricityData = [10.54, 11.04, 11.63, 12.33, 13.08, 13.23, 13.14, 14.14, 15.36, 16.47];

// ---------- Chart Options ----------
const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: { color: "#333", font: { size: 14 } },
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  interaction: {
    mode: "nearest" as const,
    axis: "x" as const,
    intersect: false,
  },
  scales: {
    x: {
      ticks: { color: "#333" },
      grid: { display: false },
    },
    y: {
      title: {
        display: true,
        text: "Million Tonnes",
        color: "#333",
        font: { size: 14 },
      },
      ticks: { color: "#333" },
      grid: { color: "#e0e0e0" },
    },
  },
};

// ---------- Main Component ----------
const AllEnergyCharts = () => {
  const refs = {
    coal: useRef<any>(null),
    lignite: useRef<any>(null),
    crude: useRef<any>(null),
    petroleum: useRef<any>(null),
    gas: useRef<any>(null),
    electricity: useRef<any>(null),
  };

  const wrappers = {
    coal: useRef<HTMLDivElement>(null),
    lignite: useRef<HTMLDivElement>(null),
    crude: useRef<HTMLDivElement>(null),
    petroleum: useRef<HTMLDivElement>(null),
    gas: useRef<HTMLDivElement>(null),
    electricity: useRef<HTMLDivElement>(null),
  };

  const renderTopRightIcons = (refKey: keyof typeof refs, fileName: string, label: string, labels: string[], data: number[]) => (
    <div className={iconTopRightStyle}>
      <Download className="cursor-pointer" onClick={() => exportChartAsImage(refs[refKey], fileName)} />
      <FileSpreadsheet className="cursor-pointer" onClick={() => exportDataAsExcel(labels, data, label, fileName)} />
    </div>
  );

  const renderFullscreenIcon = (refKey: keyof typeof wrappers) => (
    <Maximize2 className={`${fullscreenIconStyle} cursor-pointer`} onClick={() => enterFullscreen(wrappers[refKey])} />
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Availability of Energy Resources</h2>

      {/* Row 1 */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Coal */}
        <div className={containerStyle} ref={wrappers.coal}>
          {renderTopRightIcons("coal", "Coal_Production_Import", "Coal Production", years, productionData)}
          {renderFullscreenIcon("coal")}
          <h2 className={titleStyle}>Trend of Production and Import of Coal in India</h2>
          <Line
            ref={refs.coal}
            data={{
              labels: years,
              datasets: [
                {
                  label: "Production",
                  data: productionData,
                  fill: true,
                  backgroundColor: "rgba(0, 123, 255, 0.2)",
                  borderColor: "rgba(0, 123, 255, 1)",
                  tension: 0.3,
                },
                {
                  label: "Imports",
                  data: importData,
                  fill: true,
                  backgroundColor: "rgba(40, 167, 69, 0.2)",
                  borderColor: "rgba(40, 167, 69, 1)",
                  tension: 0.3,
                },
              ],
            }}
            options={defaultOptions}
          />
        </div>

        {/* Coal & Lignite */}
        <div className={containerStyle} ref={wrappers.lignite}>
          {renderTopRightIcons("lignite", "Coal_Lignite", "Coal", coalLigniteYears, coalData)}
          {renderFullscreenIcon("lignite")}
          <h2 className={titleStyle}>Availability of Coal and Lignite in India</h2>
          <Bar
            ref={refs.lignite}
            data={{
              labels: coalLigniteYears,
              datasets: [
                { label: "Coal", data: coalData, backgroundColor: "#8ecae6", borderRadius: 4 },
                { label: "Lignite", data: ligniteData, backgroundColor: "#f4a261", borderRadius: 4 },
              ],
            }}
            options={{
              ...defaultOptions,
              indexAxis: "y" as const,
              scales: {
                x: {
                  stacked: true,
                  title: { display: true, text: "Million Tonnes", color: "#333", font: { size: 14 } },
                  ticks: { color: "#333" },
                  grid: { color: "#e0e0e0" },
                },
                y: {
                  stacked: true,
                  ticks: { color: "#333" },
                  grid: { display: false },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Crude Oil */}
        <div className={containerStyle} ref={wrappers.crude}>
          {renderTopRightIcons("crude", "Crude_Oil", "Crude Oil", years, crudeOilData)}
          {renderFullscreenIcon("crude")}
          <h2 className={titleStyle}>Availability of Crude Oil in India (2014–2024)</h2>
          <Line
            ref={refs.crude}
            data={{
              labels: years,
              datasets: [
                {
                  label: "Crude Oil Availability",
                  data: crudeOilData,
                  fill: false,
                  borderColor: "#90caf9",
                  backgroundColor: "#90caf9",
                  pointRadius: 5,
                  tension: 0.3,
                },
              ],
            }}
            options={{
              ...defaultOptions,
              plugins: { legend: { display: false } },
              scales: {
                ...defaultOptions.scales,
                y: { ...defaultOptions.scales.y, min: 200, max: 270 },
              },
            }}
          />
        </div>

        {/* Petroleum Products */}
        <div className={containerStyle} ref={wrappers.petroleum}>
          {renderTopRightIcons("petroleum", "Petroleum_Products", "Petroleum", years, petroleumData)}
          {renderFullscreenIcon("petroleum")}
          <h2 className={titleStyle}>Availability of Petroleum Products in India (2014–2024)</h2>
          <Bar
            ref={refs.petroleum}
            data={{
              labels: years,
              datasets: [{ label: "Petroleum", data: petroleumData, backgroundColor: petroleumColors, borderRadius: 5 }],
            }}
            options={{
              ...defaultOptions,
              plugins: { legend: { display: false } },
              scales: {
                ...defaultOptions.scales,
                y: { ...defaultOptions.scales.y, min: 0, max: 300 },
              },
            }}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Natural Gas */}
        <div className={containerStyle} ref={wrappers.gas}>
          {renderTopRightIcons("gas", "Natural_Gas", "Natural Gas", years, naturalGasData)}
          {renderFullscreenIcon("gas")}
          <h2 className={titleStyle}>Availability of Natural Gas in India (2014–2024)</h2>
          <Bar
            ref={refs.gas}
            data={{
              labels: years,
              datasets: [{ label: "Natural Gas", data: naturalGasData, backgroundColor: "rgba(100, 149, 237, 0.8)", borderRadius: 6 }],
            }}
            options={{
              ...defaultOptions,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  suggestedMax: 80,
                  title: { display: true, text: "BCM", color: "#333", font: { size: 14 } },
                  ticks: { color: "#333", stepSize: 10 },
                  grid: { color: "#e0e0e0" },
                },
                x: {
                  ticks: { color: "#333" },
                  grid: { display: false },
                },
              },
            }}
          />
        </div>

        {/* Electricity */}
        <div className={containerStyle} ref={wrappers.electricity}>
          {renderTopRightIcons("electricity", "Electricity", "Electricity", years, electricityData)}
          {renderFullscreenIcon("electricity")}
          <h2 className={titleStyle}>Net Availability of Electricity in India (2014–2024)</h2>
          <Line
            ref={refs.electricity}
            data={{
              labels: years,
              datasets: [
                {
                  label: "Electricity (×100000 GWh)",
                  data: electricityData,
                  borderColor: "rgba(30, 144, 255, 0.9)",
                  backgroundColor: "rgba(30, 144, 255, 0.2)",
                  fill: true,
                  tension: 0.4,
                  pointRadius: 5,
                },
              ],
            }}
            options={{
              ...defaultOptions,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx: any) => `${ctx.parsed.y} ×100000 GWh`,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: false,
                  suggestedMax: 18,
                  title: { display: true, text: "GWh ×100000", color: "#333", font: { size: 14 } },
                  ticks: { color: "#333", stepSize: 1 },
                  grid: { color: "#e0e0e0" },
                },
                x: {
                  ticks: { color: "#333", font: { size: 12 } },
                  grid: { display: false },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllEnergyCharts;
