import React, { Component } from "react";
import { connect } from 'react-redux';

import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import AvatarRaw from "@material-ui/core/Avatar";
import { Grid } from '@material-ui/core';

//Icons
import Sun from '@material-ui/icons/WbSunny';
import Latit from '@material-ui/icons/VerticalAlignBottom';
import Long from '@material-ui/icons/KeyboardTab';
import Time from '@material-ui/icons/AvTimer';

import * as actions from '../store/actions';


const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: "white"
    }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const avatarStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: "white"
    }
});
const Avatar = withStyles(avatarStyles)(AvatarRaw);

const styles = {
    card: {
        margin: "5% 25%"
    }
};

class Drone extends Component {
    componentDidMount() {
        this.props.onLoad();
    }
    render() {
        const {
            lastPosition,
            lastTemp,
            lastTimestamp,
        } = this.props;
        return (
            // const { classes } = props;
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardHeader title="Data Visualization" />
                        <CardContent>
                            <List>
                                <ListItem>
                                    <Avatar>
                                        <Sun />
                                    </Avatar>
                                    <ListItemText primary="Temperature:" secundary={lastTemp} />
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <Latit />
                                    </Avatar>
                                    <ListItemText primary="Latitude:" secundary={lastPosition} />
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <Long />
                                    </Avatar>
                                    <ListItemText primary="Longitude:" secundary={lastPosition} />
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <Time />
                                    </Avatar>
                                    <ListItemText primary="Last Received:" secondary={`${Math.round(
                                        (Date.now() - lastTimestamp) / 1000)} seconds ago`} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const {
        lastPosition,
        lastTemp,
        lastTimestamp,
        lastAccuracy
    } = state.drone;
    return {
        lastPosition,
        lastTemp,
        lastTimestamp,
        lastAccuracy
    };
};

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({
            type: actions.DATA_FROM_DRONE,
        })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Drone));