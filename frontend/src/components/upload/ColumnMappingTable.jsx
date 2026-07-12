import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";

const REQUIRED_FIELDS = [
  "business_id",
  "name",
  "city",
  "state",
  "category_grouped",
  "stars",
  "review_count",
  "digital_maturity_score",
  "conversion_score_pct",
  "priority",
];

const ColumnMappingTable = ({
  columns = [],
  mapping = {},
  setMapping,
}) => {
  if (!columns.length) return null;

  const handleChange = (field, value) => {
    setMapping((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
      >
        Column Mapping
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>System Field</b>
            </TableCell>

            <TableCell>
              <b>CSV Column</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {REQUIRED_FIELDS.map((field) => (
            <TableRow key={field}>
              <TableCell>{field}</TableCell>

              <TableCell>
                <Select
                  fullWidth
                  size="small"
                  value={mapping[field] || ""}
                  onChange={(e) =>
                    handleChange(field, e.target.value)
                  }
                >
                  {columns.map((column) => (
                    <MenuItem
                      key={column}
                      value={column}
                    >
                      {column}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ColumnMappingTable;