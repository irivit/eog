import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import Plot from 'react-plotly.js';

import CardHeaderRaw from '@material-ui/core/CardHeader';

import * as actions from '../store/actions';

const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: 'white'
    }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = theme => ({
    graph: {
        height: '100%',
        width: '100%'
    },
    grid: {
        paddingTop: 50
    },
    card: {
        margin: '5% 25%'
    },
    toolbar: theme.mixins.toolbar
});

const Chart = props => {
    const { classes } = props;


    const xInfo = props.droneInfo.map(data =>
        moment(data.timestamp).format('kk:mm:ss')
    );
    const yInfo = props.droneInfo.map(data => data.metric);
    
    return (
        <Plot
            className={classes.graph}
            data={[
                {
                    x: xInfo,
                    y: yInfo,
                    type: 'linear',
                    marker: { color: 'gray' }
                }
            ]}
            layout={{
                xaxis: {
                    autotick: false,
                    dtick: 60
                },
                margin: {
                    l: 20,
                    r: 20,
                    t: 20,
                    b: 20
                }
            }}
        />
    );
};

const mapStateToProps = state => {
    const { droneInfo } = state.drone;
    return {
        droneInfo: droneInfo.data,
    };
};

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({
            type: actions.DATA_FROM_DRONE,
        })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Chart));
