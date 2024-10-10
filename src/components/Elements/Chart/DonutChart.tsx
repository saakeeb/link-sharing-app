import Chart from 'react-apexcharts';

type DonutChartProps = {
  title?: string;
  showLegend?: boolean;
  width?: string;
  height?: string;
  colors?: string[];
  series: number[];
  labels: string[];
};

export const DonutChart: React.FC<DonutChartProps> = ({
  title,
  showLegend = false,
  width = '100%',
  height = 'auto',
  series,
  labels,
  colors,
}) => {
  const chartOptions: ApexCharts.ApexOptions = {
    title: {
      text: title,
      align: 'left',
    },
    colors: colors,
    labels: labels,
    dataLabels: {
      enabled: true,
      formatter: function (val: string) {
        return parseInt(val).toString() + '%';
      },
    },
    legend: {
      show: showLegend,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      offsetY: -3,
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
  };

  return (
    <div className="donut">
      <Chart options={chartOptions} series={series} type="donut" width={width} height={height} />
    </div>
  );
};
