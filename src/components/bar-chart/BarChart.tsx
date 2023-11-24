import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  labels: string[],
  v1: number[],
  v2: number[],
  v1Label: string | undefined,
  v2Label: string | undefined,
  isHorizontal?: boolean
}

const BarChart = ({labels, v1, v1Label, v2, v2Label, isHorizontal = false}: Props) => {
  var datasets = [];

  if (v1.length > 0 && v1Label != undefined) {
    datasets.push({
      label: v1Label,
      data: v1,
      backgroundColor: '#1d70b8'
    })
  }

  if (v2.length > 0 && v2Label != undefined) {
    datasets.push({
      label: v2Label,
      data: v2,
      backgroundColor: '#ff9e30'
    })
  }

  return (
    <Bar options={{
      maintainAspectRatio: false,
      indexAxis: isHorizontal ? 'y' : 'x',
    }} 
    data={{
      labels: labels,
      datasets: datasets
    }} />
  )
}

export default BarChart