import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CSVPreviewTable = ({ rows = [], columns = [] }) => {

  if (!rows || rows.length === 0) {
    return null;
  }

  const gridColumns = columns.map((column) => ({
    field: column,
    headerName: column,
    flex: 1,
    minWidth: 150,
  }));

  const gridRows = rows.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        CSV Preview
      </Typography>

      <DataGrid
        autoHeight
        rows={gridRows}
        columns={gridColumns}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
      />
    </Paper>
  );
};

export default CSVPreviewTable;