import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import ScoreRoundedIcon from '@mui/icons-material/ScoreRounded'
import TodayRoundedIcon from '@mui/icons-material/TodayRounded'
import { Grid, Skeleton } from '@mui/material'
import StatCard from '../dashboard/StatCard'
const cards = [{ title: 'Total Businesses', key: 'totalBusinesses', icon: BusinessRoundedIcon }, { title: 'Assigned Leads', key: 'assignedLeads', icon: AssignmentRoundedIcon }, { title: 'Total Calls', key: 'totalCalls', icon: CallRoundedIcon }, { title: "Today's Follow-ups", key: 'todaysFollowups', icon: TodayRoundedIcon }, { title: 'Average Lead Score', key: 'averageLeadScore', icon: ScoreRoundedIcon }, { title: 'Active Employees', key: 'activeEmployees', icon: GroupsRoundedIcon }]
const ReportSummaryCards = ({ loading, summary }) => <Grid container spacing={2.5}>{cards.map((card) => <Grid key={card.key} size={{ xs: 12, sm: 6, lg: 4 }}>{loading ? <Skeleton variant="rounded" height={150} /> : <StatCard title={card.title} value={summary?.[card.key] ?? 0} helperText="Current reporting period" icon={card.icon} />}</Grid>)}</Grid>
export default ReportSummaryCards
