import moment from "moment/moment";

export default function parseDate(date: number): string {
  return moment(date).format("DD.MM HH:mm");
}
