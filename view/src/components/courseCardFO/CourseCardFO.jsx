import React from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../Reducers/navReducer/navReducer";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import './courseCardFO.scss'

const CourseCardFO = ({ course }) => {
  const navigate = useNavigate();
  const loggedUser = useSelector(user);

  const isSubscribed = loggedUser.myCourses ? loggedUser.myCourses.find((item) => item._id === course._id) : null;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className="courseCardFO" onClick={() => navigate(`/course/${course._id}`)}>
        <div style={{cursor: 'pointer'}}>
        <img
          src={course.cover}
          alt={course.title}
          style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
        />
        <CardContent>
          <Typography noWrap variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {course.desc}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Instructor: {course.category}
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h6" component="div">
            {course.price.toFixed(2)} €
          </Typography>
          {isSubscribed && <BeenhereIcon color="success"/>}
          </div>
        </CardContent>
        </div>
      </Card>
    </Grid>
  );
};

export default CourseCardFO;
