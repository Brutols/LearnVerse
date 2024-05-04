import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/mainLayout/MainLayout";
import "./browseCourses.scss";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import {
  allCourses,
  getAllCourses,
} from "../Reducers/coursesReducer/coursesReducer";
import { useEffect, useState } from "react";
import CategoryFilter from "../components/categoryFilter/CategoryFilter";

const BrowseCourses = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const courses = useSelector(allCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  return (
    <MainLayout>
      <Container sx={{ mt: 4 }}>
        <Paper style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h3" gutterBottom>
            Browse Courses
          </Typography>
          <Typography variant="body1">
            Welcome to our course catalog. Explore our selection of courses
            below and take your skills to the next level!
          </Typography>
        </Paper>
        <CategoryFilter setFilteredCourses={setFilteredCourses} />
        <Grid container spacing={3}>
          {filteredCourses.length > 0
            ? filteredCourses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <img
                      src={course.cover}
                      alt={course.title}
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography noWrap variant="h5" component="div">
                        {course.title}
                      </Typography>
                      <Typography noWrap variant="body2" color="text.secondary">
                        {course.desc}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {course.category}
                      </Typography>
                      <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                        {course.price.toFixed(2)} €
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : courses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <img
                      src={course.cover}
                      alt={course.title}
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography noWrap variant="h5" component="div">
                        {course.title}
                      </Typography>
                      <Typography noWrap variant="body2" color="text.secondary">
                        {course.desc}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {course.category}
                      </Typography>
                      <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                        {course.price.toFixed(2)} €
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default BrowseCourses;
