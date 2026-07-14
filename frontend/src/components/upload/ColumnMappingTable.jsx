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
  "business_name",
  "category",
  "phone_number",
  "address",
  "city",
];

const OPTIONAL_FIELDS = [
  "state",
  "google_maps_link",
  "google_rating",
  "review_count",
  "email",
  "website_url",
  "whatsapp_number",
  "description",
  "business_hours",
  "remarks",
];

const BUSINESS_FIELDS = [
  ...REQUIRED_FIELDS,
  ...OPTIONAL_FIELDS,
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
          {BUSINESS_FIELDS.map((field) => (
            <TableRow key={field}>
              <TableCell>
                {field}
                {REQUIRED_FIELDS.includes(field) ? " *" : ""}
              </TableCell>

              <TableCell>
                <Select
                  fullWidth
                  size="small"
                  value={mapping[field] || ""}
                  onChange={(e) =>
                    handleChange(field, e.target.value)
                  }
                >
                  <MenuItem value="">
                    Not mapped
                  </MenuItem>

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
