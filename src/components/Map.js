import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

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


// let input = process.env.API_KEY;
// var output = atob(input.replace(/\s/g, ""));
const MyMapComponent  = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDUH2TPQTih93EqVkUU2eFFJgF6O3V9wc4&v=3.exp&libraries=geometry,drawing,places",
    //   https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => {
    return (
      <GoogleMap defaultZoom={5} defaultCenter={{ lat: 29.76, lng: -95.37 }}>
        {props.isMarkerShown && (
          <Marker
            position={{ lat: props.lastPosition[0], lng: props.lastPosition[1] }}
          />
        )}
      </GoogleMap>
    );
  });

class Map extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    const {
        lastPosition,
    } = this.props;
    return (

    <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        lastPosition={lastPosition}
      />
    )
  }
}
const mapStateToProps = state => {
    const {
        lastPosition
    } = state.drone;
    console.log('esto es lo que busco'+JSON.stringify(state.drone));
    return {
        lastPosition
    };
};

// const mapDispatchToProps = dispatch => ({
//     onLoad: () =>
//         dispatch({
//             type: actions.DATA_FROM_DRONE,
//         })
// });

export default connect(mapStateToProps, null)(withStyles(styles)(Map));