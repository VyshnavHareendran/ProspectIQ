import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";


const MyLeadsTable = ({
    leads,
    onViewBusiness,
}) => {
  return (
    <TableContainer
        component={Paper}
        sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
        }}
    >

      <Table>

        <TableHead
            sx={{
                backgroundColor: "#F8FAFC",
            }}
        >

          <TableRow>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Business
            </TableCell>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Category
            </TableCell>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                City
            </TableCell>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Lead Score
            </TableCell>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Priority
            </TableCell>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Status
            </TableCell>

            <TableCell align = "center"
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Assigned Date
            </TableCell>

            <TableCell align = "center"
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Remarks
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {leads.map((lead) => (

            <TableRow
                key={lead.assignment_id}
                hover
                sx={{
                    "&:last-child td": {
                    borderBottom: 0,
                    },
                }}
            >

              <TableCell>

                <Button
                    variant="text"
                    disableRipple
                    onClick={() => onViewBusiness(lead.business_id)}
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
                    {lead.business_name}
                </Button>

              </TableCell>

              <TableCell>
                {lead.category}
              </TableCell>

              <TableCell>
                {lead.city}
              </TableCell>

              <TableCell align="center">
                <Typography fontWeight={700}>
                    {Number(lead.lead_score).toFixed(1)}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Chip
                    label={lead.priority}
                    color={
                        lead.priority?.toUpperCase() === "HIGH"
                            ? "error"
                            : lead.priority?.toUpperCase() === "MEDIUM"
                            ? "warning"
                            : "success"
                    }
                    size="small"
                />
              </TableCell>

              <TableCell>

                <Chip
                  label={lead.status}
                  color={
                    lead.status === "NEW"
                        ? "warning"
                        : lead.status === "IN_PROGRESS"
                        ? "info"
                        : lead.status === "FOLLOW_UP"
                        ? "secondary"
                        : lead.status === "CLOSED"
                        ? "success"
                        : "default"
                  }
                />

              </TableCell>

              <TableCell>
                {new Date(
                    lead.assigned_date
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {lead.remarks || "-"}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>
  );
};

export default MyLeadsTable;