import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function SignIn( { createUser }) {
    const [gender, setGender] = useState("unspecified");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createUser({
            name:data.get('name'),
            email: data.get('email'),
            gender: data.get('gender'),
        })
    };

    return (
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: '#ffff',
                        padding: "25px",
                        borderRadius: "5px",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#a3ced4' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create an account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Select
                            name="gender"
                            label="gender"
                            labelId="gender"
                            id="gender"
                            value={gender}
                            onChange={(event)=>{setGender(event.target.value)}}
                            fullWidth
                        >
                            <MenuItem value="male">male</MenuItem>
                            <MenuItem value="female">female</MenuItem>
                            <MenuItem value="unspecified">unspecified</MenuItem>
                        </Select>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor:'#a3ced4'}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
    );
}
