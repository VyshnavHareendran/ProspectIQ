import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";

const history = [
  {
    id: 1,
    filename: "daily_call_list_yelp.csv",
    date: "08-07-2026",
    status: "COMPLETED",
    imported: 500,
    duplicates: 0,
  },
];

const UploadHistoryTable = () => {
  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" mb={2}>
        Upload History
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Filename</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Imported</TableCell>
            <TableCell>Duplicates</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {history.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.filename}</TableCell>
              <TableCell>{row.date}</TableCell>

              <TableCell>
                <Chip
                  label={row.status}
                  color="success"
                />
              </TableCell>

              <TableCell>{row.imported}</TableCell>
              <TableCell>{row.duplicates}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UploadHistoryTable;