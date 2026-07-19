import api from '../httpClient'

export const dashboardApi = {
  getSummary() {
    return api.get('/dashboard/summary')
  },

  getCityDistribution() {
    return api.get('/dashboard/city-distribution')
  },

  getCategoryDistribution() {
    return api.get('/dashboard/category-distribution')
  },

  getRecentBusinesses() {
    return api.get('/dashboard/recent-businesses')
  },

  getImportSummary() {
    return api.get('/dashboard/import-summary')
  },

  getUpcomingFollowups() {
    return api.get('/dashboard/upcoming-followups')
  },
  getLeadAssignmentStatus() {
    return api.get('/dashboard/lead-assignment-status')
  },
  getRecentCalls() {
    return api.get('/dashboard/recent-calls')
  },
  getEmployeePerformance() {
    return api.get('/dashboard/employee-performance')
  },
}
