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

export default function LeadAssignmentTable({
  leadScores,
  employees,
  assignments,
  onAssign,
  onViewBusiness,
}) {
  const getEmployeeName = (businessId) => {
    const assignment = assignments.find(
      (item) => item.business_id === businessId
    );

    if (!assignment) return "Not Assigned";

    const employee = employees.find(
      (item) => item.id === assignment.employee_id
    );

    return employee
      ? employee.full_name
      : "Unknown Employee";
  };

  return (
    <TableContainer component={Paper}>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>Business</TableCell>

            <TableCell>Category</TableCell>

            <TableCell>City</TableCell>

            <TableCell>Lead Score</TableCell>

            <TableCell>Priority</TableCell>

            <TableCell>Assigned To</TableCell>

            <TableCell align="center">
              Action
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {leadScores.map((lead) => {

            const assigned =
              assignments.find(
                (item) =>
                  item.business_id === lead.business.id
              );

            return (

              <TableRow key={lead.id}>

                <TableCell>
                    <Button
                        variant="text"
                        disableRipple
                        onClick={() =>
                            onViewBusiness?.(lead.business.id)
                        }
                        sx={{
                            p: 0,
                            minWidth: "auto",
                            textTransform: "none",
                            fontWeight: 600,
                            color: "primary.main",
                            justifyContent: "flex-start",

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
                  {lead.lead_score}
                </TableCell>

                <TableCell>

                  <Chip
                    label={lead.priority}
                    color={
                      lead.priority === "HIGH"
                        ? "error"
                        : lead.priority === "MEDIUM"
                        ? "warning"
                        : "success"
                    }
                  />

                </TableCell>

                <TableCell>

                  {getEmployeeName(
                    lead.business.id
                  )}

                </TableCell>

                <TableCell align="center">

                <Button
                    variant="contained"
                    onClick={() =>
                        onAssign(
                            lead,
                            assigned
                        )
                    }
                >
                    {assigned ? "Reassign" : "Assign"}
                </Button>

                </TableCell>

              </TableRow>

            );
          })}

        </TableBody>

      </Table>

    </TableContainer>
  );
}