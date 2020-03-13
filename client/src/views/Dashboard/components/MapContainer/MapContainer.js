import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import transactions from '../RecentTransactions/transactions.json';

const mapStyles = {
  width: '100%',
  height: '100%'
};

var t = JSON.parse(transactions); //get all transactions
t = t.reverse(); //newest transaction first
t = t[0]; //only use the first transaction

var latitude, longitude, name, address;

if (t.merchant===null){ //default marker: monzo address
   latitude= 51.520510;
   longitude= -0.085454;
   name= 'Monzo';
   address= '33 Finsbury Square, Finsbury, London EC2A 1PL'
 }

else {
    latitude= t.merchant.address.latitude;
    longitude= t.merchant.address.longitude;
    name= t.merchant.name;
    address= t.merchant.address.short_formatted
  }


export class MapContainer extends Component {
    state = {
    showingInfoWindow: true,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},        //Shows the infoWindow to the selected place upon a marker
    latitude: latitude,
    longitude: longitude,
    name: name,
    address: address
  };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: this.state.latitude,
          lng: this.state.longitude
       }}
      >
      <Marker
        onClick={this.onMarkerClick}
        name={this.state.name}
        address={this.state.address}
      />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
          <h5>{this.state.selectedPlace.address}</h5>
        </div>
      </InfoWindow>
      </Map>
    );
  }
}

var config = require('../../../../config.json');

export default GoogleApiWrapper({
  apiKey: config.google_api_key
})(MapContainer);
