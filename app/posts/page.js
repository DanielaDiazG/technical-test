"use client";
import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import {styled} from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import usePostsStore from "@/hooks/usePostsStore";
import styles from './page.module.css'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import TextField from "@mui/material/TextField";
import Link from 'next/link';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.common.black,
        fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function Posts() {
    const [showTextfield, setShowTextField] = useState(false)
    const {name} = JSON.parse(localStorage.getItem('user'));
    const {posts, createPost, getPosts} = usePostsStore()

    useEffect(() => {
        const {userId} = JSON.parse(localStorage.getItem('user'));
        getPosts(userId)
    }, [])

    const onSuccessCreate = () => {
        getPosts()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createPost({
            title: data.get('title'),
            body: data.get('post'),
            onSuccess: onSuccessCreate,
        })
    }

    return (
        <main className={styles.main}>
            <Typography component="h1" variant="h6" color="#33a4a9" gutterBottom>
                {`Welcome ${name}`}
            </Typography>
            {posts.length > 0 ?
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="posts table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Body</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <Link
                                            href={{
                                                pathname: '/coments',
                                                query: {post: post.id, title: post.title},
                                                as: '/coments'
                                            }}
                                        >
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{post.body}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <Typography component="h3" variant="h6" color="gray" gutterBottom
                            sx={{textAlign: "center", marginTop: 5,}}>
                    At the moment you have no posts
                </Typography>
            }
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2, bgcolor: '#a3ced4'}}
                    onClick={() => setShowTextField((prevState) => !prevState)}
                >
                    Creates a user post
                </Button>
            </Box>
            {showTextfield &&
                <Card sx={{width: "500px", margin: "auto"}}>
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: "15px",
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="title"
                                name="title"
                                autoFocus
                            />
                            <TextField
                                id="post"
                                label="post"
                                multiline
                                rows={4}
                                fullWidth
                                autoFocus
                                name="post"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, bgcolor: '#a3ced4'}}
                            >
                                Create
                            </Button>
                        </Box>
                    </Box>
                </Card>
            }
        </main>
    );
}
