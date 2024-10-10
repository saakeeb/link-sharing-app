import Chart from 'react-apexcharts';

type LineChartProps = {
  title?: string;
  width?: string;
  height?: string;
  categories: number[] | string;
  series: { name: string; data: number[] }[];
};

export const LineChart: React.FC<LineChartProps> = ({
  title,
  width = '100%',
  height = '100%',
  categories,
  series,
}) => {
  const chartOptions: ApexCharts.ApexOptions = {
    title: {
      text: title,
      align: 'left',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#00B7C8', '#00B7C8'],
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        rotate: 0,
        rotateAlways: false,
        hideOverlappingLabels: true,
        formatter: function (val: any) {
          const labels = ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'];
          return val % 4 === 0 ? `${val}:00` : '';
        },
      },
    },

    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return val + '%';
        },
      },
    },
  };

  return (
    <div className="flex grow h-full">
      <Chart
        className="!w-full"
        options={chartOptions}
        series={series}
        type="line"
        width={width}
        height={height}
      />
    </div>
  );
};
