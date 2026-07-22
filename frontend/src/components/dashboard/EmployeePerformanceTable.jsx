import {
  Card,
  CardContent,
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Box,
  LinearProgress,
} from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

const getRank = (index) => {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return index + 1;
};

const getInitials = (name) => {
  return name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};


const getChipColor = (rate) => {
  if (rate >= 75) return "success";
  if (rate >= 50) return "warning";
  return "error";
};

export default function EmployeePerformanceTable({
  data,
  loading,
  error,
}) {

  const rows = [...(data || [])].sort(
    (a, b) => b.conversion_rate - a.conversion_rate
  );

  const topPerformer = rows[0];

  return (
    <Card>
      <CardContent>

        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
        >

            <Typography
                variant="h6"
            >
                Employee Performance
            </Typography>

            {

                topPerformer && (

                    <Chip

                        icon={<EmojiEventsRoundedIcon />}

                        label={`Top Performer: ${topPerformer.employee_name}`}

                        color="warning"

                    />

                )

            }

        </Box>

        {loading ? (

          <Skeleton
            variant="rounded"
            height={350}
          />

        ) : error ? (

          <Typography color="error">
            {error}
          </Typography>

        ) : rows.length === 0 ? (

          <Typography color="text.secondary">
            No employee performance data available.
          </Typography>

        ) : (

          <TableContainer>

            <Table stickyHeader>

              <TableHead
                  sx={{
                      "& th": {
                          fontWeight: 700,
                          backgroundColor: "#fafafa",
                      },
                  }}
              >

                <TableRow>

                  <TableCell width={80}>
                      Rank
                  </TableCell>

                  <TableCell>
                      Employee
                  </TableCell>

                  <TableCell align="center">
                    Assigned
                  </TableCell>

                  <TableCell align="center">
                    Calls
                  </TableCell>

                  <TableCell align="center">
                    Follow-ups
                  </TableCell>

                  <TableCell align="center">
                    Closed
                  </TableCell>

                  <TableCell width={180}>
                      Conversion
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {rows.map((employee, index) => (

                  <TableRow
                        key={employee.employee_id}
                        hover
                        sx={{
                            backgroundColor:
                                index === 0
                                    ? "rgba(255, 193, 7, 0.08)"
                                    : "inherit",

                            "& td": {
                                fontWeight: index === 0 ? 600 : 400,
                            },

                            transition: "all 0.2s ease",

                            "&:hover": {
                                transform: "scale(1.003)",
                            },
                        }}
                  >
                  

                    <TableCell>

                        <Typography
                            fontSize={22}
                        >
                            {getRank(index)}
                        </Typography>

                    </TableCell>

                    <TableCell>

                        <Box
                            display="flex"
                            alignItems="center"
                            gap={1.5}
                        >

                            <Avatar
                                sx={{
                                    width: 34,
                                    height: 34,
                                    fontSize: 14,
                                }}
                            >
                                {getInitials(employee.employee_name)}
                            </Avatar>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >

                                {employee.employee_name}

                                {

                                    index === 0 && (

                                        <EmojiEventsRoundedIcon
                                            color="warning"
                                            fontSize="small"
                                        />

                                    )

                                }

                            </Box>

                        </Box>

                    </TableCell>

                    <TableCell align="center">
                      {employee.assigned_leads}
                    </TableCell>

                    <TableCell align="center">
                      {employee.calls_made}
                    </TableCell>

                    <TableCell align="center">
                      {employee.pending_followups}
                    </TableCell>

                    <TableCell align="center">
                      {employee.closed_leads}
                    </TableCell>

                    <TableCell>

                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1.5}
                        >

                          <Box
                            sx={{
                              width: 90,
                            }}
                          >

                            <LinearProgress
                              variant="determinate"
                              value={employee.conversion_rate}
                              color={getChipColor(employee.conversion_rate)}
                              sx={{
                                height: 8,
                                borderRadius: 5,
                              }}
                            />

                          </Box>

                          <Chip
                            label={`${employee.conversion_rate}%`}
                            color={getChipColor(employee.conversion_rate)}
                            size="small"
                          />

                        </Box>

                      </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </TableContainer>

        )}

      </CardContent>
    </Card>
  );
}