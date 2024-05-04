import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from "react-redux";
import { allCourses } from "../../Reducers/coursesReducer/coursesReducer";

export default function CategoryFilter({ setFilteredCourses }) {
  const courses = useSelector(allCourses);
  const [value, setValue] = React.useState('All');

  const categories = [];

  courses.map((course) => {
    if (!categories.includes(course.category)) {
      categories.push(course.category);
    }
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (value === "All") {
      setFilteredCourses([]);
    } else {
      const filtered = courses.filter((course) => {
        return course.category === value;
      });
      setFilteredCourses(filtered);
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Category</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        {categories.map((category, i) => (
          <FormControlLabel
            key={i}
            value={category}
            control={<Radio />}
            label={category}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
