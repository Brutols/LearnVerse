import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allCourses,
  getAllCourses,
  isRefresh,
} from "../../Reducers/coursesReducer/coursesReducer";
import CourseCardBO from './CourseCardBO';

const AllCourseCardBO = () => {
  const courses = useSelector(allCourses);
  const refresh = useSelector(isRefresh);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [refresh]);

  return (
    <>
      {courses &&
        courses.map((course, i) => (
          <CourseCardBO
            key={i}
            title={course.title}
            desc={course.desc}
            cover={course.cover}
            price={course.price.toFixed(2)}
            category={course.category}
            id={course._id}
          />
        ))}
    </>
  );
};

export default AllCourseCardBO;
