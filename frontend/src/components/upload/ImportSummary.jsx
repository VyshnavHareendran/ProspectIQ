import { Grid, Paper, Typography } from "@mui/material";

const Card = ({ title, value }) => (
  <Paper sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

const ImportSummary = ({ data }) => {
  if (!data) return null;

  const duplicates =
    (data.csv_duplicates || 0) + (data.database_duplicates || 0);

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item xs={12} md={3}>
        <Card title="Imported" value={data.imported_rows || 0} />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card title="Invalid" value={data.invalid_rows || 0} />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card title="Duplicates" value={duplicates} />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card title="Total" value={data.total_rows || 0} />
      </Grid>
    </Grid>
  );
};

export default ImportSummary;
