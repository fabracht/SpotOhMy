import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MainApp from './MainApp';
import Profile from "../Components/Profile";
import { AppContext } from "../Utils/context";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "black",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Menu() {
    const { state } = useContext(AppContext);
    const classes = useStyles();
    const [token, setToken] = useState(state.token);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        setToken(state.token);
    }, [state.token])

    useEffect(() => {
        const fetchUserInfo = async () => {
            let headers = new Headers({
                Authorization: `Bearer ${token}`
            });
            try {
                const fetchResult = await fetch("https://api.spotify.com/v1/me/", {
                    method: "GET",
                    headers
                });
                const results = await fetchResult.json();
                setUserProfile(results);
            } catch (exception) {
                // console.log(exception);
            }
        };
        if (token) {
            fetchUserInfo();
        }
    }, [token])
    if (!token) {
        return <Redirect to={{ pathname: "/login" }}></Redirect>;
    } else {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            SpotOhMy!
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <Profile userProfile={userProfile} />
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Toolbar />
                    <MainApp token={token} />
                </main>
            </div>
        );
    }
}