import { makeStyles } from '@material-ui/core/styles';

export const gridListStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    gridListCard: {
        maxWidth: "220px",
    },
    title: {
        color: theme.palette.primary.contrastText
    },
    icon: {
        color: 'white',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));
