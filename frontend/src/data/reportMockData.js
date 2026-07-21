export const reportMockData = {
  businesses: [
    { id: 1, name: 'Harbor Foods', city: 'Kochi', category: 'Restaurant', leadScore: 88, assignedTo: 1 },
    { id: 2, name: 'TechNova Systems', city: 'Bangalore', category: 'Technology', leadScore: 76, assignedTo: 2 },
    { id: 3, name: 'Coastal Realty', city: 'Trivandrum', category: 'Real Estate', leadScore: 69, assignedTo: 1 },
    { id: 4, name: 'Chennai Textiles', city: 'Chennai', category: 'Retail', leadScore: 91, assignedTo: 3 },
    { id: 5, name: 'Green Leaf Clinic', city: 'Kochi', category: 'Healthcare', leadScore: 82, assignedTo: 2 },
    { id: 6, name: 'Metro Motors', city: 'Bangalore', category: 'Automotive', leadScore: 63, assignedTo: 4 },
  ],
  employees: [
    { id: 1, name: 'Anjali Nair', role: 'EMPLOYEE', is_active: true },
    { id: 2, name: 'Rahul Menon', role: 'EMPLOYEE', is_active: true },
    { id: 3, name: 'Priya Thomas', role: 'EMPLOYEE', is_active: true },
    { id: 4, name: 'Vikram Das', role: 'EMPLOYEE', is_active: false },
    { id: 5, name: 'Nisha Paul', role: 'MANAGER', is_active: true },
  ],
  employeePerformance: [
    { employeeId: 1, assignedLeads: 18, callsMade: 42, completedCalls: 35, pendingFollowups: 4, averageLeadScore: 79 },
    { employeeId: 2, assignedLeads: 15, callsMade: 38, completedCalls: 31, pendingFollowups: 3, averageLeadScore: 74 },
    { employeeId: 3, assignedLeads: 12, callsMade: 29, completedCalls: 24, pendingFollowups: 2, averageLeadScore: 86 },
    { employeeId: 4, assignedLeads: 9, callsMade: 17, completedCalls: 12, pendingFollowups: 5, averageLeadScore: 63 },
  ],
  todaysFollowups: 9,
  recentActivities: [
    { id: 1, title: 'Call completed with Harbor Foods', detail: 'Anjali Nair updated the lead status.', timestamp: 'Today, 10:42 AM' },
    { id: 2, title: 'Follow-up scheduled for Chennai Textiles', detail: 'Priya Thomas scheduled it for tomorrow.', timestamp: 'Today, 9:15 AM' },
    { id: 3, title: 'Lead assigned to Rahul Menon', detail: 'Green Leaf Clinic was assigned.', timestamp: 'Yesterday, 4:30 PM' },
    { id: 4, title: 'Lead score updated', detail: 'TechNova Systems score increased to 76.', timestamp: 'Yesterday, 2:05 PM' },
  ],
}
