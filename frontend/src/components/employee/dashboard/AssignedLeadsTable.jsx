import {
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
} from "@mui/x-data-grid";

const priorityColor = {
  HIGH: "error",
  MEDIUM: "warning",
  LOW: "success",
};

const statusColor = {
  NEW: "info",
  IN_PROGRESS: "warning",
};

const columns = [
  {
    field: "business_name",
    headerName: "Business",
    flex: 1.5,
  },
  {
    field: "phone_number",
    headerName: "Phone",
    flex: 1,
  },
  {
    field: "priority",
    headerName: "Priority",
    flex: 0.8,
    renderCell: ({ value }) => (
      <Chip
        label={value}
        size="small"
        color={priorityColor[value]}
      />
    ),
  },
  {
    field: "lead_score",
    headerName: "Score",
    flex: 0.8,
    renderCell: ({ value }) => (
      <Typography fontWeight={600}>
        {value ?? "-"}
      </Typography>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: ({ value }) => (
      <Chip
        label={value.replaceAll("_", " ")}
        color={statusColor[value]}
        size="small"
      />
    ),
  },
  {
    field: "attempt",
    headerName: "Attempt",
    flex: 0.8,
    renderCell: ({ value }) => (
      <Chip
        label={`#${value}`}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 0.8,
    sortable: false,
    renderCell: () => (
      <Button
        variant="contained"
        size="small"
      >
        Call
      </Button>
    ),
  },
];

export default function AssignedLeadsTable({
  rows,
}) {
  return (
    <Card>
      <CardContent>

        <Stack
          spacing={0.5}
          mb={2}
        >
          <Typography variant="h5">
            My Assigned Leads
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Businesses assigned for today's calling.
          </Typography>
        </Stack>

        <DataGrid
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          rows={rows}
          columns={columns}
          localeText={{
            noRowsLabel:
              "🎉 No active assigned leads. Check Today's Follow-ups or wait for new assignments.",
          }}
        />

      </CardContent>
    </Card>
  );
}