import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material'

const priorities = [
  { label: 'Priority', value: '' },
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
]

const getPriorityLabel = (value) =>
  priorities.find((priority) => priority.value === value)?.label || 'Priority'

const selectPlaceholderProps = (renderValue) => ({
  displayEmpty: true,
  renderValue,
})

const LeadScoreFilters = ({
  categoryOptions = [],
  cityOptions = [],
  filters,
  onFilterChange,
  onReset,
}) => (
  <Card
    sx={{
      borderRadius: 5,
      boxShadow: '0 8px 25px rgba(0,0,0,.08)',
    }}
  >
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search business name..."
            value={filters.search}
            onChange={(event) => onFilterChange('search', event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 52,
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            value={filters.priority}
            onChange={(event) => onFilterChange('priority', event.target.value)}
            SelectProps={selectPlaceholderProps((value) => getPriorityLabel(value))}
            slotProps={{
              select: selectPlaceholderProps((value) => getPriorityLabel(value)),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 52,
                borderRadius: 2,
              },
            }}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority.label} value={priority.value}>
                {priority.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            value={filters.city}
            onChange={(event) => onFilterChange('city', event.target.value)}
            SelectProps={selectPlaceholderProps((value) => value || 'City')}
            slotProps={{
              select: selectPlaceholderProps((value) => value || 'City'),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 52,
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="">City</MenuItem>
            {cityOptions.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
            SelectProps={selectPlaceholderProps((value) => value || 'Category')}
            slotProps={{
              select: selectPlaceholderProps((value) => value || 'Category'),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 52,
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="">Category</MenuItem>
            {categoryOptions.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<RestartAltRoundedIcon />}
            onClick={onReset}
            sx={{
              height: 52,
              borderRadius: 2,
              textTransform: 'none',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)

export default LeadScoreFilters
