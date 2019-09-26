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
    isLoading = false;
    ngOnInit() {
        this.getOpenTiming();
    }

    getOpenTiming() {
        this.isLoading = true;
        this.dateService.getDailyTimings().subscribe(res => {
            this.openTimeArray = res.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                };
            });
            this.openTimeArray = this.openTimeArray.sort(function(a, b) {
                return a.dayId - b.dayId  ||  a.name.localeCompare(b.name);
            });
              // console.log(" this.openTimeArray", this.openTimeArray);
              this.isLoading = false;
        });
    }
    getFirstHalfTime(object) {
        let sTime;
        let eTime;
        if(object.mstartTime.hr == 0 && object.mendTime.hr == 0){
            return 'Closed';
        }
        if(object.mstartTime.min == 0){
            object.mstartTime.min = "00";
        }
        if(object.mendTime.min == 0){
            object.mendTime.min = "00";
        }
        if (object.mstartTime.hr > 12) {
            sTime = (object.mstartTime.hr - 12) + ':' + object.mstartTime.min + ' PM';
            eTime = (object.mendTime.hr - 12) + ':' + object.mendTime.min + ' PM';
        } else if (object.mstartTime.hr < 12 && object.mendTime.hr == 12) {
            sTime = object.mstartTime.hr + ':' + object.mstartTime.min + ' AM';
            eTime = object.mendTime.hr + ':' + object.mendTime.min + ' PM';
        } else if (object.mstartTime.hr < 12 && object.mendTime.hr > 12) {
            sTime = object.mstartTime.hr + ':' + object.mstartTime.min + ' AM';
            eTime = (object.mendTime.hr - 12) + ':' + object.mendTime.min + ' PM';
        } else {
            sTime = object.mstartTime.hr + ':' + object.mstartTime.min + ' AM';
            eTime = object.mendTime.hr + ':' + object.mendTime.min + ' AM';
        }
        return sTime + '  to  ' + eTime;
    }

    getSecondHalfTime(object) {
        let sTime;
        let eTime;
        if(object.estartTime.min == 0){
            object.estartTime.min = "00";
        }
        if(object.eendTime.min == 0){
            object.eendTime.min = "00";
        }
        if (object.estartTime.hr > 12) {
            sTime = (object.estartTime.hr - 12) + ':' + object.estartTime.min + ' PM';
            eTime = (object.eendTime.hr - 12) + ':' + object.eendTime.min + ' PM';
        } else if (object.estartTime.hr < 12 && object.eendTime.hr > 12) {
            sTime = object.estartTime.hr + ':' + object.estartTime.min + ' AM';
            eTime = (object.eendTime.hr - 12) + ':' + object.eendTime.min + ' PM';
        } else if(object.estartTime.hr == 12 && object.eendTime.hr > 12){
            sTime = object.estartTime.hr + ':' + object.estartTime.min + ' PM';
            eTime = (object.eendTime.hr - 12) + ':' + object.eendTime.min + ' PM';
        }
        return sTime + '  to  ' + eTime;
    }

}
