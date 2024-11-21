import { 
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexLegend,
  ApexDataLabels
} from 'ng-apexcharts';

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
}