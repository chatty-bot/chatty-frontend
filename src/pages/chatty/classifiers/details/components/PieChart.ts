import { Pie, mixins } from "vue-chartjs";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ChartData, ChartOptions } from "chart.js";

@Component({
  extends: Pie,
  mixins: [mixins.reactiveProp],
})
export default class PieChart extends Vue {
  @Prop() chartData!: ChartData;
  @Prop() chartOptions!: ChartOptions;
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }

  public renderChart!: (chartData: any, options: any) => void;
}
