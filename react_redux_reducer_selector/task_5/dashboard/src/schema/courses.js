import { schema, normalize } from 'normalizr';

// Define the course entity
const course = new schema.Entity('courses');

// Define function to normalize the courses data
const coursesNormalizer = (data) => {
  return normalize(data, [course]);
};

export { course, coursesNormalizer };
