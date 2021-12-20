import { webConstants } from "./webConstants";
import moment from "moment";

export const getTimeInFormat = time => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.TIME_FORMAT);
  return newTime;
};

export const getDateTimeInFormat = time => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.DATE_TIME_FORMAT);
  return newTime;
};

export const getUserTypeChatRoom = (item, userId) => {
  if (item.from === userId) {
    return webConstants.OWNER;
  }
};

export function getSocketNew() {
  return new WebSocket(webConstants.API.NEW_SOCKET_URL);
}
