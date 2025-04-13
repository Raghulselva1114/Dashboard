// File: CombinedEnergyCharts.tsx

import React, { useRef, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip as ReTooltip, CartesianGrid, LabelList,
  ResponsiveContainer, Legend,
} from 'recharts';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  Tooltip, Legend as ChartLegend, Title,
} from 'chart.js';
import { toPng } from 'html-to-image';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FileSpreadsheet, ImageDown, Expand } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, ChartLegend, Title);

// Chart Data
const gasData = [
  { year: '2014–15', value: 26.78 },
  { year: '2015–16', value: 25.3 },
  { year: '2016–17', value: 24.99 },
  { year: '2017–18', value: 25.92 },
  { year: '2018–19', value: 26.04 },
  { year: '2019–20', value: 24.2 },
  { year: '2020–21', value: 22.05 },
  { year: '2021–22', value: 27.35 },
  { year: '2022–23', value: 28.14 },
  { year: '2023–24(P)', value: 30.11 },
];

const labels = ['2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24(P)'];
const publicData = [567.03, 606.68, 625.2, 641.77, 695.74, 698.22, 685.95, 747.44, 853.86, 949.79];
const privateData = [42.15, 32.55, 32.67, 33.63, 32.98, 32.65, 30.13, 30.77, 39.33, 48.03];

const powerData = [
  { year: '2014-15', utilities: 11.17, nonUtilities: 1.62 },
  { year: '2015-16', utilities: 11.68, nonUtilities: 1.68 },
  { year: '2016-17', utilities: 12.35, nonUtilities: 1.72 },
  { year: '2017-18', utilities: 13.03, nonUtilities: 1.8 },
  { year: '2018-19', utilities: 13.72, nonUtilities: 2.13 },
  { year: '2019-20', utilities: 13.83, nonUtilities: 2.4 },
  { year: '2020-21', utilities: 13.73, nonUtilities: 2.25 },
  { year: '2021-22', utilities: 14.84, nonUtilities: 2.09 },
  { year: '2022-23', utilities: 16.18, nonUtilities: 2.12 },
  { year: '2023-24(P)', utilities: 17.34, nonUtilities: 2.15 },
];

const petroleumPieData = {
  labels: [
    'High Speed Diesel',
    'Motor Spirit (Petrol)',
    'SKO + LPG',
    'Aviation Turbine Fuel (ATF)',
    'Other Products',
  ],
  datasets: [
    {
      label: 'Production (MMT)',
      data: [104.67, 58.64, 28.46, 7.61, 31.41],
      backgroundColor: ['#1E88E5', '#D32F2F', '#388E3C', '#FBC02D', '#7B1FA2'],
    },
  ],
};

const coalChartData = {
  labels,
  datasets: [
    {
      label: 'Public',
      data: publicData,
      backgroundColor: '#90CAF9',
      borderRadius: 5,
    },
    {
      label: 'Private',
      data: privateData,
      backgroundColor: '#EF9A9A',
      borderRadius: 5,
    },
  ],
};

const coalChartOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { color: '#000', font: { size: 14 } },
    },
    title: {
      display: true,
      text: 'Share of Private and Public Sector in Production of Coal in India',
      font: { size: 18, weight: 'bold' },
      color: '#000',
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.raw} MT`,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: 'MILLION TONNES',
        font: { size: 14 },
        color: '#000',
      },
      ticks: { color: '#000' },
    },
    y: {
      stacked: true,
      ticks: { color: '#000' },
    },
  },
};

// Utility download handlers
const downloadExcel = (title: string, data: any[], keys: string[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data.map(item => {
    const obj: any = {};
    keys.forEach(k => obj[k] = item[k]);
    return obj;
  }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, `${title}.xlsx`);
};

const downloadPNG = async (ref: any, title: string) => {
  if (ref.current) {
    const blob = await toPng(ref.current);
    const link = document.createElement('a');
    link.download = `${title}.png`;
    link.href = blob;
    link.click();
  }
};

export default function CombinedEnergyCharts() {
  const gasRef = useRef(null);
  const coalRef = useRef(null);
  const powerRef = useRef(null);
  const petroleumRef = useRef(null);

  const [fullScreenRef, setFullScreenRef] = useState<null | React.RefObject<any>>(null);

  const IconGroup = ({ refElement, title, excelData, excelKeys }: any) => (
    <div className="absolute top-4 right-4 flex space-x-3 z-10">
      <FileSpreadsheet className="w-5 h-5 text-green-600 cursor-pointer" onClick={() => downloadExcel(title, excelData, excelKeys)} />
      <ImageDown className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => downloadPNG(refElement, title)} />
      <Expand className="w-5 h-5 text-gray-700 cursor-pointer" onClick={() => setFullScreenRef(refElement)} />
    </div>
  );

  const FullScreenModal = ({ refElement }: { refElement: React.RefObject<any> }) => (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6"
      onClick={() => setFullScreenRef(null)}
    >
      <div className="bg-white dark:bg-neutral-900 p-4 w-full max-w-5xl h-[90vh] overflow-auto rounded-xl shadow">
        {refElement.current && refElement.current.cloneNode && (
          <div dangerouslySetInnerHTML={{ __html: refElement.current.innerHTML }} />
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-12 bg-white dark:bg-neutral-950">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Production of Energy Resources in India
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Natural Gas */}
        <div ref={gasRef} className="relative rounded-xl p-4 bg-white dark:bg-neutral-900 shadow">
          <h2 className="text-lg font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
            Production Trend of Natural Gas in India
          </h2>
          <IconGroup
            refElement={gasRef}
            title="NaturalGas"
            excelData={gasData}
            excelKeys={['year', 'value']}
          />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={gasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" angle={-40} textAnchor="end" height={60} tick={{ fill: '#4B5563' }} />
              <YAxis label={{ value: 'BCM', angle: -90, position: 'insideLeft', fill: '#4B5563' }} tick={{ fill: '#4B5563' }} />
              <ReTooltip />
              <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={3} dot={{ r: 5, fill: '#a78bfa' }}>
                <LabelList dataKey="value" position="top" />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Coal */}
        <div ref={coalRef} className="relative rounded-xl p-4 bg-white dark:bg-neutral-900 shadow">
          <IconGroup
            refElement={coalRef}
            title="CoalProduction"
            excelData={labels.map((l, i) => ({ Year: l, Public: publicData[i], Private: privateData[i] }))}
            excelKeys={['Year', 'Public', 'Private']}
          />
          <Bar data={coalChartData} options={coalChartOptions} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Electricity */}
        <div ref={powerRef} className="relative rounded-xl p-4 bg-white dark:bg-neutral-900 shadow">
          <h2 className="text-lg font-semibold text-center mb-2 text-gray-800 dark:text-gray-100">
            Electricity Production by Utilities & Non-Utilities
          </h2>
          <IconGroup
            refElement={powerRef}
            title="Electricity"
            excelData={powerData}
            excelKeys={['year', 'utilities', 'nonUtilities']}
          />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={powerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" angle={-35} textAnchor="end" height={60} />
              <YAxis domain={[0, 20]} />
              <ReTooltip />
              <Legend />
              <Line type="monotone" dataKey="utilities" name="Utilities" stroke="#4f9fff" strokeWidth={3}>
                <LabelList dataKey="utilities" position="top" />
              </Line>
              <Line type="monotone" dataKey="nonUtilities" name="Non-Utilities" stroke="#ff9800" strokeWidth={3}>
                <LabelList dataKey="nonUtilities" position="top" />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Petroleum */}
        <div ref={petroleumRef} className="relative rounded-xl p-4 bg-white dark:bg-neutral-900 shadow">
          <IconGroup
            refElement={petroleumRef}
            title="PetroleumProducts"
            excelData={petroleumPieData.labels.map((l, i) => ({
              Product: l,
              Production: petroleumPieData.datasets[0].data[i],
            }))}
            excelKeys={['Product', 'Production']}
          />
          <Pie
            data={petroleumPieData}
            options={{
              plugins: {
                legend: { position: 'bottom', labels: { color: '#000' } },
                title: {
                  display: true,
                  text: 'Production of Petroleum Products (2023–24)',
                  font: { size: 18, weight: 'bold' },
                  color: '#000',
                },
              },
            }}
          />
          <div className="position-absolute bottom-0 end-0 p-3 text-muted" style={{ fontSize: "0.8rem" }}>
            Data Source: Energy Statistics India
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {fullScreenRef && <FullScreenModal refElement={fullScreenRef} />}
    </div>
  );
}
