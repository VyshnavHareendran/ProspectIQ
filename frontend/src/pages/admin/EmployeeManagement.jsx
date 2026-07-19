import { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Button,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Chip,
  TableSortLabel,
} from "@mui/material";
import AddEmployeeDialog from "../../components/employee/AddEmployeeDialog";
import EmployeeCreatedDialog from "../../components/employee/EmployeeCreatedDialog";
import { employeeManagementApi } from "../../api/admin/employeeManagementApi";
import ConfirmStatusDialog from "../../components/employee/ConfirmStatusDialog";
import AppSnackbar from "../../components/common/AppSnackbar";
import DeleteEmployeeDialog from "../../components/employee/DeleteEmployeeDialog";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  TablePagination,
} from "@mui/material";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [createdEmployee, setCreatedEmployee] = useState(null);

  const [openCreatedDialog, setOpenCreatedDialog] = useState(false);
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  
  const [anchorEl, setAnchorEl] = useState(null);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("full_name");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const response = await employeeManagementApi.getEmployees();

      setEmployees(response.data);
    } catch (err) {
      setSnackbar({
            open: true,
            message: "Unable to load employees.",
            severity: "error",
       });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (employee) => {
    try {
        await employeeManagementApi.changeStatus(
            employee.id,
            !employee.is_active
        );

        setEmployees((prev) =>
            prev.map((emp) =>
                emp.id === employee.id
                    ? {
                        ...emp,
                        is_active: !emp.is_active,
                    }
                    : emp
            )
        );

        setSnackbar({
            open: true,
            message: employee.is_active
                ? "Employee disabled successfully."
                : "Employee enabled successfully.",
            severity: "success",
        });

    } catch (error) {
        console.error(error);

        setSnackbar({
            open: true,
            message: "Unable to update employee status.",
            severity: "error",
        });
    }
    };

    const handleDeleteEmployee = async (employee) => {
        try {

            await employeeManagementApi.deleteEmployee(employee.id);

            // Remove employee from UI
            setEmployees((prev) => {

                const updatedEmployees = prev.filter(
                    (emp) => emp.id !== employee.id
                );

                const totalPages = Math.ceil(
                    updatedEmployees.length / rowsPerPage
                );

                if (page >= totalPages && page > 0) {
                    setPage(page - 1);
                }

                return updatedEmployees;
            });

            setSnackbar({
                open: true,
                message: "Employee deleted successfully.",
                severity: "success",
            });

        } catch (error) {

            console.error(error);

            setSnackbar({
                open: true,
                message: "Unable to delete employee.",
                severity: "error",
            });
        }
    };

    const openActionMenu = (event, employee) => {
        setAnchorEl(event.currentTarget);
        setSelectedEmployee(employee);
    };

    const closeActionMenu = () => {
        setAnchorEl(null);
    };

    const handleRequestSort = (property) => {

        const isAsc =
            orderBy === property &&
            order === "asc";

        setOrder(isAsc ? "desc" : "asc");

        setOrderBy(property);

        // NEW
        setPage(0);

    };

    const sortedEmployees = [...employees]
        .filter((employee) => {
            const search = searchTerm.toLowerCase();

            return (
                employee.full_name.toLowerCase().includes(search) ||
                employee.email.toLowerCase().includes(search)
            );
        })
        .sort((a, b) => {

            let valueA = a[orderBy];
            let valueB = b[orderBy];

            if (typeof valueA === "string") {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (typeof valueA === "boolean") {
                valueA = valueA ? 1 : 0;
                valueB = valueB ? 1 : 0;
            }

            if (valueA < valueB)
                return order === "asc" ? -1 : 1;

            if (valueA > valueB)
                return order === "asc" ? 1 : -1;

            return 0;

        });

    const paginatedEmployees = sortedEmployees.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  

  return (
        <Box>

         <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mb: 3,
            }}
        >
            <Typography variant="h3">
                Employee Management
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => setOpenDialog(true)}
            >
                Add Employee
            </Button>
        </Box>

       <Box mb={2}>
            <TextField
                fullWidth
                label="Search Employee"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(0);
                }}
            />
        </Box>

      <TableContainer
        component={Paper}
        sx={{
            width:"100%",
            overflowX:"auto",
        }}
      >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                    active={orderBy === "full_name"}
                    direction={orderBy === "full_name" ? order : "asc"}
                    onClick={() => handleRequestSort("full_name")}
                >
                    <strong>Name</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={() => handleRequestSort("email")}
                >
                    <strong>Email</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={orderBy === "role"}
                    direction={orderBy === "role" ? order : "asc"}
                    onClick={() => handleRequestSort("role")}
                >
                    <strong>Role</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={orderBy === "is_active"}
                    direction={orderBy === "is_active" ? order : "asc"}
                    onClick={() => handleRequestSort("is_active")}
                >
                    <strong>Status</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={orderBy === "must_change_password"}
                    direction={orderBy === "must_change_password" ? order : "asc"}
                    onClick={() => handleRequestSort("must_change_password")}
                >
                    <strong>Change Password</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

                {paginatedEmployees.map((employee) => (

                <TableRow key={employee.id} hover>

                <TableCell>{employee.full_name}</TableCell>

                <TableCell>{employee.email}</TableCell>

                <TableCell>{employee.role}</TableCell>

                <TableCell>
                  <Chip
                    label={
                      employee.is_active
                        ? "Active"
                        : "Inactive"
                    }
                    color={
                      employee.is_active
                        ? "success"
                        : "error"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      employee.must_change_password
                        ? "Yes"
                        : "No"
                    }
                    color={
                      employee.must_change_password
                        ? "warning"
                        : "success"
                    }
                  />
                </TableCell>

                <TableCell align="center">

                    <IconButton
                        onClick={(event) => openActionMenu(event, employee)}
                    >
                        <MoreVertIcon />
                    </IconButton>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

        <TablePagination
            component="div"
            count={sortedEmployees.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
        />

      </TableContainer>
            
      <AddEmployeeDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onEmployeeCreated={(employee) => {

                loadEmployees();

                // NEW
                setPage(0);

                setCreatedEmployee(employee);

                setOpenCreatedDialog(true);

            }}
      />

      <EmployeeCreatedDialog
            open={openCreatedDialog}
            employee={createdEmployee}
            onClose={() => {
                setOpenCreatedDialog(false);
                setCreatedEmployee(null);
            }}
            onCopy={() =>
                setSnackbar({
                open: true,
                message: "Password copied successfully.",
                severity: "success",
                })
            }
        />

        <ConfirmStatusDialog
            open={openStatusDialog}
            employee={selectedEmployee}
            onClose={() => {
                setOpenStatusDialog(false);
                setSelectedEmployee(null);
            }}
            onConfirm={async () => {
                await handleStatusChange(selectedEmployee);

                setOpenStatusDialog(false);
                setSelectedEmployee(null);
            }}
        />

        <DeleteEmployeeDialog
            open={openDeleteDialog}
            employee={selectedEmployee}
            onClose={() => {
                setOpenDeleteDialog(false);
                setSelectedEmployee(null);
            }}
            onConfirm={async () => {

                await handleDeleteEmployee(selectedEmployee);

                setOpenDeleteDialog(false);

                setSelectedEmployee(null);

            }}
        />

        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeActionMenu}
        >

            <MenuItem
                onClick={() => {

                    closeActionMenu();

                    setOpenStatusDialog(true);

                }}
            >

                <ListItemText>
                    {selectedEmployee?.is_active
                        ? "Disable Employee"
                        : "Enable Employee"}
                </ListItemText>

            </MenuItem>

            <MenuItem disabled>

                <ListItemText>
                    Edit Employee (Coming Soon)
                </ListItemText>

            </MenuItem>

            <MenuItem disabled>

                <ListItemText>
                    Reset Password (Coming Soon)
                </ListItemText>

            </MenuItem>

            <MenuItem
                sx={{ color: "error.main" }}
                onClick={() => {

                    closeActionMenu();

                    setOpenDeleteDialog(true);

                }}
            >

                <ListItemText>
                    Delete Employee
                </ListItemText>

            </MenuItem>

        </Menu>

        <AppSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={() =>
                setSnackbar((prev) => ({
                ...prev,
                open: false,
                }))
            }
        />

    </Box>
  );
};

export default EmployeeManagement;