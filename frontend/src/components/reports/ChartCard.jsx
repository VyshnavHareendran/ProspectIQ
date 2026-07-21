import { Card, CardContent, Skeleton, Typography } from '@mui/material'

const ChartCard = ({ children, loading, title }) => (
  <Card sx={{ height: '100%', borderRadius: 4, boxShadow: '0 8px 25px rgba(0,0,0,.08)' }}>
    <CardContent sx={{ p: 2.5 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>{title}</Typography>
      {loading ? <Skeleton variant="rounded" height={280} /> : children}
    </CardContent>
  </Card>
)

export default ChartCard
