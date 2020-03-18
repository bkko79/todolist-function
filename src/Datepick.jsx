import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker,MuiPickersUtilsProvider } from '@material-ui/pickers';

const Picker = ({id, onChangeTime}) => {
    const [isOpen, setIsOpen] = useState(false);
    const todayDate = new Date();

    const toggleOn = () => {
        setIsOpen(true);
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
    }

    const toggleOff = () => {
        setIsOpen(false);
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    const setDate = (date) => {
        onChangeTime(id, date.toLocaleString('ja-jp'));
    }

    return(
        <div className="todo-calendar">
        <span role="img" aria-label="timer" onClick={toggleOn}>⏱️</span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker 
                open={isOpen}
                onOpen={toggleOn}
                onClose={toggleOff}
                value={todayDate} 
                onChange={(date) => setDate(date)}
                TextFieldComponent={() => null}
                minDate={new Date()}
                ampm={false}
                format="yyyy/MM/dd HH:mm"
            />
        </MuiPickersUtilsProvider>
    </div>        
    )
}

export default Picker