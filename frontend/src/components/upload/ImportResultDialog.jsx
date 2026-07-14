import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ImportResultDialog = ({ open, handleClose, result }) => {
  const duplicates =
    (result?.csv_duplicates || 0) + (result?.database_duplicates || 0);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {result?.success ? "Import Successful" : "Import Failed"}
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 1 }}>
          Imported : <strong>{result?.imported_rows || 0}</strong>
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Invalid : <strong>{result?.invalid_rows || 0}</strong>
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Duplicates : <strong>{duplicates}</strong>
        </Typography>

        <Typography>
          Total : <strong>{result?.total_rows || 0}</strong>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportResultDialog;
