import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CallStatusChip from "./CallStatusChip";

const rows = [];

const columns = [
  {
    field: "business_id",
    headerName: "Business ID",
    flex: 1,
  },
  {
    field: "employee_id",
    headerName: "Employee ID",
    flex: 1,
  },
  {
    field: "call_status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <CallStatusChip status={params.value} />
    ),
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 2,
  },
  {
    field: "next_followup_date",
    headerName: "Next Follow-up",
    flex: 1,
  },
  {
    field: "created_at",
    headerName: "Created At",
    flex: 1,
  },
];

const CallLogTable = () => {
  return (
    <Paper sx={{ mt: 3 }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSizeOptions={[10]}
      />
    </Paper>
  );
};

export default CallLogTable;