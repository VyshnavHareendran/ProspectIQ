import { Alert, Box, Grid, Snackbar, Stack, Typography } from '@mui/material'
import BusinessCategoryChart from '../../components/reports/BusinessCategoryChart'
import CallsChart from '../../components/reports/CallsChart'
import CityDistributionChart from '../../components/reports/CityDistributionChart'
import LeadScoreChart from '../../components/reports/LeadScoreChart'
import ReportFilters from '../../components/reports/ReportFilters'
import ReportSummaryCards from '../../components/reports/ReportSummaryCards'
import useReports from '../../hooks/useReports'

const Reports = () => {
  const {
    data,
    error,
    exportReport,
    filters,
    loading,
    setError,
    setFilters,
  } = useReports()

  const hasData = data?.businesses?.length > 0

  const updateFilter = (field, value) =>
    setFilters((current) => ({
      ...current,
      [field]: value,
    }))

  const handleExport = async () => {

    const pdf = await exportReport()

    const link = document.createElement("a")

    link.href = URL.createObjectURL(
      new Blob([pdf], {
        type: "application/pdf",
      })
    )

    link.download = "ProspectIQ_Report.pdf"

    link.click()

    URL.revokeObjectURL(link.href)

  }

  return (
    <Box p={{ xs: 2, md: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Reports
          </Typography>

          <Typography color="text.secondary">
            Track business outreach and employee performance.
          </Typography>
        </Box>

        <ReportFilters
          employees={data?.employees}
          cities={data?.cities}
          filters={filters}
          onChange={updateFilter}
          onExport={handleExport}
        />

        {loading || hasData ? (
          <>
            <ReportSummaryCards
              loading={loading}
              summary={data?.summary}
            />

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <LeadScoreChart
                    data={data?.businesses}
                    leadScoreChart={data?.leadScoreChart}
                    loading={loading}
                />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <CallsChart
                    data={data?.employeePerformance}
                    callsPerEmployeeChart={data?.callsPerEmployeeChart}
                    loading={loading}
                />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <BusinessCategoryChart
                  businesses={data?.businesses}
                  categoryDistribution={data?.categoryDistribution}
                  loading={loading}
                />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <CityDistributionChart
                    businesses={data?.businesses}
                    cityDistribution={data?.cityDistribution}
                    loading={loading}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography
            color="text.secondary"
            textAlign="center"
            py={8}
          >
            No report data available.
          </Typography>
        )}
      </Stack>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
      >
        <Alert
          severity="error"
          onClose={() => setError(false)}
        >
          Unable to load reports.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Reports