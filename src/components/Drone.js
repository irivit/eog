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

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//Icons
import Sun from '@material-ui/icons/WbSunny';
import Latit from '@material-ui/icons/VerticalAlignBottom';
import Long from '@material-ui/icons/KeyboardTab';
import Time from '@material-ui/icons/AvTimer';

import * as actions from '../store/actions';

import Graphic from './Chart';
import Map from './Map';


const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main,
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
    },
    root: {
        flexGrow: 1
    }
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}


class Drone extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentDidMount() {
        this.props.onLoad();
    }


    render() {
        const {
            lastPosition,
            lastTemperature,
            lastTimestamp,
            secAgo
        } = this.props;
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <Grid container className={classes.gridStyles}>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardHeader title="Data Visualization" />
                        <CardContent>
                            <NoSsr>
                                <div >
                                    <AppBar position="static">
                                        <Tabs variant="fullWidth" value={value} onChange={this.handleChange} centered>
                                            <LinkTab label="Numeric" href="page1" />
                                            <LinkTab label="Graphic" href="page2" />
                                            <LinkTab label="Map" href="page3" />
                                        </Tabs>
                                    </AppBar>
                                    {value === 0 && <TabContainer>
                                        <List>
                                            <ListItem>
                                                <Avatar>
                                                    <Sun />
                                                </Avatar>
                                                <ListItemText primary="Temperature (F):" secondary={lastTemperature} />
                                            </ListItem>
                                            <ListItem>
                                                <Avatar>
                                                    <Latit />
                                                </Avatar>
                                                <ListItemText primary="Latitude:" secondary={lastPosition[0]} />
                                            </ListItem>
                                            <ListItem>
                                                <Avatar>
                                                    <Long />
                                                </Avatar>
                                                <ListItemText primary="Longitude:" secondary={lastPosition[1]} />
                                            </ListItem>
                                            <ListItem>
                                                <Avatar>
                                                    <Time />
                                                </Avatar>
                                                <ListItemText primary="Last Received:" secondary={`${secAgo} seconds ago`} />
                                            </ListItem>
                                        </List>
                                    </TabContainer>}
                                    {value === 1 && <TabContainer>
                                        <Graphic />
                                    </TabContainer>}
                                    {value === 2 && <TabContainer>
                                        <Map />
                                    </TabContainer>}
                                </div>
                            </NoSsr>
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
        lastTemperature,
        lastTimestamp,
        lastAccuracy,
        secAgo
    } = state.drone;
    return {
        lastPosition,
        lastTemperature,
        lastTimestamp,
        lastAccuracy,
        secAgo
    };
};

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({
            type: actions.DATA_FROM_DRONE,
        })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Drone));