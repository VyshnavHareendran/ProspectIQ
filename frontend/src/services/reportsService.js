import httpClient from "../api/httpClient";
import { reportMockData } from "../data/reportMockData";

const matchesFilters = (business, filters) =>
  (!filters.employeeId || business.assignedTo === Number(filters.employeeId)) &&
  (!filters.city || business.city === filters.city)

export const reportsService = {
  // Replace this mock-backed method with GET /reports/summary, /reports/charts,
  // /reports/employee-performance and /reports/recent-activities when available.
  getReports: async (filters = {}) => {
    const summaryResponse = await httpClient.get("/reports/summary");
    const summary = summaryResponse.data;
    const categoryResponse = await httpClient.get(
    "/reports/category-distribution"
    );
    const cityResponse = await httpClient.get(
        "/reports/city-distribution"
    );

    const cityDistribution = cityResponse.data;
    const leadScoreResponse = await httpClient.get(
        "/reports/lead-score-chart"
    );
    const callsPerEmployeeResponse = await httpClient.get(
        "/reports/calls-per-employee"
    );

    const callsPerEmployeeChart =
        callsPerEmployeeResponse.data;

    const leadScoreChart = leadScoreResponse.data;

    const categoryDistribution = categoryResponse.data;
        
    const businesses = reportMockData.businesses.filter((business) => matchesFilters(business, filters))
    const employeeIds = new Set(businesses.map((business) => business.assignedTo))

    return {
      businesses,
      employees: reportMockData.employees,
      summary: {
        totalBusinesses: summary.total_businesses,
        totalCalls: summary.calls_made,
        interestedLeads: summary.interested_leads,
        followUps: summary.follow_ups,
        averageLeadScore: summary.average_lead_score,
        activeEmployees: summary.active_employees,

        // Keep these mock values temporarily until we connect their backend APIs
        assignedLeads: businesses.filter((business) => business.assignedTo).length,
        todaysFollowups: reportMockData.todaysFollowups,
        employeesWithLeads: employeeIds.size,
      },
      categoryDistribution,
      cityDistribution,
      leadScoreChart,
      callsPerEmployeeChart,
    }
  },

  // Replace with GET /reports/export once the backend provides file exports.
  exportReport: async (filters = {}) => {
    const { businesses } = await reportsService.getReports(filters)
    const rows = [['Business Name', 'City', 'Category', 'Lead Score'], ...businesses.map(({ name, city, category, leadScore }) => [name, city, category, leadScore])]
    return rows.map((row) => row.join(',')).join('\n')
  },
}
