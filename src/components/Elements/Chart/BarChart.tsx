import Chart from 'react-apexcharts';

type BarChartProps = {
  title?: string;
  width?: string;
  height?: string;
  categories: string[];
  seriesData: any;
};

export const BarChart: React.FC<BarChartProps> = ({
  title,
  width = '100%',
  height = '100%',
  categories,
  seriesData,
}) => {
  const chartOptions: ApexCharts.ApexOptions = {
    title: {
      text: title,
      align: 'left',
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      floating: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
      stacked: true,
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      min: 0,
      max: 4000,
      tickAmount: 8,
      labels: {
        formatter: function (val) {
          return val.toString();
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="flex grow h-full">
      <Chart className="!w-full" options={chartOptions} series={seriesData} type="bar" width={width} height={height} />
    </div>
  );
};
