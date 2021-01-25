import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > *': {
            fontSize: "5rem",
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    card: {
        width: "90%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
    },
    black: {
        backgroundColor: "black",
        minHeight: "120px",
        minWidth: "120px",
    }
}));

export default function Profile(props) {
    const classes = useStyles();

    useEffect(() => {

    }, []);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardActionArea>

                    {
                        props?.avatarUrl ?
                            <Avatar alt="Your avatar" src={props.userProfile.avatarUrl} />
                            :
                            <Avatar className={classes.black}>{props.userProfile.display_name ? props.userProfile.display_name[0].toUpperCase() : "Spot".toUpperCase()}</Avatar>
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Hello {props?.userProfile?.display_name ? props.userProfile.display_name.toUpperCase() : "Buddy"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            I hope you're enjoying the experience. For now you can take a look at the Genres, Featured Playlists and new Releases
          </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                    <Button size="small" color="primary">
                        Share
                     </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions> */}
            </Card>

        </div>
    );
}