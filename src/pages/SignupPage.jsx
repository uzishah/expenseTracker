import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { auth, db, googleProvider } from "../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { blue } from "@mui/material/colors";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Handle Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = auth.currentUser;

      console.log("Firestore Instance:", db); // Debugging Firestore instance

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        profilePic: null,
        uid: user.uid,
      });

      await updateProfile(user, {
        displayName: name,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup Failed: " + error.message);
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        profilePic: user.photoURL,
        uid: user.uid,
      });

      alert("Google Signup Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Signup Error:", error);
      alert("Google Signup Failed: " + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" mb={2}>
          Signup
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleGoogleSignup}
        >
          Continue with Google
        </Button>
        <Typography variant="body2" align="center" sx={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2196f3" }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Signup;
