import { Component, OnInit } from '@angular/core';
import { DateService } from '../date.service';

@Component({
    selector: 'app-open-timing',
    templateUrl: './open-timing.component.html',
    styleUrls: ['./open-timing.component.css']
})
export class OpenTimingComponent implements OnInit {

    constructor(private dateService: DateService) { }
    openTimeArray = [];
    ngOnInit() {
        // this.getOpenTiming();
    }

    getOpenTiming() {
        this.dateService.getDailyTimings().subscribe(res => {
            this.openTimeArray = res.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                };
            });
            //   console.log(" this.openTimeArray", this.openTimeArray);
        });
    }
    getFirstHalfTime(object) {
        let sTime;
        let eTime;
        if(object.mstartTime.hr == 0 && object.mendTime.hr == 0){
            return 'Closed';
        }
        if (object.mstartTime.hr > 12) {
            sTime = (object.mstartTime.hr - 12) + ':' + object.mstartTime.min + ' pm';
            eTime = (object.mendTime.hr - 12) + ':' + object.mendTime.min + ' pm';
        } else if (object.mstartTime.hr < 12 && object.mendTime.hr == 12) {
            sTime = object.mstartTime.hr + ':' + object.mstartTime.min + ' am';
            eTime = object.mendTime.hr + ':' + object.mendTime.min + ' pm';
        } else if (object.mstartTime.hr < 12 && object.mendTime.hr > 12) {
            sTime = object.mstartTime.hr + ':' + object.mstartTime.min + ' am';
            eTime = (object.mendTime.hr - 12) + ':' + object.mendTime.min + ' pm';
        } else {
            sTime = object.mstartTime.hr + ':' + object.mstartTime.min + ' am';
            eTime = object.mendTime.hr + ':' + object.mendTime.min + ' am';
        }
        return sTime + '  to  ' + eTime;
    }

    getSecondHalfTime(object) {
        let sTime;
        let eTime;
        if (object.estartTime.hr > 12) {
            sTime = (object.estartTime.hr - 12) + ':' + object.estartTime.min + ' pm';
            eTime = (object.eendTime.hr - 12) + ':' + object.eendTime.min + ' pm';
        } else if (object.estartTime.hr < 12 && object.eendTime.hr > 12) {
            sTime = object.estartTime.hr + ':' + object.estartTime.min + ' am';
            eTime = (object.eendTime.hr - 12) + ':' + object.eendTime.min + ' pm';
        } else if(object.estartTime.hr == 12 && object.eendTime.hr > 12){
            sTime = object.estartTime.hr + ':' + object.estartTime.min + ' pm';
            eTime = (object.eendTime.hr - 12) + ':' + object.eendTime.min + ' pm';
        }
        return sTime + '  to  ' + eTime;
    }

}
