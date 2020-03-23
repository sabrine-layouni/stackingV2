//import { ParkingsModel } from './../models/parkings.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommonService {

    private message = new Subject<any>();
    private parkingsDetails = new Subject<any>();
    private dataDrag = new Subject<any>();
    private areaBoxOpened = new Subject<any>();
    private menuChange = new Subject<any>();
    private displayPopinParking = new Subject<any>();
    private unselect = new Subject<any>();

    message$ = this.message.asObservable();
    parkingsDetails$ = this.parkingsDetails.asObservable();
    dataDrag$ = this.dataDrag.asObservable();
    areaBoxOpened$ = this.areaBoxOpened.asObservable();
    menuChange$ = this.menuChange.asObservable();
    displayPopinParking$ = this.displayPopinParking.asObservable();
    unselect$ = this.unselect.asObservable();

    getMessage(message: any) {
        this.message.next(message);
    }

    getParkingsDetails(parkingsDetails: any) {
        this.parkingsDetails.next(parkingsDetails)
    }

    sendDataDrag(data: any) {
        this.dataDrag.next(data);
    }

    notifyAreaBoxOpened() {
        this.areaBoxOpened.next();
    }

    menuModeChange(mode: any = null) {
        this.menuChange.next(mode);
    }

    notifyDisplayPopinParking() {
        this.displayPopinParking.next();
    }

    unselectAll() {
        this.unselect.next();
    }

    /**
     * To set the parking class and have the picto
     * @param {number} value 
     */
    public getClass(value: string) {
        switch (value.toLocaleLowerCase()) {
            case "voitures":
                return "cars";
            case "camions":
                return "trucks";
            case "vélos":
                return "bikes";
            case "motos":
                return "motorBikes";
            case "moto":
                return "motorBikes";
            case "vélo":
                return "bikes";
            case "vélo":
                return "bikes";
            case "voiture intérieur":
                return "cars";
            case "voiture extérieur":
                return "cars";
            case "poids lourd":
                return "trucks";
            default:
                return "cars";
        }
    }
    // .car, .motorBike, .bike, .truck 

    public getClassDetails(value: string) {
        switch (value.toLocaleLowerCase()) {
            case "voitures":
                return "car";
            case "camions":
                return "truck";
            case "vélos":
                return "bike";
            case "motos":
                return "motorBike";
            case "moto":
                return "motorBike";
            case "vélo":
                return "bike";           
            default:
                return "cars";
        }
    }

   /* public newParkingArray(occupancyid: string) {
        return [
                new ParkingsModel({
                    nb: 0,
                    type: 'voitures',
                    occupancyid: occupancyid
                })

            , new ParkingsModel({
                nb: 0,
                type: 'Camions',
                occupancyid: occupancyid       
            })
            ,new ParkingsModel({
                nb: 0,
                type: 'Vélos',
                occupancyid: occupancyid       
            }), new ParkingsModel({
                nb: 0,
                type: 'Motos',
                occupancyid: occupancyid     
            })
        ]
    }*/
}
