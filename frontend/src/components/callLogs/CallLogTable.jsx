import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CallStatusChip from "./CallStatusChip";

const formatDateTime = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const CallLogTable = ({
  rows = [],
  businessById = {},
  loading = false,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      field: "business_id",
      headerName: "Business",
      flex: 1.3,
      minWidth: 180,
      valueGetter: (_value, row) =>
        businessById[row.business_id]?.business_name || row.business_id,
    },
    {
      field: "employee_id",
      headerName: "Employee ID",
      flex: 0.8,
      minWidth: 110,
    },
    {
      field: "call_status",
      headerName: "Status",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => <CallStatusChip status={params.value} />,
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 2,
      minWidth: 220,
    },
    {
      field: "next_followup_date",
      headerName: "Next Follow-up",
      flex: 1,
      minWidth: 140,
      valueGetter: (value) => value || "-",
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1.2,
      minWidth: 180,
      valueGetter: (value) => formatDateTime(value),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 110,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit call log">
            <IconButton size="small" onClick={() => onEdit(params.row)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete call log">
            <IconButton size="small" color="error" onClick={() => onDelete(params.row)}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Paper sx={{ mt: 3 }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={loading}
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
