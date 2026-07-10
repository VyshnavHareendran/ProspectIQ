import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
  InputAdornment,

   Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,

} from "@mui/material";
import { useState, useEffect } from "react";
import { businessApi } from "../api";

import {
  Add,
  RestartAlt,
  Search,
  BusinessCenter,
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";




export default function Business() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [businesses, setBusinesses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const fetchBusinesses = async () => {
  try {
    setLoading(true);

   const response = await businessApi.getBusinesses({
  page: 1,
  page_size: 20,
});

console.log("API Response:", response.data);
setBusinesses(response.data.items);

    console.log("FULL RESPONSE");
    console.log(response);

    console.log("DATA");
    console.log(response.data);

    console.log("ITEMS");
    console.log(response.data.items);

    setBusinesses(response.data.items);
    setError("");
  } catch (err) {
    console.log(err);
    setError("Failed to load businesses");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchBusinesses();
}, []);

  return (
    <Box sx={{ p: 4, pt: 2 }}>

  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      width: "100%",
      mb: 4,
    }}
  >

    <Box sx={{ flex: 1 }}>
      <Typography
        variant="h4"
        fontWeight={700}
      >
        Businesses
      </Typography>

      <Typography color="text.secondary">
        Manage all business leads
      </Typography>
    </Box>

    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={() => setOpenAdd(true)}
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: 3,
        textTransform: "none",
        fontWeight: 600,
        minWidth: 180,
      }}
    >
      Add Business
    </Button>

  </Stack>

  {/* Filters */}
