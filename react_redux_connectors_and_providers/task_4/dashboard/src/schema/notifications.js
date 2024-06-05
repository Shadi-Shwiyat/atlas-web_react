import { schema, normalize } from 'normalizr';
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

// Normalize the notifications data
const normalizedData = normalize(notificationsData.default, [notification]);

// Define the notifications normalizer function
const notificationsNormalizer = (data) => {
  return normalize(data, [notification]);
};

// Export the entities and the normalizer function
export { user, message, notification, notificationsNormalizer };

// Function to get all notifications by user
export function getAllNotificationsByUser(userId) {
  const { notifications, messages } = normalizedData.entities;
  const userNotifications = [];
  
  // Loop through each notification to find matching userId
  for (const notificationId in notifications) {
    const notification = notifications[notificationId];
    if (notification.author === userId) {
      userNotifications.push(notification);
    }
  }
  
  const userContexts = [];
  
  // Loop through each matching notification to get its context
  for (const notification of userNotifications) {
    userContexts.push(messages[notification.context]);
  }
  
  return userContexts;
}
