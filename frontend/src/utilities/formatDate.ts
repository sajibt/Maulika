import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";

dayjs.extend(relativeTime);
dayjs.locale("en");

//formatDate to A Relative date
export const formatDate = (date: string | Date): string => {
  return dayjs(date).fromNow();
};
