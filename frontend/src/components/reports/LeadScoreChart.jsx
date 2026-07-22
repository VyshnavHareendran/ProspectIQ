import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard from './ChartCard'

const LeadScoreChart = ({ data = [], loading }) => (
  <ChartCard title="Lead Score by Business" loading={loading}>
    <ResponsiveContainer width="100%" height={280}><BarChart data={data} margin={{ left: -20 }}><CartesianGrid vertical={false} strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={70} /><YAxis domain={[0, 100]} /><Tooltip /><Bar dataKey="leadScore" name="Lead Score" fill="#1976d2" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer>
  </ChartCard>
)

export default LeadScoreChart
