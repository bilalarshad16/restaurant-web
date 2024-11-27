import {notification} from 'antd';
// type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const MyAlert = (type, message, desc) => {
    notification[type]({
      message: message,
      description:
        desc,
    });
  };