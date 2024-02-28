import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, IconButton, InputAdornment, Snackbar } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../../consts";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/auth/auth-slice";
import { AppDispatch, RootState } from "../../state/store";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const errorMessage: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.error
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const credentials = {
      email,
      password,
    };

    try {
      const actionResult = await dispatch(login(credentials));

      if (actionResult.payload) {
        // Successful login
        navigate(HOME_ROUTE);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const password = formData.get("password") as string;

    password.length > 3 ? setIsDisabled(false) : setIsDisabled(true);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white/35 py-12 px-4 rounded-3xl m-3">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "white", fontWeight: 600 }}
              component="h1"
              variant="h4"
            >
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              onChange={handleChange}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isDisabled}
                sx={{ mt: 3, mb: 2, borderRadius: "10px", fontSize: "18px" }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2">
                    <span
                      className="cursor-pointer text-lg"
                      onClick={() => navigate(REGISTRATION_ROUTE)}
                    >
                      Don't have account? Sign up
                    </span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
      {errorMessage && (
        <Snackbar open={errorMessage.length > 0}>
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default SignIn;
