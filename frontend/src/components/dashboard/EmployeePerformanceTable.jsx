import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'

const EmployeePerformanceTable = ({
  data = [],
  loading = false,
  error = '',
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>

        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">
            Employee Performance
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Employee productivity overview.
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Skeleton
            variant="rounded"
            height={300}
          />
        ) : data.length === 0 ? (
          <Box
            sx={{
              minHeight: 250,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Stack spacing={1} alignItems="center">
              <GroupsRoundedIcon color="action" />

              <Typography fontWeight={700}>
                No employee data
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Employee performance will appear here.
              </Typography>
            </Stack>
          </Box>
        ) : (
          <TableContainer>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell><strong>Employee</strong></TableCell>

                  <TableCell align="center">
                    <strong>Assigned Leads</strong>
                  </TableCell>

                  <TableCell align="center">
                    <strong>Calls Made</strong>
                  </TableCell>

                  <TableCell align="center">
                    <strong>Pending Follow-ups</strong>
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {data.map((employee) => (

                  <TableRow key={employee.employee_name} hover>

                    <TableCell>
                      {employee.employee_name}
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

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </TableContainer>
        )}

      </CardContent>
    </Card>
  )
}

export default React.memo(EmployeePerformanceTable)