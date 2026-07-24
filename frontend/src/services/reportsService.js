import httpClient from "../api/httpClient";
import { reportMockData } from "../data/reportMockData";

const getStartDate = (range)=>{

 const today = new Date();

 switch(range){

 case "today":
   return today.toISOString().split("T")[0];


 case "last7":
   today.setDate(today.getDate()-7);
   return today.toISOString().split("T")[0];


 case "last30":
   today.setDate(today.getDate()-30);
   return today.toISOString().split("T")[0];


 case "last6months":
   today.setMonth(today.getMonth()-6);
   return today.toISOString().split("T")[0];


 case "last1year":
   today.setFullYear(today.getFullYear()-1);
   return today.toISOString().split("T")[0];


 default:
   return null;
 }

}

const matchesFilters = (business, filters) =>
  (!filters.employeeId || business.assignedTo === Number(filters.employeeId)) &&
  (!filters.city || business.city === filters.city)

export const reportsService = {
  // Replace this mock-backed method with GET /reports/summary, /reports/charts,
  // /reports/employee-performance and /reports/recent-activities when available.
  getReports: async (filters = {}) => {
    const summaryResponse = await httpClient.get("/reports/summary");
    const summary = summaryResponse.data;
    
    const employeesResponse = await httpClient.get(
      "/reports/employees"
    );

    const employees = employeesResponse.data;
    
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

      employees: employees.map((employee)=>({
          id: employee.id,
          name: employee.full_name
      })),

      cities: [
        ...new Set(
          cityDistribution.map(
            (item) => item.city
          )
        )
      ],

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

      const startDate = getStartDate(
          filters.dateRange
      );


      const response = await httpClient.get(
          "/reports/export/pdf",
          {
              params: {
                  employee_id: filters.employeeId || null,
                  city: filters.city || null,
                  start_date: startDate,
              },

              responseType: "blob",
          }
      );


      return response.data;
  },
}
