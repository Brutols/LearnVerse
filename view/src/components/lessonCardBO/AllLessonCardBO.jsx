import { useDispatch, useSelector } from "react-redux";
import LessonCardBO from "./LessonCardBO";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { editLessonOrder, getLessonsOrder, singleLessonsOrder } from "../../Reducers/lessonsOrderReducer/lessonsOrderReducer";
import { useEffect, useState } from "react";
import { isRefresh } from "../../Reducers/coursesReducer/coursesReducer";
import { isLessonsRefresh } from "../../Reducers/lessonsReducer/lessonsReducer";


const AllLessonCardBO = ({id}) => {
  const dispatch = useDispatch();
  const lessonsOrder = useSelector(singleLessonsOrder);
  const refresh = useSelector(isRefresh);
  const lessonsRefresh = useSelector(isLessonsRefresh);
  const [lessons, setLessons] = useState([]);

  const onDragEnd = (result) => {
    const {destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newLessonsOrder = Array.from(lessons);
    const movedElement = newLessonsOrder.splice(source.index, 1);
    newLessonsOrder.splice(destination.index, 0, ...movedElement);
    setLessons(newLessonsOrder);
    dispatch(editLessonOrder({id: lessonsOrder._id, newLessonsOrder: newLessonsOrder}));
  }

  useEffect( () => {
    const getLessonsData = async () => {
      const res = await dispatch(getLessonsOrder(id))
      await setLessons(res.payload.lessonsOrder)
    }
    getLessonsData();
  }, [refresh, lessonsRefresh, id])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lessonsDroppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lessons &&
              lessons.map((lesson, i) => (
                <LessonCardBO
                  title={lesson.title}
                  desc={lesson.desc}
                  cover={lesson.cover}
                  fileUrl={lesson.fileUrl}
                  lessonId={lesson._id}
                  key={i}
                  id={i}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AllLessonCardBO;
