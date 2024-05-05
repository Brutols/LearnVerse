import React from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseCardFO = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card onClick={() => navigate(`/course/${course._id}`)}>
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
          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            {course.price.toFixed(2)} €
          </Typography>
        </CardContent>
        </div>
      </Card>
    </Grid>
  );
};

export default CourseCardFO;
