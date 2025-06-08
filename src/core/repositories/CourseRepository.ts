import { CourseEntity } from "core/entity/Course";
import { CreateCourseRepository } from "core/useCases/CreateCourse/CreateCourseRepository";

export interface CourseRepository extends CreateCourseRepository {}
