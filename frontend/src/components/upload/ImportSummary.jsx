import { Grid, Paper, Typography } from "@mui/material";

const Card = ({ title, value }) => (
  <Paper sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

const ImportSummary = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item xs={12} md={3}>
        <Card title="Imported" value={245} />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card title="Invalid" value={5} />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card title="Duplicates" value={8} />
      </Grid>

      <Grid item xs={12} md={3}>
        <Card title="Total" value={258} />
      </Grid>
    </Grid>
  );
};

export default ImportSummary;