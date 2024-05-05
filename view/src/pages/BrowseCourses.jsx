import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/mainLayout/MainLayout";
import "./browseCourses.scss";
import {
  Grid,
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
import CourseCardFO from "../components/courseCardFO/CourseCardFO";

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
                <CourseCardFO key={index} course={course} />
              ))
            : courses.map((course, index) => (
                <CourseCardFO key={index} course={course} />
              ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default BrowseCourses;
