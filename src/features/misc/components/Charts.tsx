import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

const AnalyticsToolProductionData: React.FC = () => {
  const options: ApexOptions = {
    chart: { id: 'analytics-tool-production-data' },
    xaxis: { type: 'datetime' },
    title: { text: 'Analytics Tool Data' },
    stroke: { curve: 'smooth' },
    legend: { show: true, itemMargin: { vertical: 20 } },
  };
  const series = [
    {
      name: 'Actual Production',
      data: [
        { x: new Date('2024-05-11T00:00:00').getTime(), y: 50 },
        { x: new Date('2024-05-11T01:00:00').getTime(), y: 65 },
        { x: new Date('2024-05-11T02:00:00').getTime(), y: 50 },
      ],
    },
    {
      name: 'Forecasted Production',
      data: [
        { x: new Date('2024-05-11T00:00:00').getTime(), y: 50 },
        { x: new Date('2024-05-11T01:00:00').getTime(), y: 75 },
        { x: new Date('2024-05-11T02:00:00').getTime(), y: 45 },
      ],
    },
  ];
  return <Chart options={options} series={series} type="line" height="480" />;
};

const BatteryChargeLevel: React.FC = () => {
  const options: ApexOptions = {
    chart: { id: 'battery-charge-level' },
    xaxis: { type: 'datetime' },
    title: { text: 'Battery Charge Level' },
    legend: { show: true, itemMargin: { vertical: 20 } },
  };
  const series = [
    {
      name: 'State of Charge (SoC)',
      data: [
        { x: new Date('2024-05-11T00:00:00').getTime(), y: 80 },
        { x: new Date('2024-05-11T01:00:00').getTime(), y: 45 },
        { x: new Date('2024-05-11T02:00:00').getTime(), y: 90 },
      ],
    },
  ];
  return <Chart options={options} series={series} type="area" height="480" />;
};

const ElectricityPriceTrends: React.FC = () => {
  const options: ApexOptions = {
    chart: { id: 'electricity-price-trends' },
    xaxis: { type: 'datetime' },
    title: { text: 'Electricity Price Trends' },
    legend: { show: true, itemMargin: { vertical: 20 } },
  };
  const series = [
    {
      name: 'Current Price',
      data: [
        { x: new Date('2024-05-11T00:00:00').getTime(), y: 10 },
        { x: new Date('2024-05-11T01:00:00').getTime(), y: 15 },
        { x: new Date('2024-05-11T02:00:00').getTime(), y: 20 },
        { x: new Date('2024-05-11T03:00:00').getTime(), y: 22 },
        { x: new Date('2024-05-11T04:00:00').getTime(), y: 12 },
        { x: new Date('2024-05-11T05:00:00').getTime(), y: 10 },
        { x: new Date('2024-05-11T06:00:00').getTime(), y: 16 },
      ],
    },
    {
      name: 'Predicted Future Prices',
      data: [
        { x: new Date('2024-05-11T00:00:00').getTime(), y: 12 },
        { x: new Date('2024-05-11T01:00:00').getTime(), y: 17 },
        { x: new Date('2024-05-11T02:00:00').getTime(), y: 22 },
        { x: new Date('2024-05-11T03:00:00').getTime(), y: 26 },
        { x: new Date('2024-05-11T04:00:00').getTime(), y: 20 },
        { x: new Date('2024-05-11T05:00:00').getTime(), y: 29 },
        { x: new Date('2024-05-11T06:00:00').getTime(), y: 5 },
      ],
    },
  ];
  return <Chart options={options} series={series} type="bar" height="480" />;
};

const AnalyticsToolProductionVsConsumption: React.FC = () => {
  const options: ApexOptions = {
    chart: { id: 'analytics-tool-production-vs-consumption' },
    xaxis: { type: 'datetime' },
    title: { text: 'Analytics Tool Production vs. Consumption' },
    stroke: { curve: 'smooth' },
    legend: { show: true, itemMargin: { vertical: 20 } },
  };
  const series = [
    {
      name: 'Analytics Tool Power Production',
      data: [
        { x: new Date('2024-05-11T00:00:00').getTime(), y: 55 },
        { x: new Date('2024-05-11T01:00:00').getTime(), y: 80 },
        { x: new Date('2024-05-11T02:00:00').getTime(), y: 30 },
      ],
    },
    {
      name: "Tesla's Consumption",
      data: [
        { x: new Date('2024-05-11T00:00:00').getTime(), y: 40 },
        { x: new Date('2024-05-11T01:00:00').getTime(), y: 50 },
        { x: new Date('2024-05-11T02:00:00').getTime(), y: 60 },
      ],
    },
  ];
  return <Chart options={options} series={series} type="line" height="480" />;
};

export {
  AnalyticsToolProductionData,
  BatteryChargeLevel,
  ElectricityPriceTrends,
  AnalyticsToolProductionVsConsumption,
};
