import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ImportResultDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Import Successful</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 1 }}>
          Imported : <strong>245</strong>
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Invalid : <strong>5</strong>
        </Typography>

        <Typography>
          Duplicates : <strong>8</strong>
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