"use client";
import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import usePostStore from "@/hooks/usePostStore";
import styles from './page.module.css'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import TextField from "@mui/material/TextField";

const style = {
    width: '100%',
    bgcolor: 'background.paper',
};


export default function Coments() {
    const [showTextfield, setShowTextField] = useState(false)
    const {comments, createComment, getComments} = usePostStore()

    const searchParams = new URLSearchParams(document.location.search)
    const postId = searchParams.get('post');

    useEffect(() => {
        getComments(postId)
    }, [])

    const onSuccessComent = () => {
        getComments(postId)
    }
    console.log(comments)
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createComment({
            name: data.get('name'),
            email: data.get('email'),
            comment: data.get('comment'),
            postId: postId,
            onSuccess: onSuccessComent,
        })
    }

    return (
        <main className={styles.main}>
            <Typography component="h1" variant="h6" color="#33a4a9" gutterBottom>
                {searchParams.get('title')}
            </Typography>
            {comments?.length > 0 ?
                <List sx={style} component="nav" aria-label="mailbox folders">
                    {comments.map((comment) => (
                        <>
                            <ListItem divider sx={{display: "flex", flexDirection: "column", alignItems: "baseline"}}>
                                <Typography variant="body1">
                                    {comment.body}
                                </Typography>
                                <Typography color="text.secondary" variant="body2" sx={{fontSize: '12px'}}>
                                    By: {comment.name} - {comment.email}
                                </Typography>
                            </ListItem>
                            <Divider/>
                        </>
                    ))}
                </List>
                : <Typography component="h4" variant="h6" color="gray" gutterBottom
                              sx={{textAlign: "center", marginTop: 5,}}>
                    There are no comments for the post </Typography>
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
                    Create a comment for the post
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
                                id="name"
                                label="name"
                                name="name"
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
                            <TextField
                                id="comment"
                                label="comment"
                                multiline
                                rows={4}
                                fullWidth
                                autoFocus
                                name="comment"
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
