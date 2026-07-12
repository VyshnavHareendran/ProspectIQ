import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded'
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded'
import { Grid } from '@mui/material'
import StatCard from '../dashboard/StatCard'

const SummaryCards = ({ loading, statistics }) => {
  const cards = [
    {
      title: 'Total Leads',
      value: statistics?.total_leads ?? 0,
      helperText: 'Scored leads available.',
      icon: BusinessCenterRoundedIcon,
    },
    {
      title: 'High Priority',
      value: statistics?.high_priority ?? 0,
      helperText: 'Ready for immediate follow-up.',
      icon: PriorityHighRoundedIcon,
    },
    {
      title: 'Medium Priority',
      value: statistics?.medium_priority ?? 0,
      helperText: 'Qualified leads to nurture.',
      icon: TrendingFlatRoundedIcon,
    },
    {
      title: 'Low Priority',
      value: statistics?.low_priority ?? 0,
      helperText: 'Lower urgency opportunities.',
      icon: LowPriorityRoundedIcon,
    },
  ]

  return (
    <Grid container spacing={2.5}>
      {cards.map((card) => (
        <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard {...card} loading={loading} />
        </Grid>
      ))}
    </Grid>
  )
}

export default SummaryCards
