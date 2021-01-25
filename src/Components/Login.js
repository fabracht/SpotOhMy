import React, { useState, useEffect, useContext } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from "../Utils/context";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    myButton: {
        padding: "1rem 3rem",
        color: "white",
        borderColor: "white",
    },
    container: {
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export default function Login() {
    let stateKey = 'spotify_auth_state';
    // eslint-disable-next-line
    const [params, setParams] = useState(getHashParams());
    // eslint-disable-next-line
    const [token, setToken] = useState(params.access_token);
    const { dispatch } = useContext(AppContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const loginButton = () => {
        setOpen(!open);

        var client_id = '67575ef54da549c4b68e75d78927652c'; // Your client id
        var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

        var state = generateRandomString(16);

        localStorage.setItem(stateKey, state);
        var scope = 'user-read-private user-read-email user-read-playback-state';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        window.location = url;
    }

    useEffect(() => {
        dispatch({ type: "SET_TOKEN", payload: token });
        return () => {
        }
        // eslint-disable-next-line
    }, [params, token])

    if (token) {
        // console.log("Redirecting");
        return <Redirect to={{ pathname: "/" }}></Redirect>;
    } else {
        return (
            <>
                <Container className={classes.container}>
                    <Paper className={classes.paper}>
                        <Grid container wrap="wrap" spacing={1}>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="h2" component="h2" >First, log in to spotify!</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Button className={classes.myButton} variant="outlined" color="primary" size="large" onClick={loginButton}>
                        Login
                    </Button>
                    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Container >
            </>
        )
    }
}


function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

