// utils/time.js
export const minutesToTime = (minutes) => `${Math.floor(minutes / 60).toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}`;

export const timeToMinutes = (time) => time ? time.split(':').reduce((acc, curr, i) => acc + parseInt(curr) * (i === 0 ? 60 : 1), 0) : 0;

export const addHours = (time, hoursToAdd) => {
  if (!time) return '';
  const totalMinutes = timeToMinutes(time) + hoursToAdd * 60;
  return minutesToTime(totalMinutes % (24 * 60));
};

export const calculateDuration = (start, end) => {
  if (!start || !end) return '00:00';
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  let durationMinutes = endMinutes - startMinutes;
  if (durationMinutes < 0) durationMinutes += 24 * 60;
  return minutesToTime(durationMinutes);
};
