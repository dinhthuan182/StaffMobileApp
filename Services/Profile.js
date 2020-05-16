import axios from 'axios';
import moment from 'moment';
import * as C from '../Constants';

export async function getSchedules(id, start, end) {
    
    try{
        let res = await axios.get(C.GET_SCHEDULES, { params: { start_at : start, end_at : end } });
        const {schedule_list} = res.data;
        const schedulesData = JSON.parse(JSON.stringify(schedule_list));

        var results = [{day: "Day", date: "Date", start_time: "Start", end_time: "End", total_time: "Total", header: true}]
        var sumHour = 0
        schedulesData.forEach(schedule => {

            schedule.day = moment(schedule.date, "DD-MM-YYYY").format('dddd')
            schedule.date = moment(schedule.date, "DD-MM-YYYY").format('DD/MM')
            if (schedule.start_time != null) {
                schedule.start_time = moment(schedule.start_time, "HH:mm:ss").format('HH:mm')
                schedule.end_time = moment(schedule.end_time, "HH:mm:ss").format('HH:mm')
                sumHour += schedule.total_time
            }

            if (schedule.checkin_time != null) {
                schedule.checkin_time = moment(schedule.checkin_time, "HH:mm:ss").format('HH:mm')
                schedule.checkout_time = moment(schedule.checkout_time, "HH:mm:ss").format('HH:mm')
            }

            if (moment().isAfter(moment(schedule.date, "DD-MM-YYYY"))){
                schedule.isAfter = true
            }
            
            results.push(schedule)
        });
        return [results, Number(sumHour).toFixed(2)];
    }catch (e) {
        throw handler(e);
        return null;
    }
}