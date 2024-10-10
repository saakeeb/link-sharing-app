import dayjs from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A');

export const formatTime = (time: string, format: string) =>
  dayjs(new Date(`1970-01-01T${time}`)).format(format);

export const getCurrentTime = () => {
  return new Date();
};

export const calculateDuration = (startTime: string, endTime: Date) => {
  const start = dayjs(startTime, 'HH:mm');
  const end = dayjs(endTime, 'HH:mm');

  const diffInMinutes = end.diff(start, 'minute');
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  let duration = '';
  if (hours > 0) {
    duration += `${hours}h `;
  }
  if (minutes > 0 || hours === 0) {
    duration += `${minutes}m`;
  }
  return duration.trim();
};

export const formatMinutes = (minutes: number) => {
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${mins}m`;
  } else if (hours > 0) {
    return `${hours}h ${mins}m`;
  } else if (mins > 0) {
    return `${mins}m`;
  }
};

export const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const FILTER_URL = (url: string, params: Record<string, any>) => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${toSnakeCase(key)}=${encodeURIComponent(value.toString())}`)
    .join('&');

  return `${url}${queryString ? '?' + queryString : ''}`;
};
