import { format } from 'date-fns';

function formatDate(date: string): string {
  const currentDate: Date = new Date();
  const diffInMinutes: number = Math.abs((currentDate.getTime() - new Date(date).getTime()) / (1000 * 60)); // Difference in minutes

  if (diffInMinutes < 1) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  } else {
    return format(date, 'MMM dd, yyyy');
  }
}

export default formatDate;