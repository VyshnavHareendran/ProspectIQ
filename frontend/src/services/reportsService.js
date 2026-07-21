import { reportMockData } from '../data/reportMockData'

const matchesFilters = (business, filters) =>
  (!filters.employeeId || business.assignedTo === Number(filters.employeeId)) &&
  (!filters.city || business.city === filters.city)

export const reportsService = {
  // Replace this mock-backed method with GET /reports/summary, /reports/charts,
  // /reports/employee-performance and /reports/recent-activities when available.
  getReports: async (filters = {}) => {
    const businesses = reportMockData.businesses.filter((business) => matchesFilters(business, filters))
    const employeeIds = new Set(businesses.map((business) => business.assignedTo))
    const performance = reportMockData.employeePerformance
      .filter((item) => !filters.employeeId || item.employeeId === Number(filters.employeeId))
      .map((item) => ({ ...item, employee: reportMockData.employees.find((employee) => employee.id === item.employeeId)?.name || 'Unassigned' }))

    return {
      businesses,
      employees: reportMockData.employees,
      employeePerformance: performance,
      recentActivities: reportMockData.recentActivities,
      summary: {
        totalBusinesses: businesses.length,
        assignedLeads: businesses.filter((business) => business.assignedTo).length,
        totalCalls: performance.reduce((total, item) => total + item.callsMade, 0),
        todaysFollowups: reportMockData.todaysFollowups,
        averageLeadScore: businesses.length ? Math.round(businesses.reduce((total, item) => total + item.leadScore, 0) / businesses.length) : 0,
        activeEmployees: reportMockData.employees.filter((employee) => employee.role === 'EMPLOYEE' && employee.is_active).length,
        employeesWithLeads: employeeIds.size,
      },
    }
  },

  // Replace with GET /reports/export once the backend provides file exports.
  exportReport: async (filters = {}) => {
    const { businesses } = await reportsService.getReports(filters)
    const rows = [['Business Name', 'City', 'Category', 'Lead Score'], ...businesses.map(({ name, city, category, leadScore }) => [name, city, category, leadScore])]
    return rows.map((row) => row.join(',')).join('\n')
  },
}
