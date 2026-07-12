import { useCallback, useEffect, useMemo, useState } from 'react'
import LeadScoreService from '../services/leadScoreService'

const defaultFilters = {
  search: '',
  priority: '',
  city: '',
  category: '',
}

const getErrorMessage = (error) => {
  const detail = error.response?.data?.detail
  return typeof detail === 'string'
    ? detail
    : 'Unable to load lead scores. Please try again later.'
}

const getItems = (value) => {
  if (Array.isArray(value)) return value
  if (Array.isArray(value?.items)) return value.items
  if (Array.isArray(value?.results)) return value.results
  return []
}

export default function useLeadScores() {
  const [statistics, setStatistics] = useState(null)
  const [leadScores, setLeadScores] = useState([])
  const [dailyCallList, setDailyCallList] = useState([])
  const [featureImportance, setFeatureImportance] = useState(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  })
  const [filters, setFilters] = useState(defaultFilters)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const params = useMemo(
    () => ({
      page: pagination.page,
      page_size: pagination.pageSize,
      ...filters,
    }),
    [filters, pagination.page, pagination.pageSize],
  )

  const loadData = useCallback(async (isActive = () => true) => {
    setLoading(true)
    setError('')

    try {
      const [statisticsRes, leadScoresRes, dailyCallsRes, featureImportanceRes] =
        await Promise.all([
          LeadScoreService.getStatistics(),
          LeadScoreService.getLeadScores(params),
          LeadScoreService.getDailyCallList(),
          LeadScoreService.getFeatureImportance(),
        ])

      if (!isActive()) return

      const leadScoreData = leadScoresRes.data || {}
      const items = getItems(leadScoreData)

      setStatistics(statisticsRes.data)
      setLeadScores(items)
      setDailyCallList(getItems(dailyCallsRes.data))
      setFeatureImportance(featureImportanceRes.data)
      setPagination((current) => ({
        ...current,
        total: leadScoreData.total ?? items.length,
        page: leadScoreData.page ?? current.page,
        pageSize: leadScoreData.page_size ?? current.pageSize,
        totalPages: Math.max(leadScoreData.total_pages ?? 1, 1),
      }))
    } catch (err) {
      if (isActive()) {
        setError(getErrorMessage(err))
      }
    } finally {
      if (isActive()) {
        setLoading(false)
      }
    }
  }, [params])

  useEffect(() => {
    let isActive = true

    queueMicrotask(() => {
      loadData(() => isActive)
    })

    return () => {
      isActive = false
    }
  }, [loadData])

  const updateFilter = useCallback((name, value) => {
    setFilters((current) => ({ ...current, [name]: value }))
    setPagination((current) => ({ ...current, page: 1 }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
    setPagination((current) => ({ ...current, page: 1 }))
  }, [])

  const setPage = useCallback((page) => {
    setPagination((current) => ({ ...current, page }))
  }, [])

  const setPageSize = useCallback((pageSize) => {
    setPagination((current) => ({ ...current, page: 1, pageSize }))
  }, [])

  return {
    statistics,
    leadScores,
    dailyCallList,
    featureImportance,
    filters,
    pagination,
    loading,
    error,
    reload: loadData,
    updateFilter,
    resetFilters,
    setPage,
    setPageSize,
  }
}
