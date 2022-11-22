import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getISODatetoWIB(date: string): string {
  return dayjs(date).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm');
}
