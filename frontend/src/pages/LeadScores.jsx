import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import { Alert, Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import DailyCallList from '../components/leadScore/DailyCallList'
import FeatureImportance from '../components/leadScore/FeatureImportance'
import LeadScoreFilters from '../components/leadScore/LeadScoreFilters'
import LeadScoreTable from '../components/leadScore/LeadScoreTable'
import SummaryCards from '../components/leadScore/SummaryCards'
import useLeadScores from '../hooks/useLeadScores'

const getUniqueValues = (leadScores, accessor) =>
  Array.from(
    new Set(
      leadScores
        .map((leadScore) => accessor(leadScore.business || {}))
        .filter(Boolean),
    ),
  ).sort((first, second) => first.localeCompare(second))

export default function LeadScores() {
  const {
    statistics,
    leadScores,
    dailyCallList,
    featureImportance,
    filters,
    pagination,
    loading,
    error,
    updateFilter,
    resetFilters,
    setPage,
  } = useLeadScores()

  const cityOptions = useMemo(
    () => getUniqueValues([...leadScores, ...dailyCallList], (business) => business.city),
    [dailyCallList, leadScores],
  )

  const categoryOptions = useMemo(
    () =>
      getUniqueValues(
        [...leadScores, ...dailyCallList],
        (business) => business.category,
      ),
    [dailyCallList, leadScores],
  )

  return (
    <Box sx={{ p: 4, pt: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h4" fontWeight={700}>
            Lead Scores
          </Typography>
          <Typography color="text.secondary">
            Review lead priority, score reasons, and daily call targets.
          </Typography>
        </Stack>

        {error ? (
          <Alert
            icon={<ErrorOutlineRoundedIcon fontSize="inherit" />}
            severity="error"
          >
            {error}
          </Alert>
        ) : null}

        <SummaryCards loading={loading} statistics={statistics} />

        <LeadScoreFilters
          categoryOptions={categoryOptions}
          cityOptions={cityOptions}
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        />

        <LeadScoreTable
          leadScores={leadScores}
          loading={loading}
          onPageChange={setPage}
          pagination={pagination}
        />

        <DailyCallList dailyCallList={dailyCallList} loading={loading} />

        <FeatureImportance
          featureImportance={featureImportance}
          loading={loading}
        />
      </Stack>
    </Box>
  )
}
