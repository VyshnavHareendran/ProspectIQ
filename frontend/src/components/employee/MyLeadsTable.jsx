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

import CallRoundedIcon from "@mui/icons-material/CallRounded";

const MyLeadsTable = ({
    leads,
    onUpdate,
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
                Status
            </TableCell>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Assigned Date
            </TableCell>

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Remarks
            </TableCell>

            <TableCell align = "center"
                sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    fontSize: 13,
                }}
            >
                Action
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {leads.map((lead) => (

            <TableRow
                key={lead.id}
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
                    onClick={() =>
                        onViewBusiness(
                            lead.business.id
                        )
                    }
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
                    {lead.business.business_name}
                </Button>

              </TableCell>

              <TableCell>
                {lead.business.category}
              </TableCell>

              <TableCell>
                {lead.business.city}
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
                  lead.assigned_at
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {lead.remarks || "-"}
              </TableCell>

              <TableCell align="center">
                <Button
                    variant="contained"
                    startIcon={<CallRoundedIcon />}
                    onClick={() => onUpdate(lead)}
                >
                    Call
                </Button>
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>
  );
};

export default MyLeadsTable;