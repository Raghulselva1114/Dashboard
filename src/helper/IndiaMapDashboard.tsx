import React, { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import indiaGeoUrl from "../data/indiastates.json";
import { FileDown, ImageDown, Sun, Moon } from "lucide-react";

const renewableData: Record<string, Record<string, number>> = {
  "2014": {
    "Andaman and Nicobar Islands": 10.59,
    "Andhra Pradesh": 1626.42,
    "Arunachal Pradesh": 105.47,
    Assam: 35.53,
    Bihar: 174.56,
    Chandigarh: 295.53,
    Chhattisgarh: 2.81,
    "Dadra and Nagar Haveli and Daman and Diu": 0.00,
    Delhi: 5.67,
    Goa: 0.13,
    Gujarat: 4376.82,
    Haryana: 213.3,
    "Himachal Pradesh": 650.15,
    Jharkhand: 22.41,
    Karnataka: 4722.80,
    Kerala: 198.31,
    Lakshadweep: 1.92,
    "Madhya Pradesh": 944.24,
    Maharashtra: 6342.74,
    Manipur: 6.28,
    Meghalaya: 45.65,
    Mizoram: 37.2,
    Nagaland: 30.82,
    Orissa: 149.2,
    Puducherry: 0.09,
    Punjab: 480.86,
    Rajasthan: 3685.09,
    Sikkim: 53.81,
    "Tamil Nadu": 8400.70,
    Telangana: 3.41,
    Tripura: 18.94,
    "Uttaranchal": 2127.88,
    Uttarakhand: 307.44,
    "West Bengal": 426.4,
    "Jammu and Kashmir": 155.52
     
  },
  "2015": {
   "Andaman and Nicobar Islands": 10.59,
    "Andhra Pradesh": 2029.39,
    "Arunachal Pradesh": 106.48,
    Assam: 35.83,
    Bihar: 174.62,
    Chandigarh: 5.31,
    Chhattisgarh: 299.53,
    "Dadra and Nagar Haveli and Daman and Diu": 0.00,
    Delhi: 6.23,
    Goa: 0.16,
    Gujarat: 4663.39,
    Haryana: 249.14,
    HimachalPradesh: 735.98,
    Jharkhand: 25.51,
    Karnataka: 5223.71,
    Kerala: 209.83,
    Lakshadweep: 1.92,
    MadhyaPradesh: 1612.48,
    Maharashtra: 7028.38,
    Manipur: 6.63,
    Meghalaya: 45.90,
    Mizoram: 37.90,
    Nagaland: 38.82,
    Odisha: 155.94,
    Puducherry: 0.13,
    Punjab: 660.44,
    Rajasthan: 4452.57,
    Sikkim: 53.92,
    "Tamil Nadu": 8661.03,
    Telangana: 66.49,
    Tripura: 23.94,
    "Uttar Pradesh": 2203.25,
    Uttarakhand: 347.36,
    "West Bengal": 429.64,
    Others: 190.24,
  },
  "2016": {
    "Andaman and Nicobar Islands": 10.59,
    "Andhra Pradesh": 2801.31,
    "Arunachal Pradesh": 106.79,
    Assam: 36.25,
    Bihar: 194.04,
    Chandigarh:  7.62,
    Chhattisgarh: 402.66,
    "Dadra and Nagar Haveli and Daman and Diu": 0.00,
    Delhi: 15.74,
    Goa: 0.17,
    Gujarat: 5181.96,
    Haryana: 280.38,
    HimachalPradesh: 805.58,
    Jharkhand: 28.76,
    Karnataka: 5673.07,
    Kerala: 5673.07,
    Lakshadweep: 3.02,
    MadhyaPradesh: 3119.98,
    Maharashtra: 7404.61,
    Manipur: 7.06,
    Meghalaya: 46.36,
    Mizoram: 38.34,
    Nagaland: 32.23,
    Odisha: 194.01,
    Puducherry: 0.21,
    Punjab: 895.08,
    Rajasthan:5483.93,
    Sikkim: 53.98,
    "Tamil Nadu": 9753.57,
    Telangana: 772.19,
    Tripura: 23.96,
    "Uttar Pradesh": 2349.29,
    Uttarakhand:395.49,
    "West Bengal":438.82,
    Others: 96.14,
  },
  "2017": {
    "Andaman and Nicobar Islands": 12.05,
    "Andhra Pradesh": 12.05,
    "Arunachal Pradesh": 106.82,
    Assam: 48.03,
    Bihar: 309.70,
    Chandigarh: 18.13,
    Chhattisgarh: 484.74,
    "Dadra and Nagar Haveli and Daman and Diu": 2.97,
    Delhi: 57.73,
    Goa: 0.88,
    Gujarat: 6715.40,
    Haryana: 348.02,
    HimachalPradesh: 846.47,
    Jharkhand: 41.61,
    Karnataka: 7500.26,
    Kerala: 357.87,
    Lakshadweep: 2.98,
    MadhyaPradesh: 3562.14,
    Maharashtra: 7697.03,
    Manipur: 7.13,
    Meghalaya: 46.37,
    Mizoram: 44.02,
    Nagaland: 33.01,
    Odisha: 217.17,
    Puducherry: 0.26,
    Punjab: 1286.36,
    Rajasthan: 6338.69,
    Sikkim: 53.98,
    "Tamil Nadu": 10639.70,
    Telangana: 1556.44,
    Tripura: 24.32,
    "Uttar Pradesh": 2558.82,
    Uttarakhand: 590.48,
    "West Bengal": 458.28,
    Others: 99.79,
  },
  "2018": {
    "Andaman and Nicobar Islands": 12.05,
    "Andhra Pradesh": 6910.58,
    "Arunachal Pradesh": 112.00,
    Assam: 53.39,
    Bihar: 346.18,
    Chandigarh: 26.01,
    Chhattisgarh: 665.42,
    "Dadra and Nagar Haveli and Daman and Diu": 5.46,
    Delhi: 123.03,
    Goa: 1.08,
    Gujarat: 7349.45,
    Haryana: 510.49,
    HimachalPradesh: 869.28,
    Jharkhand: 46.94,
    Karnataka: 12584.19,
    Kerala: 400.56,
    Lakshadweep: 3.14,
    MadhyaPradesh: 4050.13,
    Maharashtra: 8632.21,
    Manipur: 10.28,
    Meghalaya: 46.85,
    Mizoram: 40.16,
    Nagaland: 33.51,
    Odisha: 222.69,
    Puducherry: 0.34,
    Punjab: 1420.68,
    Rajasthan: 6878.36,
    Sikkim: 53.98,
    "Tamil Nadu": 11248.52,
    Telangana: 3671.88,
    Tripura: 24.53,
    "Uttar Pradesh": 2945.65,
    Uttarakhand: 623.48,
    "West Bengal": 469.46,
    Others: 47.66,
  },
  "2019": {
    "Andaman and Nicobar Islands": 17.22,
    "Andhra Pradesh": 7950.02,
    "Arunachal Pradesh": 140.69,
    Assam: 64.58,
    Bihar: 352.23,
    Chandigarh: 35.52,
    Chhattisgarh: 730.77,
    "Dadra and Nagar Haveli and Daman and Diu": 5.46,
    Delhi: 180.35,
    Goa: 4.09,
    Gujarat: 8707.72,
    Haryana: 519.11,
    HimachalPradesh: 898.73,
    Jharkhand: 57.87,
    Karnataka: 13880.20,
    Kerala: 434.21,
    Lakshadweep: 3.14,
    MadhyaPradesh: 4629.87,
    Maharashtra: 9374.69,
    Manipur: 13.66,
    Meghalaya: 50.18,
    Mizoram: 41.20,
    Nagaland: 33.51,
    Odisha: 539.43,
    Puducherry: 3.32,
    Punjab: 1426.08,
    Rajasthan: 7812.73,
    Sikkim: 53.99,
    "Tamil Nadu": 12731.19,
    Telangana: 4000.36,
    Tripura: 24.53,
    "Uttar Pradesh": 3237.86,
    Uttarakhand: 670.53,
    "West Bengal": 508.09,
    Others: 49.31,
  },
  "2020": {
    "Andaman and Nicobar Islands": 17.68,
    "Andhra Pradesh": 8481.43,
    "Arunachal Pradesh": 140.98,
    Assam: 83.86,
    Bihar: 365.09,
    Chandigarh: 41.36,
    Chhattisgarh: 744.89,
    "Dadra and Nagar Haveli and Daman and Diu": 5.46,
    Delhi: 218.62,
    Goa: 5.29,
    Gujarat: 10693.77,
    Haryana: 547.19,
    HimachalPradesh: 959.89,
    Jharkhand: 63.80,
    Karnataka: 15273.93,
    Kerala: 447.85,
    Lakshadweep: 3.27,
    MadhyaPradesh: 5050.75,
    Maharashtra: 9775.27,
    Manipur: 15.43,
    Meghalaya: 50.18,
    Mizoram: 42.52,
    Nagaland: 33.51,
    Odisha: 544.13,
    Puducherry: 5.69,
    Punjab: 1470.56,
    Rajasthan: 9723.97,
    Sikkim: 54.05,
    "Tamil Nadu": 14410.64,
    Telangana: 4037.25,
    Tripura: 28.91,
    "Uttar Pradesh": 3399.37,
    Uttarakhand: 681.61,
    "West Bengal": 546.83,
    Others: 49.31,
  },
  "2021": {
    "Andaman and Nicobar Islands": 34.71,
    "Andhra Pradesh": 9086.14,
    "Arunachal Pradesh": 141.27,
    Assam: 87.67,
    Bihar: 376.63,
    Chandigarh: 45.97,
    Chhattisgarh: 766.52,
    "Dadra and Nagar Haveli and Daman and Diu": 5.46,
    Delhi: 246.43,
    Goa: 7.95,
    Gujarat: 13214.25,
    Haryana: 762.51,
    HimachalPradesh: 996.59,
    Jharkhand: 78.21,
    Karnataka: 15505.13,
    Kerala: 572.42,
    Lakshadweep: 3.27,
    MadhyaPradesh: 5291.97,
    Maharashtra: 10335.85,
    Manipur: 16.84,
    Meghalaya: 50.18,
    Mizoram: 43.45,
    Nagaland: 33.58,
    Odisha: 573.38,
    Puducherry: 9.51,
    Punjab: 1647.50,
    Rajasthan: 10401.35,
    Sikkim: 54.05,
    "Tamil Nadu": 15298.47,
    Telangana: 4390.99,
    Tripura: 29.57,
    "Uttar Pradesh": 4061.47,
    Uttarakhand: 733.89,
    "West Bengal": 582.24,
    Others: 49.31,
  },
  "2022": {
    "Andaman and Nicobar Islands": 34.74,
    "Andhra Pradesh": 9211.56,
    "Arunachal Pradesh": 142.34,
    Assam: 154.05,
    Bihar: 387.35,
    Chandigarh: 55.17,
    Chhattisgarh: 869.08,
    "Dadra and Nagar Haveli and Daman and Diu": 5.46,
    Delhi: 270.12,
    Goa: 20.34,
    Gujarat: 16587.90,
    Haryana: 1242.13,
    HimachalPradesh: 1040.47,
    Jharkhand: 97.14,
    Karnataka: 15904.59,
    Kerala: 670.70,
    Ladakh: 47.44,
    Lakshadweep: 3.27,
    MadhyaPradesh: 5468.88,
    Maharashtra: 10657.08,
    Manipur: 17.70,
    Meghalaya: 50.48,
    Mizoram: 44.37,
    Nagaland: 33.71,
    Odisha: 617.09,
    Puducherry: 13.69,
    Punjab: 1767.82,
    Rajasthan: 17040.62,
    Sikkim: 56.79,
    "Tamil Nadu": 16099.30,
    Telangana: 4959.19,
    Tripura: 30.90,
    "Uttar Pradesh": 4483.52,
    Uttarakhand: 931.80,
    "West Bengal": 586.95,
    Others: 49.31,
  },
  "2023": {
    "Andaman and Nicobar Islands": 35.16,
    "Andhra Pradesh": 9360.18,
    "Arunachal Pradesh": 144.75,
    Assam: 184.04,
    Bihar: 389.60,
    Chandigarh: 58.69,
    Chhattisgarh: 1299.82,
    "Dadra and Nagar Haveli and Daman and Diu": 5.46,
    Delhi: 302.26,
    Goa: 26.88,
    Gujarat: 19435.85,
    Haryana: 1362.09,
    HimachalPradesh: 1067.40,
    Jharkhand: 114.19,
    Karnataka: 16719.23,
    Kerala: 1092.95,
    Ladakh: 48.79,
    Lakshadweep: 3.27,
    MadhyaPradesh: 5905.08,
    Maharashtra: 12757.50,
    Manipur: 17.73,
    Meghalaya: 50.48,
    Mizoram: 73.49,
    Nagaland: 35.71,
    Odisha: 628.02,
    Puducherry: 35.53,
    Punjab: 1865.63,
    Rajasthan: 22398.05,
    Sikkim: 59.80,
    "Tamil Nadu": 17920.35,
    Telangana: 5105.37,
    Tripura: 33.61,
    "Uttar Pradesh": 4781.05,
    Uttarakhand: 933.79,
    "West Bengal": 621.57,
    Others: 49.31,
  },
  "2024": {
    "Andaman and Nicobar Islands": 35.16,
    "Andhra Pradesh": 9419.33,
    "Arunachal Pradesh": 144.90,
    Assam: 192.29,
    Bihar: 450.15,
    Chandigarh: 65.52,
    Chhattisgarh: 1563.39,
    "Dadra and Nagar Haveli and Daman and Diu": 46.47,
    Delhi: 340.51,
    Goa: 45.47,
    Gujarat: 25471.72,
    Haryana: 1832.92,
    HimachalPradesh: 1075.14,
    Jharkhand: 185.55,
    Karnataka: 17752.74,
    Kerala: 1365.31,
    Ladakh: 50.79,
    Lakshadweep: 4.97,
    MadhyaPradesh: 7098.37,
    Maharashtra: 14483.12,
    Manipur: 18.49,
    Meghalaya: 73.07,
    Mizoram: 75.78,
    Nagaland: 35.84,
    Odisha: 670.48,
    Puducherry: 49.91,
    Punjab: 2067.62,
    Rajasthan: 26692.89,
    Sikkim: 62.15,
    "Tamil Nadu": 19983.42,
    Telangana: 5198.80,
    Tripura: 34.47,
    "Uttar Pradesh": 5195.57,
    Uttarakhand: 936.59,
    "West Bengal": 640.93,
    Others: 49.31,
  },
};

const years = Object.keys(renewableData);

const IndiaRenewableMap = () => {
  const mapRef = useRef(null); 
  const [year, setYear] = useState("2022");
  const [darkMode, setDarkMode] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const colorScale = scaleQuantize<string>()
    .domain([Math.min(...Object.values(renewableData[year])), Math.max(...Object.values(renewableData[year]))])
    .range([
      "#f7fbff",
      "#deebf7",
      "#c6dbef",
      "#9ecae1",
      "#6baed6",
      "#4292c6",
      "#2171b5",
      "#08519c",
      "#08306b",
    ]);

  const handleExportPNG = () => {
    if (mapRef.current) {
      toPng(mapRef.current as HTMLElement).then((dataUrl) => {
        saveAs(dataUrl, `renewable_map_${year}.png`);
      });
    }
  };

  const handleExportExcel = () => {
    const data = Object.entries(renewableData[year]).map(([state, value]) => ({
      State: state,
      "Potential (MW)": value,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Renewable Potential");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `renewable_potential_${year}.xlsx`);
  };

  const handleMouseEnter = (e: React.MouseEvent, stateName: string, value: number) => {
    const { clientX, clientY } = e;
    setTooltipContent(`${stateName}: ${value ? value.toLocaleString() : "N/A"} MW`);
    setTooltipPosition({ x: clientX + 10, y: clientY + 10 }); // Adjust tooltip position relative to the mouse cursor
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className={`${darkMode ? "bg-black" : "bg-white text-black"} p-4 rounded-xl shadow-md`}>
      {/* Title and Controls Section */}
      <div className="-mb-40 ">
        <div className="flex justify-between items-center  -mb-70">
          <h2 className="text-xl font-bold">Renewable Energy Potential by State (MW)</h2>
          <div className="flex items-center gap-3">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <button onClick={handleExportPNG}>
              <ImageDown className="w-5 h-5" />
            </button>
            <button onClick={handleExportExcel}>
              <FileDown className="w-5 h-5" />
            </button>
            <button onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div ref={mapRef} className="relative mb-4">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 950, center: [82.8, 22.5] }}
          width={1200}
          height={900}
        >
          <Geographies geography={indiaGeoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.st_nm;
                const value = renewableData[year][stateName];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => handleMouseEnter(e, stateName, value)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: {
                        fill: value ? colorScale(value) : "#EEE",
                        stroke: "#333",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#FFD700",
                        stroke: "#000",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FF8C00",
                        stroke: "#000",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Tooltip */}
        {tooltipContent && (
          <div
            className="absolute text-xs px-2 py-1 rounded shadow z-10 pointer-events-none"
            style={{
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              backgroundColor: "black",
              color: "white",
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndiaRenewableMap;
