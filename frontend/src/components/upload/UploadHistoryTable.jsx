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
import { useEffect, useState } from "react";
import { uploadApi } from "../../api/admin/uploadApi";

const getStatusColor = (status) => {
  if (status === "COMPLETED") return "success";
  if (status === "FAILED") return "error";
  return "warning";
};

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString();
};

const UploadHistoryTable = ({ refreshKey = 0 }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      try {
        const response = await uploadApi.getUploadHistory();

        if (active) {
          setHistory(Array.isArray(response.data) ? response.data : []);
          setError("");
        }
      } catch {
        if (active) {
          setError("Failed to load upload history");
        }
      }
    };

    void loadHistory();

    return () => {
      active = false;
    };
  }, [refreshKey]);

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" mb={2}>
        Upload History
      </Typography>

      {error ? (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      ) : null}

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
          {!history.length ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No uploads yet
              </TableCell>
            </TableRow>
          ) : null}

          {history.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.filename}</TableCell>
              <TableCell>{formatDate(row.created_at)}</TableCell>

              <TableCell>
                <Chip
                  label={row.status}
                  color={getStatusColor(row.status)}
                />
              </TableCell>

              <TableCell>{row.valid_records}</TableCell>
              <TableCell>{row.duplicate_records}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UploadHistoryTable;
