import { palette } from '@Themes';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

interface props {
  initialDate?: any;
  closeOnSelect?: () => void;
  onChange?: (val) => void
  isValidDate?: boolean;
  isOpen?: boolean;
  title?: string;
  disableFuture?: boolean;
  onClickCalendarDropdown?: () => void;
  monthYear?: any;
  calendarData?: any;
  handleReduceDate?: () => void;
  handleIncreaseDate?: () => void;
  date?: any;
}

const Calendar = ({ initialDate, closeOnSelect, onChange, isValidDate, isOpen = false, disableFuture = false, title, onClickCalendarDropdown, calendarData, handleReduceDate, handleIncreaseDate, date }: props) => {

  const { monthYear, currentDay, previousDay } = calendarData;

  const currentDate = moment();
  const disableDt = (current: any) => current.isAfter(currentDate, 'day');



  const checkIfToday = () => {
    let currentDate = new Date().toLocaleString('en-US')
    let currentDateSlice = currentDate.slice(0, 9)
    const dateSlice: any = date.toLocaleString('en-US').slice(0, 9)
    console.log("dafsdf", currentDateSlice === dateSlice)
    if (currentDateSlice === dateSlice) {
      return true
    } else {
      return false
    }
  }

  return (
    <div>

      <div>
        <div className="row justify-content-between mx-2 pt-2">
          <div className="" style={{ alignItems: "center" }}>
            <span className="text-primaryBlue" style={{ fontWeight: 'normal', fontSize: 12 }} >{title}</span>
          </div>
          <div className="mt--1">
            <span className="text-primaryBlue" style={{ fontWeight: 'normal', fontSize: 12, }}>{monthYear ? monthYear.toUpperCase() : ''}</span>
            <i className="bi bi-caret-down-fill pointer fa-xs ml-1 text-primaryBlue" onClick={onClickCalendarDropdown}></i>


          </div>

        </div>
        <div className="d-flex justify-content-end mr-2 mb-2 mt--1">
          <i className="bi bi-chevron-left pointer fa-xs mr-1"
            onClick={handleReduceDate}
          ></i>

          {previousDay !== 0 && <div className="d-flex align-items-center justify-content-center pointer" style={{ height: 20, width: 20, borderRadius: 10, boxShadow: '1px 1px 1px 1px rgba(0.1, 0.1, 0.1, 0.1)' }}
            onClick={() => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() - 1);
              console.log("Previous Date==>", newDate)
            }}
          >
            <span className="m-0" style={{ fontSize: 9 }}>{previousDay}</span>
          </div>}

          <div className="bg-primaryColor d-flex align-items-center justify-content-center pointer ml-2" style={{ height: 20, width: 20, borderRadius: 10, boxShadow: '1px 1px 1px 1px rgba(0.1, 0.1, 0.1, 0.2)', backgroundColor: palette.primaryBackground }}
            onClick={() => console.log("current Date==>", date)}
          >
            <h6 className="m-0" style={{ fontSize: 9, fontWeight: 'bold' }}>{currentDay}</h6>
          </div>

          {!checkIfToday() && <i className="bi bi-chevron-right pointer fa-xs ml-1"
            onClick={handleIncreaseDate}
          ></i>}
        </div>
      </div>

      {isOpen && (
        <div className='mt--1 mb-2' style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.4, 0.1, 0.1, 0.2)', }}>
          <Datetime
            input={false} // Hide the input field
            timeFormat={false} // Display only the date, not the time
            // closeOnSelect={closeOnSelect}
            onChange={(val) => {
              if (onChange) {
                onChange(val)
              }
            }}
            isValidDate={(current) => !disableDt(current)}

          />
        </div>
      )}

    </div>
  );
};

export { Calendar };

