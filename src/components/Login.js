import * as React from 'react';
import {useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';
import GoogleButton from 'react-google-button';

 

const theme = createTheme();

export default function SignIn({setAlert}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async() => {
    if(!email || !password){
      setAlert({open:true,message:"Please enter email and password",type:"error"});
      return;
  }

try {
  const User = await signInWithEmailAndPassword(auth,email, password);
  console.log(User);
  setAlert({open:true,message:`${User.user.email} is successfully logged in`,type:"success"});
  navigate('/success-login');
}
catch (error) {
  console.log(error);
  setAlert({open:true,message:error.message,type:"error"});
  return ;
}
  };

  const signInWithGoogle = () => {
    // using google signin as popup it as takes a call to show what ever the result we get with this method

    signInWithPopup(auth,googleProvider
    ).then(result => {
     
      setAlert({
        open: true,
        message:`sign up successfull. Welcome ${result.user.displayName}`,
        type:"success",
      })
      console.log(result);
      navigate('/success-login');
      

    }
    )
    .catch(error => {
      setAlert({
        open: true,
        message:error.message,
        type:"error",
      })
    })
    return ;

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
               value = {email}
               onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value = {password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                 to="/sign-up" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box  >
                  <span>
                    OR
                  </span>
                  <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
        </Box> 
      </Container>
    </ThemeProvider>
  );
}