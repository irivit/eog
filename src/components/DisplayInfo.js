import React from 'react';
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

const onLoad 
const DisplayInfo = props => {
    const { classes } = props;

    const temperature = (
        <ListItemText
            primary="Temperature:"
            secundary={props.lastTemp}
        />
    );
    const latitude = (
        <ListItemText
            primary="Latitude:"
            secundary={props.lat}
        />
    );
    const longitude = (
        <ListItemText
            primary="Longitude:"
            secundary={props.long}
        />
    );
    const time = (
        <ListItemText
            primary="Last Received:"
            secondary={`${Math.round(
                (Date.now() - props.lastTimestamp) / 1000
            )} seconds ago`}
        />
    );


    return (
        <Grid container className={classes.gridStyles}>
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardHeader title="Data Visualization" />
                    <CardContent>
                        <List>
                            <ListItem>
                                <Avatar>
                                    <Sun />
                                </Avatar>
                                {temperature}
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <Latit />
                                </Avatar>
                                {latitude}
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <Long />
                                </Avatar>
                                {longitude}
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <Time />
                                </Avatar>
                                {time}
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};


const mapStateToProps = (state, ownProps) => {
    return {
        state
    };
};

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({
            type: actions.DATA_FROM_DRONE,
        })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayInfo));