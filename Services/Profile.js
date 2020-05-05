import axios from 'axios';

import * as C from '../Constants';

export async function getSchedules(id, start, end) {
    
    try{
        let res = await axios.get(C.GET_SCHEDULES, { params: { start_at : start, end_at : end } });
        const {schedule_list} = res.data;
        console.log(start)
        console.log(end)
        console.log(schedule_list)
        const schedulesData = JSON.parse(JSON.stringify(schedule_list));

        schedulesData.forEach(schedule => {
            
        });

        return schedulesData;
    }catch (e) {
        throw handler(e);
        return null;
    }
}