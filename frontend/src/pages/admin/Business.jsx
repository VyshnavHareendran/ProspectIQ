import {
  Add,
  BusinessCenter,
  Delete,
  Edit,
  RestartAlt,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { businessApi } from "../../api";

const emptyBusinessForm = {
  business_name: "",
  category: "",
  description: "",
  phone_number: "",
  whatsapp_number: "",
  email: "",
  website_url: "",
  address: "",
  city: "",
  state: "",
  google_maps_link: "",
  google_rating: "0",
  review_count: "0",
  business_hours: "",
  remarks: "",
  status: "NEW",
};

const requiredFields = [
  "business_name",
  "category",
  "phone_number",
  "address",
  "city",
];

const statusStyles = {
  NEW: { color: "#15803D", backgroundColor: "#DCFCE7" },
  CONTACTED: { color: "#1D4ED8", backgroundColor: "#DBEAFE" },
  QUALIFIED: { color: "#7C2D12", backgroundColor: "#FFEDD5" },
};

const cleanOptional = (value) => {
  if (value === undefined || value === null) return undefined;
  const trimmed = String(value).trim();
  return trimmed === "" ? undefined : trimmed;
};

const normalizeUrl = (value) => {
  const cleaned = cleanOptional(value);
  if (!cleaned) return undefined;
  return cleaned.startsWith("http://") || cleaned.startsWith("https://")
    ? cleaned
    : `https://${cleaned}`;
};

const buildMapsLink = (form) => {
  const existing = normalizeUrl(form.google_maps_link);
  if (existing) return existing;

  const query = [
    form.business_name,
    form.address,
    form.city,
    form.state,
  ]
    .map((item) => cleanOptional(item))
    .filter(Boolean)
    .join(" ");

  return `https://maps.google.com/?q=${encodeURIComponent(query || form.business_name || "business")}`;
};

const toBusinessPayload = (form, includeCreateFields = true) => {
  const payload = {
    business_name: form.business_name.trim(),
    category: form.category.trim(),
    description: cleanOptional(form.description),
    phone_number: form.phone_number.trim(),
    whatsapp_number: cleanOptional(form.whatsapp_number),
    email: cleanOptional(form.email),
    website_url: normalizeUrl(form.website_url),
    address: form.address.trim(),
    city: form.city.trim(),
    state: cleanOptional(form.state),
    google_maps_link: buildMapsLink(form),
    google_rating: Number(form.google_rating || 0),
    review_count: Number(form.review_count || 0),
    business_hours: cleanOptional(form.business_hours),
    remarks: cleanOptional(form.remarks),
  };

  if (includeCreateFields) {
    payload.data_source = "MANUAL";
  } else {
    payload.status = cleanOptional(form.status);
  }

  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  return payload;
};

const getStatusStyle = (status) =>
  statusStyles[status] || {
    color: "#475569",
    backgroundColor: "#E2E8F0",
  };

const formatValue = (value) =>
  value === undefined || value === null || value === "" ? "-" : value;

const businessToForm = (business) => ({
  ...emptyBusinessForm,
  ...business,
  google_rating: String(business?.google_rating ?? 0),
  review_count: String(business?.review_count ?? 0),
});

function BusinessFormDialog({
  open,
  title,
  form,
  setForm,
  onClose,
  onSubmit,
  saving,
  isEdit = false,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth required label="Business Name" name="business_name" value={form.business_name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth required label="Category" name="category" value={form.category} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth required label="Phone" name="phone_number" value={form.phone_number} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="WhatsApp" name="whatsapp_number" value={form.whatsapp_number} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Website" name="website_url" value={form.website_url} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required label="Address" name="address" value={form.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth required label="City" name="city" value={form.city} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="State" name="state" value={form.state} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Google Maps Link" name="google_maps_link" value={form.google_maps_link} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth type="number" label="Google Rating" name="google_rating" value={form.google_rating} onChange={handleChange} inputProps={{ min: 0, max: 5, step: 0.1 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth type="number" label="Review Count" name="review_count" value={form.review_count} onChange={handleChange} inputProps={{ min: 0 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Business Hours" name="business_hours" value={form.business_hours} onChange={handleChange} />
          </Grid>
          {isEdit ? (
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Status" name="status" value={form.status} onChange={handleChange}>
                {["NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Description" name="description" value={form.description} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={2} label="Remarks" name="remarks" value={form.remarks} onChange={handleChange} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Business() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    category: "",
    sort_by: "created_at",
    sort_order: "desc",
  });
  const [form, setForm] = useState(emptyBusinessForm);
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const filterOptions = useMemo(() => {
    const cities = [...new Set(businesses.map((item) => item.city).filter(Boolean))].sort();
    const categories = [...new Set(businesses.map((item) => item.category).filter(Boolean))].sort();
    return { cities, categories };
  }, [businesses]);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        page_size: pageSize,
        sort_by: filters.sort_by,
        sort_order: filters.sort_order,
      };

      if (filters.search.trim()) params.search = filters.search.trim();
      if (filters.city) params.city = filters.city;
      if (filters.category) params.category = filters.category;

      const response = await businessApi.getBusinesses(params);
      setBusinesses(Array.isArray(response.data?.items) ? response.data.items : []);
      setTotal(response.data?.total || 0);
      setError("");
    } catch {
      setError("Failed to load businesses");
    } finally {
      setLoading(false);
    }
  }, [filters, page, pageSize]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchBusinesses();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchBusinesses]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setPage(1);
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const missingField = requiredFields.find((field) => !form[field]?.trim());
    if (missingField) {
      setError("Please fill all required business fields.");
      return false;
    }

    const rating = Number(form.google_rating || 0);
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      setError("Google rating must be between 0 and 5.");
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      await businessApi.addBusiness(toBusinessPayload(form, true));
      setOpenAdd(false);
      setForm(emptyBusinessForm);
      setSuccess("Business created successfully.");
      await fetchBusinesses();
    } catch (createError) {
      setError(createError.response?.data?.detail || "Failed to create business");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedBusiness || !validateForm()) return;

    try {
      setSaving(true);
      await businessApi.updateBusiness(selectedBusiness.id, toBusinessPayload(form, false));
      setOpenEdit(false);
      setSelectedBusiness(null);
      setSuccess("Business updated successfully.");
      await fetchBusinesses();
    } catch (updateError) {
      setError(updateError.response?.data?.detail || "Failed to update business");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBusiness) return;

    try {
      setSaving(true);
      await businessApi.deleteBusiness(selectedBusiness.id);
      setOpenDelete(false);
      setSelectedBusiness(null);
      setSuccess("Business deleted successfully.");
      await fetchBusinesses();
    } catch (deleteError) {
      setError(deleteError.response?.data?.detail || "Failed to delete business");
    } finally {
      setSaving(false);
    }
  };

  const resetFilters = () => {
    setPage(1);
    setFilters({
      search: "",
      city: "",
      category: "",
      sort_by: "created_at",
      sort_order: "desc",
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700}>Businesses</Typography>
          <Typography color="text.secondary">Manage all business leads</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setForm(emptyBusinessForm);
            setOpenAdd(true);
          }}
          sx={{ alignSelf: { xs: "stretch", sm: "center" }, minWidth: 172, py: 1.25, fontWeight: 700 }}
        >
          Add Business
        </Button>
      </Stack>

      <Card sx={{ mb: 3, overflow: "visible" }}>
        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search business..."
                InputProps={{ startAdornment: <InputAdornment position="start"><Search color="action" /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ minWidth: 78 }}>
              <TextField select fullWidth label="City" name="city" value={filters.city} onChange={handleFilterChange}>
                <MenuItem value="">All cities</MenuItem>
                {filterOptions.cities.map((city) => <MenuItem key={city} value={city}>{city}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ minWidth: 105 }}>
              <TextField select fullWidth label="Category" name="category" value={filters.category} onChange={handleFilterChange}>
                <MenuItem value="">All categories</MenuItem>
                {filterOptions.categories.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField select fullWidth label="Sort By" name="sort_by" value={filters.sort_by} onChange={handleFilterChange}>
                <MenuItem value="created_at">Created</MenuItem>
                <MenuItem value="business_name">Business Name</MenuItem>
                <MenuItem value="google_rating">Rating</MenuItem>
                <MenuItem value="city">City</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField select fullWidth label="Order" name="sort_order" value={filters.sort_order} onChange={handleFilterChange}>
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button fullWidth variant="outlined" startIcon={<RestartAlt />} onClick={resetFilters} sx={{ minHeight: 44, whiteSpace: "nowrap", fontWeight: 700 }}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {error ? <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert> : null}
      {success ? <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>{success}</Alert> : null}

      <TableContainer component={Paper} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, boxShadow: "0 8px 25px rgba(0,0,0,.08)", overflowX: "auto" }}>
        <Table sx={{ minWidth: 1180 }} aria-label="Businesses">
          <TableHead>
            <TableRow sx={{ "& th": { bgcolor: "background.paper", borderBottomColor: "divider", color: "text.secondary", fontSize: "0.75rem", fontWeight: 750, textTransform: "uppercase", whiteSpace: "nowrap" } }}>
              <TableCell>Business Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Google Rating</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center" sx={{ position: "sticky", right: 0, zIndex: 2, minWidth: 148, boxShadow: "-8px 0 16px rgba(15,23,42,0.04)" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <Box role="status" sx={{ display: "grid", minHeight: 260, placeItems: "center" }}>
                    <Stack alignItems="center" spacing={1.5}>
                      <CircularProgress size={28} thickness={4} />
                      <Typography color="text.secondary" variant="body2">Loading businesses...</Typography>
                    </Stack>
                  </Box>
                </TableCell>
              </TableRow>
            ) : null}
            {!loading && businesses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <Box sx={(theme) => ({ display: "grid", minHeight: 260, placeItems: "center", textAlign: "center", backgroundColor: alpha(theme.palette.primary.main, 0.03) })}>
                    <Stack alignItems="center" spacing={1}>
                      <BusinessCenter sx={{ fontSize: 48, color: "text.disabled" }} />
                      <Typography variant="h5" fontWeight={700}>No Businesses Found</Typography>
                      <Typography color="text.secondary" variant="body2">Add your first business to get started.</Typography>
                    </Stack>
                  </Box>
                </TableCell>
              </TableRow>
            ) : null}
            {!loading ? businesses.map((business) => (
              <TableRow hover key={business.id} sx={{ "&:last-child td": { borderBottom: 0 }, "& td": { py: 1.75, verticalAlign: "middle" } }}>
                <TableCell sx={{ minWidth: 210 }}><Typography fontWeight={700}>{formatValue(business.business_name)}</Typography></TableCell>
                <TableCell>{formatValue(business.category)}</TableCell>
                <TableCell>{formatValue(business.city)}</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>{formatValue(business.phone_number)}</TableCell>
                <TableCell sx={{ maxWidth: 220 }}><Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{formatValue(business.email)}</Typography></TableCell>
                <TableCell>{formatValue(business.google_rating)}</TableCell>
                <TableCell>{formatValue(business.review_count)}</TableCell>
                <TableCell><Chip label={formatValue(business.status)} size="small" sx={{ borderRadius: 999, fontWeight: 800, ...getStatusStyle(business.status) }} /></TableCell>
                <TableCell align="center" sx={{ position: "sticky", right: 0, zIndex: 1, minWidth: 148, bgcolor: "background.paper", boxShadow: "-8px 0 16px rgba(15,23,42,0.04)" }}>
                  <Stack direction="row" spacing={0.75} justifyContent="center">
                    <Tooltip title="View business">
                      <IconButton size="small" onClick={() => { setSelectedBusiness(business); setOpenView(true); }}><Visibility fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Edit business">
                      <IconButton size="small" onClick={() => { setSelectedBusiness(business); setForm(businessToForm(business)); setOpenEdit(true); }}><Edit fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete business">
                      <IconButton size="small" color="error" onClick={() => { setSelectedBusiness(business); setOpenDelete(true); }}><Delete fontSize="small" /></IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary">Showing {businesses.length} of {total} businesses</Typography>
        <Pagination count={totalPages} page={page} color="primary" onChange={(_, value) => setPage(value)} />
      </Box>

      <BusinessFormDialog open={openAdd} title="Add Business" form={form} setForm={setForm} onClose={() => setOpenAdd(false)} onSubmit={handleCreate} saving={saving} />
      <BusinessFormDialog open={openEdit} title="Edit Business" form={form} setForm={setForm} onClose={() => setOpenEdit(false)} onSubmit={handleUpdate} saving={saving} isEdit />

      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Business Details</DialogTitle>
        <DialogContent>
          {selectedBusiness ? (
            <Stack spacing={1.5} mt={1}>
              {[
                ["Name", selectedBusiness.business_name],
                ["Category", selectedBusiness.category],
                ["Phone", selectedBusiness.phone_number],
                ["Email", selectedBusiness.email],
                ["Website", selectedBusiness.website_url],
                ["Address", selectedBusiness.address],
                ["City", selectedBusiness.city],
                ["State", selectedBusiness.state],
                ["Rating", selectedBusiness.google_rating],
                ["Reviews", selectedBusiness.review_count],
                ["Status", selectedBusiness.status],
              ].map(([label, value]) => (
                <Box key={label}>
                  <Typography><b>{label}:</b> {formatValue(value)}</Typography>
                  <Divider sx={{ mt: 1.5 }} />
                </Box>
              ))}
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Business</DialogTitle>
        <DialogContent>
          <Typography>Delete {selectedBusiness?.business_name || "this business"}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} disabled={saving}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={saving}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