<Card
  sx={{
    mb: 4,
    borderRadius: 5,
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  }}
>
  <CardContent>

    <Grid container spacing={2} alignItems="center">
      
        {/* Search */}

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search business name..."
        InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <Search sx={{ color: "gray" }} />
    </InputAdornment>
  ),
}}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: 2,
            },
          }}
        />
      </Grid>

      {/* City */}

      <Grid item xs={12} md={2}>
        <TextField
          select
          fullWidth
          defaultValue="City"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: 2,
            },
          }}
        >
          <MenuItem value="City">City</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="Los Angeles">Los Angeles</MenuItem>
          <MenuItem value="Chicago">Chicago</MenuItem>
        </TextField>
      </Grid>

      {/* Category */}

      <Grid item xs={12} md={2}>
        <TextField
          select
          fullWidth
          defaultValue="Category"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: 2,
            },
          }}
        >
          <MenuItem value="Category">Category</MenuItem>
          <MenuItem value="Restaurant">Restaurant</MenuItem>
          <MenuItem value="Cafe">Cafe</MenuItem>
          <MenuItem value="Gym">Gym</MenuItem>
        </TextField>
      </Grid>
    

      {/* Sort */}

      <Grid item xs={12} md={2}>
        <TextField
          select
          fullWidth
          defaultValue="Sort By"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: 2,
            },
          }}
        >
          <MenuItem value="Sort By">Sort By</MenuItem>
          <MenuItem value="Business Name">Business Name</MenuItem>
          <MenuItem value="Rating">Rating</MenuItem>
          <MenuItem value="Reviews">Reviews</MenuItem>
        </TextField>
      </Grid>

      {/* Order */}

      <Grid item xs={12} md={2}>
        <TextField
          select
          fullWidth
          defaultValue="Order"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: 2,
            },
          }}
        >
          <MenuItem value="Order">Order</MenuItem>
          <MenuItem value="Ascending">Ascending</MenuItem>
          <MenuItem value="Descending">Descending</MenuItem>
        </TextField>
      </Grid>

      {/* Reset */}

      <Grid item xs={12} md={1}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<RestartAlt />}
          sx={{
            height: 52,
            borderRadius: 2,
            textTransform: "none",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >
          Reset
        </Button>
      </Grid>

    </Grid>

  </CardContent>
</Card>

      {/* Table */}

<TableContainer
  component={Paper}
  sx={{
    borderRadius: 4,
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
    overflow: "hidden",
  }}
>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell sx={{ fontWeight: 700 }}>Business Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Google Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Reviews</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>
  {businesses.length === 0 ? (
    <TableRow>
      <TableCell colSpan={9}>
        <Box
          sx={{
            height: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BusinessCenter
            sx={{
              fontSize: 70,
              color: "#D1D5DB",
              mb: 2,
            }}
          />

          <Typography variant="h5" fontWeight={600}>
            No Businesses Found
          </Typography>

          <Typography color="text.secondary">
            Add your first business to get started.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  ) : (
    businesses.map((b) => (
      <TableRow hover key={b.id}>
        <TableCell>{b.business_name}</TableCell>

<TableCell>{b.category}</TableCell>

<TableCell>{b.city}</TableCell>

<TableCell>{b.phone_number}</TableCell>

<TableCell>{b.email}</TableCell>

<TableCell>{b.google_rating}</TableCell>

<TableCell>{b.review_count}</TableCell>

        <TableCell>
        <Box
  sx={{
    display: "inline-flex",
    px: 1.5,
    py: 0.5,
    borderRadius: 5,
    bgcolor:
      b.status === "NEW"
        ? "#DCFCE7"
        : b.status === "CONTACTED"
        ? "#DBEAFE"
        : "#FEE2E2",

    color:
      b.status === "NEW"
        ? "#15803D"
        : b.status === "CONTACTED"
        ? "#1D4ED8"
        : "#DC2626",

    fontWeight: 600,
    fontSize: 13,
  }}
>
  {b.status}
</Box>
        </TableCell>

        <TableCell align="center">
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
          >
            <Button

            size="small"
            variant="outlined"
startIcon={<Visibility />}
onClick={() => {
setSelectedBusiness(b);
setOpenView(true);
}}
>
              View
            </Button>

          <Button
size="small"
variant="outlined"
color="warning"
startIcon={<Edit />}
onClick={()=>{
setSelectedBusiness(b);
setOpenEdit(true);
}}
>
              Edit
            </Button>

           <Button
size="small"
variant="outlined"
color="error"
startIcon={<Delete />}
onClick={()=>{
setSelectedBusiness(b);
setOpenDelete(true);
}}
>
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

        </Table>

      </TableContainer>

      {/* Pagination */}

<Box
  sx={{
    mt: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.5,
  }}
>
  <Typography
    variant="body2"
    color="text.secondary"
  >
  Showing {businesses.length} ...
  </Typography>

  <Pagination
    count={1}
    page={1}
    color="primary"
  />
</Box>

{/* Add Business Dialog */}

<Dialog
  open={openAdd}
  onClose={() => setOpenAdd(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Add Business</DialogTitle>

  <DialogContent>
    <Stack spacing={2} mt={1}>
      <TextField label="Business Name" fullWidth />
      <TextField label="Category" fullWidth />
      <TextField label="City" fullWidth />
      <TextField label="Phone" fullWidth />
      <TextField label="Email" fullWidth />
    </Stack>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
    <Button variant="contained">Save</Button>
  </DialogActions>
</Dialog>

{/* View Dialog */}
<Dialog
  open={openView}
  onClose={() => setOpenView(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>Business Details</DialogTitle>

  <DialogContent>
    {selectedBusiness && (
      <Stack spacing={2} mt={1}>
        <Typography><b>Name:</b> {selectedBusiness.name}</Typography>
        <Divider />
        <Typography><b>Category:</b> {selectedBusiness.category}</Typography>
        <Divider />
        <Typography><b>City:</b> {selectedBusiness.city}</Typography>
        <Divider />
        <Typography><b>Phone:</b> {selectedBusiness.phone}</Typography>
        <Divider />
        <Typography><b>Email:</b> {selectedBusiness.email}</Typography>
        <Divider />
        <Typography><b>Rating:</b> {selectedBusiness.rating}</Typography>
        <Divider />
        <Typography><b>Reviews:</b> {selectedBusiness.reviews}</Typography>
        <Divider />
        <Typography><b>Status:</b> {selectedBusiness.status}</Typography>
      </Stack>
    )}
  </DialogContent>

  <DialogActions>
    <Button
      variant="contained"
      onClick={() => setOpenView(false)}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

{/* Edit Dialog */}
<Dialog
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Edit Business</DialogTitle>

  <DialogContent>
    {selectedBusiness && (
      <Stack spacing={2} mt={1}>
        <TextField
          fullWidth
          label="Business Name"
          defaultValue={selectedBusiness.name}
        />

        <TextField
          fullWidth
          label="Category"
          defaultValue={selectedBusiness.category}
        />

        <TextField
          fullWidth
          label="City"
          defaultValue={selectedBusiness.city}
        />

        <TextField
          fullWidth
          label="Phone"
          defaultValue={selectedBusiness.phone}
        />

        <TextField
          fullWidth
          label="Email"
          defaultValue={selectedBusiness.email}
        />
      </Stack>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenEdit(false)}>
      Cancel
    </Button>

    <Button variant="contained">
      Update
    </Button>
  </DialogActions>
</Dialog>

{/* Delete Dialog */}
<Dialog
  open={openDelete}
  onClose={() => setOpenDelete(false)}
>
  <DialogTitle>
    Delete Business
  </DialogTitle>

  <DialogContent>
    <Typography>
      Are you sure you want to delete this business?
    </Typography>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenDelete(false)}>
      Cancel
    </Button>

    <Button
      variant="contained"
      color="error"
      onClick={() => setOpenDelete(false)}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

</Box>
);
}
