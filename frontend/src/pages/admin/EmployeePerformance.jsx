import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { dashboardApi } from "../../api/admin/dashboardApi";

export default function EmployeePerformance() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployeePerformance = async () => {
    try {
      const response = await dashboardApi.getEmployeePerformance();

      setRows(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadEmployeePerformance);
  }, []);

  const columns = [
    {
      field: "employee_name",
      headerName: "Employee",
      flex: 1,
    },
    {
      field: "assigned_leads",
      headerName: "Assigned",
      width: 120,
    },
    {
      field: "calls_made",
      headerName: "Calls",
      width: 120,
    },
    {
      field: "pending_followups",
      headerName: "Follow-ups",
      width: 140,
    },
    {
      field: "closed_leads",
      headerName: "Closed",
      width: 120,
    },
    {
      field: "conversion_rate",
      headerName: "Conversion %",
      width: 150,
      renderCell: (params) => `${params.value}%`,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Employee Performance
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ height: 550 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.employee_id}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
