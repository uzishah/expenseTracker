import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
} from "@mui/material";

const ProfileModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                bgcolor: "primary.main",
              }}
            >
              A
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              johndoe@example.com
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              defaultValue="John Doe"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              defaultValue="johndoe@example.com"
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              defaultValue="+123456789"
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
