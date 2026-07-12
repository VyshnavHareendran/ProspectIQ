import httpClient from '../api/httpClient'

const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value != null),
  )

const LeadScoreService = {
  getLeadScores(filters = {}, config = {}) {
    return httpClient.get('/lead-scores', {
      ...config,
      params: cleanParams(filters),
    })
  },

  getStatistics(config = {}) {
    return httpClient.get('/lead-scores/statistics', config)
  },

  getHighPriority(config = {}) {
    return httpClient.get('/lead-scores/high-priority', config)
  },

  getDailyCallList(config = {}) {
    return httpClient.get('/lead-scores/daily-call-list', config)
  },

  getFeatureImportance(config = {}) {
    return httpClient.get('/lead-scores/feature-importance', config)
  },
}

export default LeadScoreService
