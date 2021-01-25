import React, { useState, useEffect } from 'react';

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from '@material-ui/core/GridList';
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Skeleton from "@material-ui/lab/Skeleton"

import { gridListStyles } from "./Styles/GridList";
export default function FeaturedPlaylists(props) {
    const useStyles = gridListStyles;
    const [featuredPlaylists, setFeaturedPlaylists] = useState({});
    const classes = useStyles();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchFeaturedPlaylists = async () => {
            let headers = new Headers({
                Authorization: `Bearer ${props.token}`
            })
            setLoading(true);
            const fetchResult = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
                method: "GET",
                headers
            });
            const result = await fetchResult.json();
            setFeaturedPlaylists(result.playlists);
            setLoading(false);
        }
        if (props?.token) {
            fetchFeaturedPlaylists();
        }

    }, [props])


    const generateFeaturedList = () => {
        let result = [];
        if (featuredPlaylists?.items !== undefined) {
            result = generateGridListElement(featuredPlaylists.items);
        }
        return result;
    }

    const generateGridListElement = (items) => {
        return items.map((item, index) => {
            let { images, icons } = item;
            let imageItem = images ? images[0] : icons[0];
            let imageUri = imageItem?.url || "";
            return (<GridListTile key={item.id}>
                <img src={imageUri} alt={item.name} className={classes.gridListCard} />
                <GridListTileBar
                    title={item.name}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                    actionIcon={
                        <IconButton aria-label={`star ${item.name}`}>
                            <PlayArrowIcon className={classes.title} />
                        </IconButton>
                    }
                />
            </GridListTile>
            );
        })
    }

    const generateSkeletonListElement = () => {
        let result = [];
        for (let i = 0; i < 20; ++i) {
            result.push(<GridListTile key={i}>
                <Skeleton variant="rect" width={210} height={118} />
            </GridListTile>)
        }
        return result;
    }

    return (
        <>
            <h2>Featured Playlists</h2>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={5.5}>
                    {loading ? generateSkeletonListElement() : generateFeaturedList()}
                </GridList>
            </div>
        </>
    )
}
