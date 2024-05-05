import React, { useEffect } from "react";
import MainLayout from "../layouts/mainLayout/MainLayout";
import { Typography, Button, Container, Grid, Card, CardContent, Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { allCourses, getAllCourses } from "../Reducers/coursesReducer/coursesReducer";
import { useNavigate } from "react-router-dom";
import CourseCardFO from "../components/courseCardFO/CourseCardFO";

const features = [
  {
    title: 'Interactive Learning',
    description: 'Engage with interactive quizzes, assignments, and projects to reinforce your learning.'
  },
  {
    title: 'Expert Instructors',
    description: 'Learn from industry experts with real-world experience and practical insights.'
  },
  {
    title: 'Flexible Schedule',
    description: 'Study at your own pace with on-demand access to course materials and lectures.'
  }
];

const Homepage = () => {
  const courses = useSelector(allCourses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(courses);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [])

  return (
    <>
      <MainLayout>
      <div>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" color="text.primary" gutterBottom>
            Welcome to Our Online Learning Platform
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Explore our wide range of courses taught by industry experts. Start learning today to advance your career!
          </Typography>
          <Button onClick={() => navigate('/browseCourses')} variant="contained" color="primary" size="large" sx={{ mt: 2 }} fullWidth>
            Browse Courses
          </Button>
        </Container>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Popular Courses
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course, index) => (
            <CourseCardFO key={index} course={course}/>
          ))}
        </Grid>
      </Container>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
      </MainLayout>
    </>
  );
};

export default Homepage;
