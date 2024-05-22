import { schema } from 'normalizr';
import * as notificationsData from '../../../notifications.json';

// Define the user entity
const user = new schema.Entity('users');

// Define the message entity with guid as the idAttribute
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });

// Define the notification entity with author and context relationships
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

// Export the entities for use in other parts of the application
export { user, message, notification };

export function getAllNotificationsByUser(userId) {
  return notificationsData.default.filter(notification => notification.author.id === userId).map(notification => notification.context);
}
