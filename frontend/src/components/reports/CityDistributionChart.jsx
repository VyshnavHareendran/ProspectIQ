import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import ChartCard from './ChartCard'

const colors = ['#5c6bc0', '#26a69a', '#ffa726', '#ec407a']
const cities = (items) => Object.values(items.reduce((result, item) => ({ ...result, [item.city]: { name: item.city, value: (result[item.city]?.value || 0) + 1 } }), {}))

const CityDistributionChart = ({ businesses = [], loading }) => {
  const data = cities(businesses)
  return <ChartCard title="Businesses by City" loading={loading}><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={52} outerRadius={85} paddingAngle={3}>{data.map((item, index) => <Cell key={item.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /><Legend verticalAlign="bottom" /></PieChart></ResponsiveContainer></ChartCard>
}

export default CityDistributionChart
