import React, { useState, useEffect, useContext } from 'react'
import Container from "@material-ui/core/Container"
import { FeaturedPlaylists, Categories, LatestReleases } from "../Components";
import { AppContext } from "../Utils/context";

export default function MainApp(props) {
    const [token, setToken] = useState(props.token);
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        setToken(state.token);
    }, [state.token])

    return (
        <Container>
            <Categories token={token} />
            <FeaturedPlaylists token={token} />
            <LatestReleases token={token} />
        </Container>
    )
}
