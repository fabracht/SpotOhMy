import React, { useState, useEffect } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Skeleton from "@material-ui/lab/Skeleton"

import { gridListStyles } from "./Styles/GridList";


export default function LatestReleases(props) {
    const useStyles = gridListStyles;

    const [releases, setReleases] = useState({});
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const fetchReleases = async () => {
            let headers = new Headers({
                Authorization: `Bearer ${props.token}`
            })
            try {
                setLoading(true);
                const fetchResult = await fetch("https://api.spotify.com/v1/browse/new-releases", {
                    method: "GET",
                    headers
                });
                const result = await fetchResult.json();
                setReleases(result.albums)
                setLoading(false);
            } catch (exception) {
                // console.log(exception);
            }
        }
        if (props?.token) {
            fetchReleases();
        }
    }, [props.token])

    const generateReleaseList = () => {
        let result = [];
        if (releases?.items !== undefined) {
            result = generateGridListElement(releases.items);
        }
        return result;
    }

    const generateGridListElement = (items) => {
        return items.map((item, index) => {
            let { images, icons } = item;
            let imageItem = images ? images[0] : icons[0];
            let imageUri = imageItem?.url || "";
            return (<GridListTile key={item.id}>
                <img src={imageUri} alt={item.name} />
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
            <div className="latest-releases" >
                <h2>Released This Week</h2>
                <div className={classes.root} >
                    <GridList className={classes.gridList} cols={5.5}>
                        {loading ? generateSkeletonListElement() : generateReleaseList()}
                    </GridList>
                </div>
            </div>
        </>
    )
}
