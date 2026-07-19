import { Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LeadStatusChip from "./LeadStatusChip";
import CallStatusChip from "./CallStatusChip";

const formatDateTime = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const CallLogTable = ({
    rows = [],
    loading = false,
    onRowClick,
    onViewBusiness,
    showEmployee = true,
}) => {
  const businessColumn = {
      field: "business",
      headerName: "Business",
      flex: 1.5,
      minWidth: 220,

      renderCell: (params) => {

          const business = params.row.lead_assignment?.business;

          if (!business) return "-";

          return (
              <Button
                  variant="text"
                  disableRipple
                  onClick={(e) => {
                      e.stopPropagation();
                      onViewBusiness?.(business.id);
                  }}
                  sx={{
                      p: 0,
                      minWidth: "auto",
                      textTransform: "none",
                      fontWeight: 600,
                      color: "primary.main",

                      "&:hover": {
                          background: "transparent",
                          textDecoration: "underline",
                      },
                  }}
              >
                  {business.business_name}
              </Button>
          );
      },
  };

  const employeeColumn = {
      field: "employee",
      headerName: "Employee",
      flex: 1.2,
      minWidth: 180,
      valueGetter: (_value, row) =>
          row.employee?.full_name || "-",
  };

  const statusColumn = {
      field: "status",
      headerName: "Lead Status",
      flex: 1,
      minWidth: 150,
      valueGetter: (_value, row) =>
          row.lead_assignment?.status || "-",
      renderCell: (params) => (
          <LeadStatusChip status={params.value} />
      ),
  };

  const outcomeColumn = {
      field: "call_outcome",
      headerName: "Call Outcome",
      flex: 1.2,
      minWidth: 170,
      renderCell: (params) => (
          <CallStatusChip status={params.value} />
      ),
  };

  const notesColumn = {
      field: "notes",
      headerName: "Notes",
      flex: 2,
      minWidth: 260,
      valueGetter: (value) => value || "-",
  };

  const followupColumn = {
      field: "next_followup_date",
      headerName: "Follow-up",
      flex: 1,
      minWidth: 150,
      valueGetter: (value) => value || "-",
  };

  const createdColumn = {
      field: "created_at",
      headerName: "Created",
      flex: 1.3,
      minWidth: 180,
      valueGetter: (value) =>
          formatDateTime(value),
  };

  const columns = [
      businessColumn,

      ...(showEmployee ? [employeeColumn] : []),

      statusColumn,

      outcomeColumn,

      notesColumn,

      followupColumn,

      createdColumn,
  ];

  return (
    <Paper sx={{ mt: 3 }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={loading}
        onRowClick={(params) => onRowClick?.(params.row)}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        disableRowSelectionOnClick
      />
    </Paper>
  );
};

export default CallLogTable;
