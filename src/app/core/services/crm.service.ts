import { Injectable } from '@angular/core';
//import { Config } from '../config/services/config.interface';
import { Observable, of } from 'rxjs';
import { CrmDataService } from './crm.data.service';
/*import { FloorModel } from '../models/floor.model';
import { ActivityModel } from '../models/activity.model';
import { OccupantModel } from '../models/occupant.model';
import { OwnerModel } from '../models/owner.model';
import { CelluleModel } from '../models/cellule.model';
import { PlanModel } from '../models/plan.model';*/

@Injectable()
export class CrmService {

    // TODO => code crm
    config: { crmUrl: string;
        assetsUrl: string;
    };
    headers: any;
    error: any;
    store: Observable<any>;

    constructor(public crmDataService: CrmDataService) { }

    /**
     * get data of the building
     * first call after the loading
     */
    getData() {
        return this.crmDataService.execute({
            'action': "RETRIEVE"
        });
    }

    /**
     * update a "Bien" in CRM
     * @param { PlanModel } plan
     */
    updateBien(guid, parkings) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'bien',
                guid_bien: guid,
                props: {
                    "parking-cars": parkings.cars,
                    "parking-trucks": parkings.trucks,
                    "parking-motorBikes": parkings.motorBikes,
                    "parking-bikes": parkings.bikes
                }
            }
        })
    }

    /**
     * create the parkings
     */
    createParkings(guid_bien, parking) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'parking',
                props: {
                    guid_bien: guid_bien,
                    nb: parking.nb,
                    type: parking.type
                }
            }
        })
    }


    /**
     * update the parkings
     */
    updateParkings(guid, guid_bien, parking) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'parking',
                guid: guid,
                props: {
                    nb: parking.nb
                }
            }
        })
    }

    /**
     * delete the parkings
     */
    deleteParkings(guid) {
        return this.crmDataService.execute(
            {
                action: 'delete',
                target: {
                    name: 'parking',
                    guid: guid
                }
            }
        );
    }

    /**
     * 
     * @param parking 
     */
    createParkingForOccupant(parking) {
        return this.crmDataService.execute(
            {
                action: 'create',
                target: {
                    name: 'occupancy.parkings',
                    props: {
                        nb: parking.nb,
                        type: parking.type,
                        occupancyid: parking.targetId,
                        cost: parking.cost,
                        glbCost: parking.glbCost
                    }
                }
            }
        );
    }
    /**
     * 
     * @param parking 
     */
    createPropertyParking(parking) {
        return this.crmDataService.execute(
            {
                action: 'create',
                target: {
                    name: 'property.parkings',
                    props: {
                        nb: parking.nb,
                        type: parking.type,
                        propertyid: parking.targetId,
                        cost: parking.cost,
                        glbCost: parking.glbCost
                    }
                }
            }
        );
    }
    /**
     *      * 
     * @param parking 
     */
    updateParkingForOccupant(parking) {
        return this.crmDataService.execute(
            {
                action: 'update',
                target: {
                    name: 'occupancy.parkings',
                    guid: parking.guid,
                    props: {
                        nb: parking.nb,
                        type: parking.type,
                        cost: parking.cost,
                        glbCost: parking.glbCost
                    }
                }
            }
        );
    }
    updatePropertyParking(parking) {
        return this.crmDataService.execute(
            {
                action: 'update',
                target: {
                    name: 'property.parkings',
                    guid: parking.guid,
                    props: {
                        nb: parking.nb,
                        type: parking.type,
                        cost: parking.cost,
                        glbCost: parking.glbCost
                    }
                }
            }
        );
    }
    /**
     * @param { string } name_building 
     * create a building in CRM
     * @param { string } guid_bien 
     */
    createBulding(guid_bien: string, name_building: string) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'building',
                props: {
                    name: name_building,
                    guid_bien: guid_bien,
                }
            }
        });
    }

        /**
     * @param { string } guid_building 
     * delete a building in CRM
     */
    DeleteBuilding(guid_building){
        return this.crmDataService.execute(
            {
                action: 'delete',
                target: {
                    name: 'building',
                    guid: guid_building
                }
            }
        );
    }
        /**
     * @param { string } guid_building 
     * delete a building in CRM
     */
    deleteOccPropParkings(guid_parking, type) {
        if (type === "occupant") {
            return this.crmDataService.execute(
                {
                    action: 'delete',
                    target: {
                        name: 'occupancy.parkings',
                        guid: guid_parking
                    }
                }
            );
        }
        if (type === "owner") {
            return this.crmDataService.execute(
                {
                    action: 'delete',
                    target: {
                        name: 'property.parkings',
                        guid: guid_parking
                    }
                }
            );
        }
        /**********************offers************************/
        if (type === "offer") {
            return this.crmDataService.execute(
                {
                    action: 'delete',
                    target: {
                        name: 'markatableSurface.parkings',
                        guid: guid_parking
                    }
                }
            ); 
        }
    }

    /**
     * retrieve a building
     * @param {string} guid_bulding 
     */
    retrieveBulding(guid_bulding: string) {
        return this.crmDataService.execute({
            action: 'retrieve',
            target: {
                name: 'building',
                guid: guid_bulding
            }
        });
    }

    /**
     * create a new floor
     * @param guid_bulding 
     * @param floor 
     */
    async createFloor(guid_bulding: string, floor) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'floor',
                props: {
                    area: floor.area,
                    level: floor.level,
                    guid_building: guid_bulding,
                }
            }
        });
    }

    createFloorFromCell(guid_cell: string, floor, position?: number) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'floor',
                props: {
                    area: floor.area,
                    level: position || floor.level,
                    guid_cell: guid_cell,
                }
            }
        });
    }

    /**
     * delete a floor
     * @param guid_floor 
     */
    deleteFloor(guid_floor: string) {
        return this.crmDataService.execute({
            action: 'delete',
            target: {
                name: 'floor',
                guid: guid_floor
            }
        });
    }

    /**
     * update a floor
     * @param floor 
     */
    updateFloor(floor) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'floor',
                guid: floor.guid_floor,
                props: {
                    area: floor.area,
                    level: floor.level,
                }
            }
        });
    }

    /**
     * 
     * create an occupation and an account to have a occupant in sip
     * @param activity 
     * @param guid_floor 
     */
    createSurface(activity, guid_floor: string) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'activity',
                props: {
                    guid_nature: activity.guid_activity,
                    guid_floor: guid_floor,
                    tokenArea: activity.tokenArea,
                    // nature: activity.nature.Value
                }
            }
        });
    }

    /**
     * 
     * @param activity 
     */
    updateSurface(activity) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'activity',
                guid: activity.guid_activity,
                props: {
                    tokenArea: activity.tokenArea,
                }
            }
        });
    }
    /**
     * 
     * @param guid 
     * @param newSurface 
     */
    updateActivitySurface(guid, newSurface) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'activity',
                guid: guid,
                props: {
                    tokenArea: newSurface
                }
            }
        });
    }

    /**
     * delete an occupation
     * @param activity 
     */
    deleteSurface(activity) {
        return this.crmDataService.execute({
            action: 'delete',
            target: {
                name: 'activity',
                guid: activity.guid_activity,
            }
        });
    }

    // Récupérer la liste des occupants (menu)
    /**
     * For the side menu, get the occupants list
     */
    retrieveOccupant() {
        return this.crmDataService.execute({
            action: 'retrieve',
            target: {
                name: 'occupant',
            }
        });
    }

    // Récupérer la liste des propriétaire (menu)
    /**
     * For the side menu, get the owners list
     */
    retrieveOwner() {
        return this.crmDataService.execute({
            action: 'retrieve',
            target: {
                name: 'owner',
            }
        });
    }


    /**
     * create an occupation and an account to have a occupant in sip
     * @param occupant 
     * @param guid_surface 
     */
    createOccupant(occupant, guid_surface: string) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'nat_surface_occupancy',
                props: {
                    area: occupant.area,
                    loyer_fac_m2: occupant.loyer_fac_m2,
                    loyer_fac_global: occupant.loyer_fac_global,
                    guid_surface: guid_surface,
                    guid_occupation: occupant.guid_occupant
                }
            }
        });
        /*return new Promise((resolve, reject)=>{
            resolve({});
        })*/
    }

    /**
     * update an occupation and an account to have a occupant in sip
     * @param occupant 
     * @param guid_surface 
     */
    updateOccupant(occupant, guid_surface: string, RentMode?: number) {

        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'nat_surface_occupancy',
                guid: occupant['guid'] || occupant.guid_occupation,
                props: {
                    area: occupant.area,
                    loyer_fac_m2: occupant.loyer_fac_m2,
                    loyer_fac_global: occupant.loyer_fac_global
                }
            }
        });
    }
    updateOccupancy(occupancy) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'nat_surface_occupancy',
                guid: occupancy.guid,
                props: {
                    area: occupancy.surface,
                    loyer_fac_m2: occupancy.rent,
                    loyer_fac_global: occupancy.globalRent
                }
            }
        });
    }
    /**
     * 
     * props -> area
     *          loyer_fac_m2
     *          loyer_fac_global
     */
    updateRentMode(occupant, RentMode?: number) {
        this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'nat_surface_occupancy',
                guid: occupant['guid'] || occupant.guid_occupation,
                props: {
                    rentMode: RentMode
                }
            }
        });
    }

    /**
     * delete an occupant
     * @param occupant 
     */
    deleteOccupant(guid) {
        return this.crmDataService.execute({
            action: 'delete',
            target: {
                name: 'nat_surface_occupancy',
                guid: guid
            }
        });
    }

    /**
     * Create an owner
     * In the CRM, it is a link between an occupation and an owner
     * @param owner 
     * @param guid_surface 
     */
    createOwner(owner, guid_surface: string) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'owner_nat_surf',
                props: {
                    tokenArea: owner.tokenArea,
                    prix_m2: owner.prixAEM,
                    prix_global: owner.prixTotal,
                    guid_propriete: owner.guid_owner, // In CRM data service, guid_propriete and guid_owner is reverse.
                    guid_surface: guid_surface,
                }
            }
        });
        /*return new Promise((resolve, reject)=>{
            resolve({});
        })*/
    }

    /**
     * Delete an owner
     * @param owner
     */
    deleteOwner(guid) {
        return this.crmDataService.execute({
            action: 'delete',
            target: {
                name: 'owner_nat_surf',
                guid: guid
            }
        });
    }

    /**
     * update an owner
     * @param owner
     */
    updateOwner(owner: any) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'owner_nat_surf',
                guid: owner.guid,
                props: {
                    tokenArea: owner.surface,
                    prix_m2: owner.cost,
                    prix_global: owner.glbCost,
                }
            }
        });
    }
    /**
     * create a cellule
     * @param cellule 
     * @param guid_building 
     */
    createCellule(cellule, guid_building: string) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'cell',
                props: {
                    guid_building: guid_building,
                    name: cellule.name
                }
            }
        });
    }
    updateCellName(targetid, newValue) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'cell',
                guid: targetid,
                props: {
                    name: newValue
                }
            }
        })
    }

    /**
     * delete an cellule
     * @param owner
     * @param guid_cellule 
     */
    deleteCellule(guid_cellule: string) {
        return this.crmDataService.execute({
            action: 'delete',
            target: {
                name: 'cell',
                guid: guid_cellule
            }
        });
    }
    /**
     * update building name
     * @param id 
     * @param name 
     */
    updateBuildingName(id, name) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'building',
                guid: id,
                props: {
                    name: name
                }
            }
        });
    }

    /*************************offers******************************/
    /**
     * Create a proposed Sruface
     * In the CRM, it is a link between an activity and an offer
     * @param proposedSurface 
     * @param guid_surface 
     */
    createProposedSurface(proposedSurface, guid_surface: string) {
        return this.crmDataService.execute({
            action: 'create',
            target: {
                name: 'tf_proposedsurfaces',
                props: {
                    name: proposedSurface.name,
                    priceperm2: proposedSurface.loyer_fac_m2,
                    globalprice: proposedSurface.loyer_fac_global,
                    surfaceid: guid_surface,
                    marketedsurfaceid: proposedSurface.guid_marketed_surface,
                    color: proposedSurface.color,
                    tokenArea: proposedSurface.tokenArea,
                    recalculatesurfaces: true,
                }
            }
        });
    }

    updateProposedSurface(propSurface) {
        let proprietes = {};
        if (propSurface.offerOperationType !== 'Vente') {
            proprietes = {
                tokenArea: propSurface.surface,
                rentperm2: propSurface.rent,
                annualrent: propSurface.globalRent,
                recalculatesurfaces: propSurface.takeintototalsurface,
            }
        } else {
            proprietes = {
                tokenArea: propSurface.surface,
                priceperm2: propSurface.rent,
                globalprice: propSurface.globalRent,
                recalculatesurfaces: propSurface.takeintototalsurface,
            }
        }
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'tf_proposedsurfaces',
                guid: propSurface.guid,
                props: proprietes
            }
        });
    }

    /**
     * Delete a proposed Surface
     * @param guid surface
     */
    deleteProposedSurface(guid) {
        return this.crmDataService.execute({
            action: 'delete',
            target: {
                name: 'tf_proposedsurfaces',
                guid: guid
            }
        });
    }
    /**
     * 
     * @param parking 
     */
    createMarketedSurfaceParking(parkingProps) {
        return this.crmDataService.execute(
            {
                action: 'create',
                target: {
                    name: 'markatableSurface.parkings',
                    props: parkingProps,
                    recalculateparkings: true,
                }
            }
        );
    }

    /**
     * 
     * @param parking 
     */
    updateMarketedSurfaceParking(parking) {
       return this.crmDataService.execute(
            {
                action: 'update',
                target: {
                    name: 'markatableSurface.parkings',
                    guid: parking.guid,
                    props: {
                        nb: parking.nb,
                        type: parking.type,
                        cost: parking.cost,
                        glbCost: parking.glbCost,
                        recalculateparkings: true,
                    }
                }
            }
        );
    }

    updateProposedSurfaceRentMode(guid, RentMode?: number) {
        return this.crmDataService.execute({
            action: 'update',
            target: {
                name: 'tf_proposedsurfaces',
                guid: guid,
                props: {
                    rentMode: RentMode,
                    redevance: !(RentMode === 1),
                }
            }
        });
    }

    /**
     * filter on proposed surfaces
     * @param {string} status 
     */
    filterOnMarkatableSurfaces(status: string) {
        return this.crmDataService.execute({
            action: 'retrieve',
            target: {
                name: 'transactedMarkatableSurface',
            }
        });
    }
}
