import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export function ConfirmDialog({ open, title = 'Confirm', text, onCancel, onConfirm, confirmColor = 'error', action_text }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      {text && (
        <DialogContent>
          <Typography>{text}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color={confirmColor} variant="contained">{action_text}</Button>
      </DialogActions>
    </Dialog>
  );
}
