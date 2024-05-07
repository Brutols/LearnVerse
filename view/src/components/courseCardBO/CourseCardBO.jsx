import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import './courseCardBO.scss';


export default function CourseCardBO({title, desc, cover, price, category, id}) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/editCourse/${id}`)
  }

  const handleDeleteConfirm = () => {

  }

  return (
    <Card className='card'>
      <CardMedia
        component="img"
        alt={title}
        image={cover}
        className='card__img'
      />
      <CardContent className='card__content'>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" my={1} color="text.secondary">
          {desc}
        </Typography>
        <Typography variant="body2" my={1} color="text.secondary">
          {price} €
        </Typography>
        <Typography variant="body2" my={1} color="text.secondary">
          {category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small" onClick={handleRedirect}>Edit</Button>
        <Button color='error' variant='contained' size="small" onClick={handleDeleteConfirm}>Delete</Button>
      </CardActions>
    </Card>
  );
}