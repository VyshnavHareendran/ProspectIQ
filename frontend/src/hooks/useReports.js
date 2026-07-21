import { useCallback, useEffect, useState } from 'react'
import { reportsService } from '../services/reportsService'

const initialFilters = { dateRange: 'last30', employeeId: '', city: '' }

const useReports = () => {
  const [filters, setFilters] = useState(initialFilters)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    Promise.resolve().then(() => {
      if (active) setLoading(true)
      return reportsService.getReports(filters)
    })
      .then((result) => active && setData(result))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [filters])

  const exportReport = useCallback(async () => reportsService.exportReport(filters), [filters])
  return { data, error, exportReport, filters, loading, setError, setFilters }
}

export default useReports
