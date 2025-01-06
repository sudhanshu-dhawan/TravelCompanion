import React, { useEffect, useState, useCallback } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";

import { getPlacesData } from "./api/index";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces,setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ sw: {}, ne: {} });
  const [childClicked , setChildClicked] = useState(null);
  const [type , setType] = useState('restaurants');
  const [rating , setRating] = useState('');

  const [isLoading , setIsLoading] = useState(false);
  // Get user's current location on initial load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

    useEffect(()=>{
      const filteredPlaces = places.filter((place)=>place.rating > rating)
      setFilteredPlaces(filteredPlaces);
    },[rating])

  // Trigger fetch when coordinates or bounds change
  useEffect(() => {
      if(bounds.sw && bounds.ne){

      
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place)=>place.name && place.name && place.num_reviews>0));
          setFilteredPlaces([]);
          setIsLoading(false); 
        });
      }
  }, [bounds, type ]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List 
         
          childClicked = {childClicked}
          isLoading = {isLoading}
          places={filteredPlaces.length ? filteredPlaces : places}
          type={type}
          setType = {setType}
          rating = {rating}
          setRating = {setRating}
           />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
            
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
