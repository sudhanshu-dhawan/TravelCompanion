import React, { useEffect } from 'react'
import {Box , Typography , Button , Card , CardMedia , CardContent , CardActions , Chip} from '@material-ui/core'
import LocationOnIcon  from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating' 
import { FaCar } from "react-icons/fa";
import useStyles from './styles.js'


const PlaceDetails = ({place , selected , refProp}) => {
const classes = useStyles();

useEffect(() => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [selected, refProp]);

  return (
    <Card elevation={6}>
      <CardMedia
        style={{height:350}}
        image={place.photo ? place.photo.images.large.url:'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        
        <Box display="flex" justifyContent="space-between">
        <Rating value={Number(place.rating)} readOnly /> 
          <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award , index)=>(
          <Box key={index} my={1} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt="" />
            <Typography variant='subtitle2' color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {
          place?.cuisine?.map((cuisine,index)=>(
            <Chip key={index} size='small' label={cuisine.name} className={classes.chip}>

            </Chip>
          ))
        }

        {
          place?.address && (
            <Typography gutterBottom variant='subtitle2' color="textSecondary" className={classes.subtitle}>
              <LocationOnIcon/> {place.address}
            </Typography>
          )
        }

        {
          place?.phone && (
            <Typography gutterBottom variant='subtitle2' color="textSecondary" className={classes.subtitle}>
              <PhoneIcon/> {place.phone}
            </Typography>
          )
        }{
          place?.ride_providers &&(
            <Typography flex gutterBottom variant='subtitle2' color="textSecondary" className={classes.subtitle}>
                <FaCar/>   {place.ride_providers}
            </Typography>
          )
        }

        <CardActions>
          <Button size='small' color='secondary' onClick={()=>window.open(place.web_url , '_blank')}>
            Click to know more
          </Button>
          <Button  size='small' color='primary' onClick={()=>window.open(place.website, '_blank')}>
            Visit website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails
