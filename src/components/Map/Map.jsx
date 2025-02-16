import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import {Paper , Typography , useMediaQuery} from '@material-ui/core'
// import {LocationOutlinedIcon} from '@material-ui/icons/LocationOutlined'
import { LocationCityOutlined } from '@material-ui/icons'
import Rating from '@material-ui/lab/Rating'
import useStyles from './styles';
const Map = ({setCoordinates , setBounds , coordinates , places , setChildClicked}) => {

  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={''}
        onChange={(e)=>{
          console.log(e);
          setCoordinates({ lat: e.center.lat , lng: e.center.lng});
          setBounds({ne: e.marginBounds.ne , sw: e.marginBounds.sw});
        }}
        onChildClick={(child)=>{
          setChildClicked(child);
        }}
      >
        {
          places?.map((place , i)=>(
            <div className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {
                !isDesktop ? (
                  <LocationCityOutlined color='primary' fontSize='large'/>
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.Typography} variant='subtitle2' gutterBottom>
                      {place.name}
                    </Typography>
                    <img 
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url:'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt="" />
                    <Rating size="small" value={Number(place.rating)} readOnly /> 
                  </Paper>
                )
              }
              
            </div>
          ))
        }
      </GoogleMapReact>
    </div>
  )
}

export default Map
