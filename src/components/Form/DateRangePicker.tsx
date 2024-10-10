import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

type DateRangeProps = {
  selectedDate: string;
  onchange: (value: any) => void;
};

export const DateRange = ({ selectedDate, onchange }: DateRangeProps) => {
  return (
    <DateRangePicker
      onChange={onchange}
      value={selectedDate}
      clearIcon={null}
      dayPlaceholder="dd"
      monthPlaceholder="mm"
      yearPlaceholder="yyyy"
      format="dd/MM/y"
    />
  );
};
