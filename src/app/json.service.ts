import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class JsonService {
    constructor(private http: HttpClient) { }

    private newAddedNotification = new Subject<any>();
    newAddedNotificationData$ = this.newAddedNotification.asObservable();


    /**
     * Function to broadcast row id
     * @param newNotification 
     */
    broadcastNotification(newNotification) {
        // console.log('---service', newNotification)
        this.newAddedNotification.next(newNotification);
    }

    /**
     * Function to get chart data
     */
    getData() {
        return this.http
            .get('assets/test3.json')
    }

    /**
     * Function to get users data
     */
    getUsersData() {
        return this.http.get('assets/users.json')
    }
}