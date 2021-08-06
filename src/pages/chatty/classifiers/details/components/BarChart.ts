import { Bar, mixins } from "vue-chartjs";
import { Component, Vue, Prop } from "vue-property-decorator";
import { ChartData, ChartOptions } from "chart.js";

@Component({
  extends: Bar,
  mixins: [mixins.reactiveProp],
})
export default class BarChart extends Vue {
  @Prop() chartData!: ChartData;
  @Prop() chartOptions!: ChartOptions;
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }

  public renderChart!: (chartData: any, options: any) => void;
}
