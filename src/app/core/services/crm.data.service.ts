import { Injectable, Compiler } from '@angular/core';
import { WidowService } from './widow.service';
@Injectable()
/**
* CrmService provides data to Stacking plan
* it can also create, update and delete records from crm.
* @class CrmDataService
* @author AB
*/
export class CrmDataService {

    private _MSG_NO_BINDING_INFO = 'No binding data';
    private _MSG_UNDF_ACTION = 'Context has undefined Action';
    private _bind_infos: any[];
    private _clientUrl: string;
    private winRef: any;
    private _xrm__clientWrapper: any;

    constructor(private windowRef: WidowService, private _compiler: Compiler) {
        this._compiler.clearCache();
        this.winRef = this.windowRef.getWindowRef();
        this._clientUrl = this.winRef && this.winRef.BNPPRE && this.winRef.BNPPRE.Crm.Extensibility.StackingPlan.CodeHelper._clientUrl;
        this._bind_infos = [
            /**
             * Asset
             */
            {
                'CRM_OBJECT': 'tf_asset',
                'SIP_OBJECT': 'asset',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'lat': {
                            'CRM_PROP': 'tf_addresslatitude',
                            'CRM_TYPE': 'string'
                        },
                        'long': {
                            'CRM_PROP': 'tf_addresslongitude',
                            'CRM_TYPE': 'string'
                        },
                        'buildings': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'building',
                                'predefined_query': 'tf_asset>tf_asset:tf_assetid'
                            }
                        },
                        'parkings': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'parking',
                                'predefined_query': 'tf_asset>tf_asset:tf_assetid'
                            }
                        },
                        'occupants': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'asset-occupant',
                                'predefined_query': 'tf_asset>tf_asset:tf_assetid',
                                'filter': '<condition attribute="statecode" value="0" operator="eq"/><filter type="or"><condition attribute="tf_enddate" value="%today%" operator="on-or-after"/><condition attribute="tf_enddate" operator="null"/></filter>'
                            }
                        },
                        'owners': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'asset-owner',
                                'predefined_query': 'tf_asset>tf_asset:tf_assetid',
                                'filter':'<condition attribute="statecode" value="0" operator="eq"/><filter type="or"><condition attribute="tf_enddate" value="%today%" operator="on-or-after"/><condition attribute="tf_enddate" operator="null"/></filter>'
                            }
                        },
                        'activities': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'tf_nature',
                                'predefined_query': ''
                            }
                        },
                        'offers': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'offer',
                                'predefined_query': 'tf_asset>tf_assetid:tf_assetid',
                                'filter':' <filter type="and"><condition attribute="statuscode" operator="in"><value>100000000</value><value>1</value></condition></filter>'
                            }
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_addresslatitude': 'lat',
                        'tf_addresslongitude': 'long'
                    }
                }
            },
            /**
             * Building
             */
            {
                'CRM_OBJECT': 'tf_building',
                'SIP_OBJECT': 'building',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'floors': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'floor',
                                'predefined_query': 'tf_building>tf_building:tf_buildingid'
                            }
                        },
                        'cellules': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'cell',
                                'predefined_query': 'tf_building>tf_building:tf_buildingid'
                            }
                        },
                        'guid_bien': {
                            'CRM_PROP': 'tf_Asset',
                            'CRM_TYPE': 'lookup@tf_asset'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_asset': 'guid_bien'
                    }
                }
            },
            /**
             * Floor
             */
            {
                'CRM_OBJECT': 'tf_floor',
                'SIP_OBJECT': 'floor',
                'BIND': {
                    'Sip.to.Crm': {
                        'level': {
                            'CRM_PROP': 'tf_level',
                            'CRM_TYPE': 'picklist'
                        },
                        'area': {
                            'CRM_PROP': 'tf_surface',
                            'CRM_TYPE': 'string'
                        },
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'guid_building': {
                            'CRM_PROP': 'tf_Building',
                            'CRM_TYPE': 'lookup@tf_building'
                        },
                        'guid_cell': {
                            'CRM_PROP': 'tf_Cell',
                            'CRM_TYPE': 'lookup@tf_cell'
                        },
                        'activities': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'activity',
                                'predefined_query': 'tf_floor>tf_floor:tf_floorid>'
                            }
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_surface': 'area',
                        'tf_level': 'level'
                    }
                }
            },
            ,
            /**
             * tf_surface (Activity)
             */
            {
                'CRM_OBJECT': 'tf_surface',
                'SIP_OBJECT': 'activity',
                'BIND': {
                    'Sip.to.Crm': {
                        'color': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'activity_color',
                                'predefined_query': 'tf_surface>tf_natureid:tf_nature',
                                'firstOrDefault': 'true'
                            }
                        },
                        'tokenArea': {
                            'CRM_PROP': 'tf_area',
                            'CRM_TYPE': 'string'
                        },
                        'guid_nature': {
                            'CRM_PROP': 'tf_Nature',
                            'CRM_TYPE': 'lookup@tf_nature'
                        },
                        'guid_floor': {
                            'CRM_PROP': 'tf_Floor',
                            'CRM_TYPE': 'lookup@tf_floor'
                        },
                        'occupants': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'nat_surface_occupancy',
                                'predefined_query': 'tf_surface>tf_surfacelookup:tf_surfaceid'
                            }
                        },
                        'owners': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'owner_nat_surf',
                                'predefined_query': 'tf_surface>tf_surfacelookup:tf_surfaceid'
                            }
                        },
                        'proposedSurfaces': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'proposedSurface',
                                'predefined_query': 'tf_surface>tf_surfaceid:tf_surfaceid'
                            }
                        } 
                    },
                    'Crm.to.Sip': {
                        'tf_nature': 'guid_nature',
                        'tf_area': 'tokenArea',
                        'tf_floor': 'guid_floor'
                    }
                }
            },
            /**
             * tf_typeofsurfacesoccupation (nat_surface_occupancy)
             */
            {
                'CRM_OBJECT': 'tf_typeofsurfacesoccupation',
                'SIP_OBJECT': 'nat_surface_occupancy',
                'JOIN_FILTER':'<link-entity name="tf_occupancy" alias="ac" to="tf_occupation" from="tf_occupancyid"><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><filter type="or"><condition attribute="tf_enddate" operator="on-or-after" value="%today%" /><condition attribute="tf_enddate" operator="null" /></filter></filter></link-entity>',
                'BIND': {
                    'Sip.to.Crm': {
                        'color': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'occupation_color',
                                'predefined_query': 'tf_typeofsurfacesoccupation>tf_occupancyid:tf_occupation',
                                'firstOrDefault': 'true'
                            }
                        },
                        'area': {
                            'CRM_PROP': 'tf_surface',
                            'CRM_TYPE': 'string'
                        },
                        'loyer_fac_m2': {
                            'CRM_PROP': 'tf_headlinerentm2hthd',
                            'CRM_TYPE': 'string'
                        },
                        'loyer_fac_global': {
                            'CRM_PROP': 'tf_totalheadlinerenththd',
                            'CRM_TYPE': 'string'
                        },
                        'loyer_eco_m2': {
                            'CRM_PROP': 'tf_realrent',
                            'CRM_TYPE': 'string'
                        },
                        'loyer_eco_global': {
                            'CRM_PROP': 'tf_totalrealrenththd',
                            'CRM_TYPE': 'string'
                        },
                        'guid_surface': {
                            'CRM_PROP': 'tf_SurfaceLookup',
                            'CRM_TYPE': 'lookup@tf_surface'
                        },
                        'guid_occupation': {
                            'CRM_PROP': 'tf_Occupation',
                            'CRM_TYPE': 'lookup@tf_occupancy'
                        },
                        'rentMode': {
                            'CRM_PROP': 'tf_chargeglobal',
                            'CRM_TYPE': 'picklist'
                        },
                        'name': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'occupation_color',
                                'predefined_query': 'tf_typeofsurfacesoccupation>tf_occupancyid:tf_occupation',
                                'firstOrDefault': 'true'
                            }
                        }

                    },
                    'Crm.to.Sip': {
                        'tf_surface': 'area',
                        'tf_headlinerentm2hthd': 'loyer_fac_m2',
                        'tf_totalheadlinerenththd': 'loyer_fac_global',
                        'tf_realrent': 'loyer_eco_m2',
                        'tf_totalrealrenththd': 'loyer_eco_global',
                        'tf_chargeglobal': 'rentMode'
                    }
                }
            },
            /**
             * account (account) is used ?
             */
            {
                'CRM_OBJECT': 'account',
                'SIP_OBJECT': 'account',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'name',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'name': 'name'
                    }
                }
            },
            /**
             * tf_typeofsurfacesproperty (owner_nat_surf)
             */
            {
                'CRM_OBJECT': 'tf_typeofsurfacesproperty',
                'SIP_OBJECT': 'owner_nat_surf',
                'JOIN_FILTER':'<link-entity name="tf_property" alias="aa" to="tf_property" from="tf_propertyid"><filter type="and"><condition attribute="statecode" value="0" operator="eq" /><filter type="or"><condition attribute="tf_enddate" value="%today%" operator="on-or-after" /><condition attribute="tf_enddate" operator="null" /></filter></filter></link-entity>',                
                'BIND': {
                    'Sip.to.Crm': {
                        'color': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'owner',
                                'predefined_query': 'tf_typeofsurfacesproperty>tf_propertyid:tf_property',
                                'firstOrDefault': 'true'
                            }
                        },
                        'coef': {
                            'CRM_PROP': 'tf_weightingcoefficient',
                            'CRM_TYPE': 'string'
                        },
                        'tokenArea': {
                            'CRM_PROP': 'tf_surface',
                            'CRM_TYPE': 'string'
                        },
                        'prix_m2': {
                            'CRM_PROP': 'tf_pricem2hthd',
                            'CRM_TYPE': 'string'
                        },
                        'prix_global': {
                            'CRM_PROP': 'tf_globalpricehthd',
                            'CRM_TYPE': 'string'
                        },
                        'guid_surface': {
                            'CRM_PROP': 'tf_SurfaceLookup',
                            'CRM_TYPE': 'lookup@tf_surface'
                        },
                        'guid_propriete': {
                            'CRM_PROP': 'tf_Property',
                            'CRM_TYPE': 'lookup@tf_property'
                        },
                        'name': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'asset-owner',
                                'predefined_query': 'tf_typeofsurfacesproperty>tf_propertyid:tf_property',
                                'firstOrDefault': 'true'
                            }
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_surface': 'tokenArea',
                        'tf_pricem2hthd': 'prix_m2',
                        'tf_globalpricehthd': 'prix_global'
                    }
                }
            },
            /**
             * tf_occupancy (asset-occupant)
             */
            {
                'CRM_OBJECT': 'tf_occupancy',
                'SIP_OBJECT': 'asset-occupant',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_Occupant',
                            'CRM_TYPE': 'lookup@account'
                        },
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        },
                        'dueDate': {
                            'CRM_PROP': 'tf_nextduedate',
                            'CRM_TYPE': 'string'
                        },
                        'totalSurface': {
                            'CRM_PROP': 'tf_overallsurfaceoccupied',
                            'CRM_TYPE': 'string'
                        },
                        'parkings': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'occupancy.parkings',
                                'predefined_query': 'tf_occupancy>tf_occupation:tf_occupancyid'
                            }
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_occupant': 'name',
                        'tf_color': 'color',
                        'tf_nextduedate': 'dueDate',
                        'tf_overallsurfaceoccupied': 'totalSurface',
                    }
                }
            },
            /**
             * tf_property (asset-owner)
             */
            {
                'CRM_OBJECT': 'tf_property',
                'SIP_OBJECT': 'asset-owner',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_AssetOwner',
                            'CRM_TYPE': 'lookup@account'
                        },
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        },
                        'acquiDate': {
                            'CRM_PROP': 'tf_acquisitiondate',
                            'CRM_TYPE': 'string'
                        },
                        'totalSurface': {
                            'CRM_PROP': 'tf_totalsurface',
                            'CRM_TYPE': 'string'
                        },
                        'parkings':{
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'property.parkings',
                                'predefined_query': 'tf_property>tf_property:tf_propertyid'
                            }
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_color': 'color',
                        'tf_assetowner': 'name',
                        'tf_acquisitiondate': 'acquiDate',
                        'tf_totalsurface': 'totalSurface',
                    }
                }
            },
            /**
             * tf_cell (cell)
             */
            {
                'CRM_OBJECT': 'tf_cell',
                'SIP_OBJECT': 'cell',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'floors': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'floor',
                                'predefined_query': 'tf_cell>tf_cell:tf_cellid'
                            }
                        },
                        'guid_building': {
                            'CRM_PROP': 'tf_Building',
                            'CRM_TYPE': 'lookup@tf_building'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_building': 'guid_building',

                    }
                }
            },
            /**
             * tf_nature (activity)
             */
            {
                'CRM_OBJECT': 'tf_nature',
                'SIP_OBJECT': 'activity',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_color': 'color'
                    }
                }
            },
            /**
             * tf_occupancy (occupation_color)
             */
            {
                'CRM_OBJECT': 'tf_occupancy',
                'SIP_OBJECT': 'occupation_color',
                'BIND': {
                    'Sip.to.Crm': {
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_color': 'color'
                    }
                }
            },
            /**
             * tf_property (owner)
             */
            {
                'CRM_OBJECT': 'tf_property',
                'SIP_OBJECT': 'owner',
                'BIND': {
                    'Sip.to.Crm': {
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_color': 'color'
                    }
                }
            },
            /**
             * tf_nature (activity_color)
             */
            {
                'CRM_OBJECT': 'tf_nature',
                'SIP_OBJECT': 'activity_color',
                'BIND': {
                    'Sip.to.Crm': {
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_color': 'color'
                    }
                }
            },
            /**
             * tf_parking (parking)
             */
            {
                'CRM_OBJECT': 'tf_parking',
                'SIP_OBJECT': 'parking',
                'BIND': {
                    'Sip.to.Crm': {
                        'nb': {
                            'CRM_PROP': 'tf_number',
                            'CRM_TYPE': 'string'
                        },
                        'guid_bien': {
                            'CRM_PROP': 'tf_asset',
                            'CRM_TYPE': 'lookup@tf_asset'                            
                        },
                        'type': {
                            'CRM_PROP': 'tf_type_glb',
                            'CRM_TYPE': 'picklist'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_number': 'nb',
                        'tf_type_glb': 'type'
                    }
                }
            },
            /**
             * tf_parking (parking of occupancy)
             */
            {
                'CRM_OBJECT': 'tf_parkingoccupation',
                'SIP_OBJECT': 'occupancy.parkings',
                'JOIN_FILTER': '<link-entity name="tf_occupancy" alias="ac" to="tf_occupation" from="tf_occupancyid"><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><filter type="or"><condition attribute="tf_enddate" operator="on-or-after" value="%today%" /><condition attribute="tf_enddate" operator="null" /></filter></filter></link-entity>',
                'BIND': {
                    'Sip.to.Crm': {
                        'nb': {
                            'CRM_PROP': 'tf_capacity',
                            'CRM_TYPE': 'string'
                        },
                        'occupancyid': {
                            'CRM_PROP': 'tf_Occupation',
                            'CRM_TYPE': 'lookup@tf_Occupancy'
                        },
                        'type': {
                            'CRM_PROP': 'tf_type',
                            'CRM_TYPE': 'picklist'
                        },
                        'cost': {
                            'CRM_PROP': 'tf_headlinerentuniththd',
                            'CRM_TYPE': 'string'
                        },
                        'glbCost': {
                            'CRM_PROP': 'tf_globalheadlinerenththd',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_capacity': 'nb',
                        'tf_type': 'type',
                        'tf_headlinerentuniththd': 'cost',
                        'tf_globalheadlinerenththd': 'glbCost'
                    }
                }
            },
            /**
             * (parking of property)
             */
            {
                'CRM_OBJECT': 'tf_parkingproperty',
                'SIP_OBJECT': 'property.parkings',
                'JOIN_FILTER': '<link-entity name="tf_property" alias="ac" to="tf_property" from="tf_propertyid"><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><filter type="or"><condition attribute="tf_enddate" operator="on-or-after" value="%today%" /><condition attribute="tf_enddate" operator="null" /></filter></filter></link-entity>',
                'BIND': {
                    'Sip.to.Crm': {
                        'nb': {
                            'CRM_PROP': 'tf_capacity',
                            'CRM_TYPE': 'string'
                        },
                        'propertyid': {
                            'CRM_PROP': 'tf_Property',
                            'CRM_TYPE': 'lookup@tf_Occupancy'
                        },
                        'type': {
                            'CRM_PROP': 'tf_type',
                            'CRM_TYPE': 'picklist'
                        },
                        'cost': {
                            'CRM_PROP': 'tf_unitpricehthd',
                            'CRM_TYPE': 'string'
                        },
                        'glbCost': {
                            'CRM_PROP': 'tf_globalpricehthd',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_capacity': 'nb',
                        'tf_type': 'type',
                        'tf_unitpricehthd': 'cost',
                        'tf_globalpricehthd': 'glbCost'
                    }
                }
            },
             /**
             * tf_parking (parking of marketed surface)
             */
            {
                'CRM_OBJECT': 'tf_proposedparking',
                'SIP_OBJECT': 'markatableSurface.parkings',
                //'JOIN_FILTER': '<link-entity name="tf_proposedparking" alias="ac" to="tf_marketablesurfaces" from="tf_marketablesurfacesid"><filter><condition attribute="statecode" operator="eq" value="0" /></filter></link-entity>',
                'BIND': {
                    'Sip.to.Crm': {
                        'nb': {
                            'CRM_PROP': 'tf_numberofproposedplace',
                            'CRM_TYPE': 'string'
                        },
                        'marketablesurfaceid': {
                            'CRM_PROP': 'tf_marketablesurfacesid',
                            'CRM_TYPE': 'lookup@tf_marketablesurfaces'
                        },
                        'type': {
                            'CRM_PROP': 'tf_parkingtype',
                            'CRM_TYPE': 'picklist'
                        },
                        'cost': {
                            'CRM_PROP': 'tf_price',
                            'CRM_TYPE': 'string'
                        },
                        'glbCost': {
                            'CRM_PROP': 'tf_globalprice',
                            'CRM_TYPE': 'string'
                        },
                        'rent': {
                            'CRM_PROP': 'tf_rent',
                            'CRM_TYPE': 'string'
                        },
                        'glbRent': {
                            'CRM_PROP': 'tf_globalrent',
                            'CRM_TYPE': 'string'
                        },
                        'recalculateparkings': {
                            'CRM_PROP': 'tf_recalculateparkings',
                            'CRM_TYPE': 'boolean'                            
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_numberofproposedplace': 'nb',
                        'tf_parkingtype': 'type',
                        'tf_price': 'cost',
                        'tf_globalprice': 'glbCost',
                        'tf_rent': 'rent',
                        'tf_globalrent': 'glbRent',
                        'tf_recalculateparkings': 'recalculateparkings',
                    }
                }
            },
            /**
             * Proposed Surface
             */
            {
                'CRM_OBJECT': 'tf_proposedsurfaces',
                'SIP_OBJECT': 'proposedSurface',
                'JOIN_FILTER': '<link-entity name="tf_marketablesurfaces" from="tf_marketablesurfacesid" to="tf_marketablesurfacesid" link-type="inner" alias="ac"><link-entity name="tf_offer" from="tf_offerid" to="tf_offre" link-type="inner" alias="ad"><filter type="and"><condition attribute="statuscode" operator="in"><value>1</value><value>100000000</value></condition></filter></link-entity></link-entity>',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        },
                        'priceperm2': {
                            'CRM_PROP': 'tf_priceperm2',
                            'CRM_TYPE': 'string'
                        },
                        'rentperm2': {
                            'CRM_PROP': 'tf_rentperm2',
                            'CRM_TYPE': 'string'
                        },
                        'globalprice': {
                            'CRM_PROP': 'tf_globalprice',
                            'CRM_TYPE': 'string'
                        },
                        'annualrent': {
                            'CRM_PROP': 'tf_annualrent',
                            'CRM_TYPE': 'string'
                        },
                        'tokenArea': {
                            'CRM_PROP': 'tf_proposedareasurface',
                            'CRM_TYPE': 'string'
                        },
                        'surfaceid': {
                            'CRM_PROP': 'tf_SurfaceId',
                            'CRM_TYPE': 'lookup@tf_surface'
                        },
                        'marketedsurfaceid': {
                            'CRM_PROP': 'tf_marketablesurfacesid',
                            'CRM_TYPE': 'lookup@tf_marketablesurfaces',
                            'VAL': 'true'
                        },
                        'rentMode': {
                            'CRM_PROP': 'tf_chargeglobale',
                            'CRM_TYPE': 'picklist',
                        },
                        'redevance': {
                            'CRM_PROP': 'tf_charge',
                            'CRM_TYPE': 'boolean'
                        },
                        'takeintototalsurface': {
                            'CRM_PROP': 'tf_takeintototalsurface',
                            'CRM_TYPE': 'boolean'  
                        },
                        'recalculatesurfaces': {
                            'CRM_PROP': 'tf_recalculatesurfaces',
                            'CRM_TYPE': 'boolean' 
                        },
                        'transactedSurfaces': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'proposedSurface.transacted',
                                'predefined_query': 'tf_proposedsurfaces>tf_proposedarea:tf_proposedsurfacesid'
                            }
                        },
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_color': 'color',
                        'tf_rentperm2': 'rentperm2',
                        'tf_priceperm2': 'priceperm2',
                        'tf_globalprice': 'globalprice',
                        'tf_annualrent': 'annualrent',
                        'tf_proposedareasurface': 'tokenArea',
                        'tf_surfaceid': 'surfaceid',
                        'tf_marketablesurfacesid': 'marketedsurfaceid',
                        'tf_chargeglobale': 'rentMode',
                        'tf_charge': 'redevance',
                        'tf_takeintototalsurface': 'takeintototalsurface',
                        'tf_recalculatesurfaces': 'recalculatesurfaces',
                        
                    }
                }
            },
            /**
             * Marketable Surface
             */
            {
                'CRM_OBJECT': 'tf_marketablesurfaces',
                'SIP_OBJECT': 'markatableSurface',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        },
                        'totalarea': {
                            'CRM_PROP': 'tf_totalarea',
                            'CRM_TYPE': 'string'
                        },
                        'isdivisible': {
                            'CRM_PROP': 'tf_isdivisible',
                            'CRM_TYPE': 'string'
                        },
                        'minsurface': {
                            'CRM_PROP': 'tf_surfacemin',
                            'CRM_TYPE': 'string'
                        },
                        'rentperm2': {
                            'CRM_PROP': 'tf_rentperm2',
                            'CRM_TYPE': 'string'
                        },
                        'globalrent': {
                            'CRM_PROP': 'tf_loyerglobal',
                            'CRM_TYPE': 'string'
                        },
                        'priceperm2': {
                            'CRM_PROP': 'tf_priceperm2',
                            'CRM_TYPE': 'string'
                        },
                        'statuscode': {
                            'CRM_PROP': 'statuscode',
                            'CRM_TYPE': 'picklist'
                        },
                        'statecode': {
                            'CRM_PROP': 'statecode',
                            'CRM_TYPE': 'string'
                        },
                        'globalprice': {
                            'CRM_PROP': 'tf_globalprice',
                            'CRM_TYPE': 'string'
                        },
                        'offerid': {
                            'CRM_PROP': 'tf_offre',
                            'CRM_TYPE': 'lookup@tf_offer',
                            'VAL': 'true'
                        },
                        'parkings': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'markatableSurface.parkings',
                                'predefined_query': 'tf_marketablesurfaces>tf_marketablesurfacesid:tf_marketablesurfacesid'
                            }
                        },
                        'transactedMarkatableSurfaces': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'markatableSurface.transacted',
                                'predefined_query': 'tf_marketablesurfaces>tf_marketablearea:tf_marketablesurfacesid'
                            }
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_totalarea': 'totalarea',
                        'tf_color': 'color',
                        'tf_isdivisible': 'isdivisible',
                        'tf_surfacemin': 'minsurface',
                        'tf_rentperm2': 'rentperm2',
                        'tf_priceperm2': 'priceperm2',
                        'statuscode': 'statuscode',
                        'statecode': 'statecode',
                        'tf_globalprice': 'globalprice',
                        'tf_offre': 'offerid'
                        
                    }
                }
            },
            /**
             * transacted Marketable Surface
             */
            {
                'CRM_OBJECT': 'tf_marketableareatransacted',
                'SIP_OBJECT': 'markatableSurface.transacted',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'marketableareaname': {
                            'CRM_PROP': 'tf_marketableareaname',
                            'CRM_TYPE': 'string'
                        },
                        'statuscode': {
                            'CRM_PROP': 'statuscode',
                            'CRM_TYPE': 'picklist'
                        },
                        'marketablesurfaceid': {
                            'CRM_PROP': 'tf_marketablearea',
                            'CRM_TYPE': 'lookup@tf_marketablesurfaces'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_marketableareaname': 'marketableareaname',
                        'tf_marketablearea': 'marketablesurfaceid',
                        'statuscode': 'statuscode',
                    }
                }
            },
                     /**
             * transacted Surface
             */
            {
                'CRM_OBJECT': 'tf_transactedarea',
                'SIP_OBJECT': 'proposedSurface.transacted',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'marketableareatransacted': {
                            'CRM_PROP': 'tf_marketableareatransacted',
                            'CRM_TYPE': 'string'
                        },
                        'status': {
                            'CRM_PROP': 'statuscode',
                            'CRM_TYPE': 'picklist'
                        },
                        'transactedprice': {
                            'CRM_PROP': 'tf_transactedprice',
                            'CRM_TYPE': 'string'
                        },
                        'transactedpriceBase': {
                            'CRM_PROP': 'tf_transactedprice_base',
                            'CRM_TYPE': 'string'
                        },
                        'transactedareasurface': {
                            'CRM_PROP': 'tf_transactedareasurface',
                            'CRM_TYPE': 'string'
                        },
                        'annualrenttransacted': {
                            'CRM_PROP': 'tf_annualrenttransacted',
                            'CRM_TYPE': 'string'
                        },
                        'annualrenttransactedBase': {
                            'CRM_PROP': 'tf_annualrenttransacted_base',
                            'CRM_TYPE': 'string'
                        }
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_marketableareatransacted': 'marketableareatransacted',
                        'statuscode': 'status',
                        'tf_transactedprice': 'transactedprice',
                        'tf_transactedprice_base': 'transactedpriceBase',
                        'tf_transactedareasurface': 'transactedareasurface',
                        'tf_annualrenttransacted': 'annualrenttransacted',
                        'tf_annualrenttransacted_base': 'annualrenttransactedBase',
                    }
                }
            },
            /**
             * offer
             */
            {
                'CRM_OBJECT': 'tf_offer',
                'SIP_OBJECT': 'offer',
                'BIND': {
                    'Sip.to.Crm': {
                        'name': {
                            'CRM_PROP': 'tf_name',
                            'CRM_TYPE': 'string'
                        },
                        'totalavailablearea': {
                            'CRM_PROP': 'tf_totalavailablearea',
                            'CRM_TYPE': 'string'
                        },
                        'color': {
                            'CRM_PROP': 'tf_color',
                            'CRM_TYPE': 'string'
                        },
                        'operationtype': {
                            'CRM_PROP': 'tf_operationtype',
                            'CRM_TYPE': 'picklist'
                        },
                        'marketedSurfaces': {
                            'CRM_TYPE': 'array',
                            'NEXT_LINK': {
                                'name': 'markatableSurface',
                                'predefined_query': 'tf_offer>tf_offre:tf_offerid'
                            }
                        } 
                    },
                    'Crm.to.Sip': {
                        'tf_name': 'name',
                        'tf_totalavailablearea': 'totalavailablearea',
                        'tf_color': 'color',
                        'tf_operationtype': 'operationtype'
                    }
                }
            },
        ];
    }
    /**
     * @method execute
     * execute action provided in the context
     * @param context
     */
    public execute(context: any): Promise<any> {
        let action;
        if ((action = context.action.toUpperCase()) !== undefined) {
            if (action === 'CREATE') {
                return new Promise((resolve, reject) => {
                    var newguid;
                    if ((newguid = this.createObject(context.target)) !== null) {
                        resolve(newguid);
                    }
                    else {
                        reject({
                            status: "failure",
                            target: context.target
                        });
                    }
                }); // Promise.resolve(this.createObject(context.target));
            } else if (action === 'UPDATE') {
                return new Promise((resolve, reject) => {
                    let response = this.updateObject(context.target);
                    response.status === 'Success' ? resolve(response) : reject(response);
                });
            } else if (action === 'DELETE') {
                return new Promise((resolve, reject) => {
                    var response = this.deleteObject(context.target);
                    (response.status === 'Success') ? resolve(response) : reject(response);
                });

            } else if (action === 'RETRIEVE') {
                return new Promise((resolve, reject) => {
                    try {
                        var response = (context.target === undefined) ?
                            this.buildStructure(null) :
                            this.buildStructure(context.target.id);
                            response.selectedOffer = this.getOfferId();
                        if (response.buildings.length) {
                            response.isCellule = response.buildings.find((building) => { return building.cellules.length != 0 }) != undefined;
                        } else {
                            response.isCellule = false;
                        }
                        resolve(response);
                    }
                    catch (error) {
                        reject({ status: 'Failure' });
                        console.error(error);
                    }
                });

                /*return (context.target === undefined)
                    ? Promise.resolve(this.buildStructure(null))
                    : Promise.resolve(this.buildStructure(context.target.id));*/
            }
        } else {
            return Promise.reject(this._MSG_UNDF_ACTION);
        }
    }
    /**
     * @method createObject
     * create record in crm
     */
    createObject(o: any): any {
        let req = this.request("POST", this.buildQueryUrl("CREATE", this.bindInfos(o.name), null, null));
        let newguid = null;
        let _this = this;
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    var uri = this.getResponseHeader("OData-EntityId");
                    newguid = /\(([^)]+)\)/.exec(uri)[1];
                } else {
                    newguid = { status: "Failure", code: this.status}; // Added for Auth test
                    _this.error(this.status.toString());// Added for Auth test
                    //_this.error(this.statusText);
                }
            }
        };
        req.send(JSON.stringify(this.buildObjectToSend(o)));
        return newguid;
    }
    /**
     * @method upateObject
     * update record in crm
     */
    updateObject(o: any): any {
        let req = this.request("PATCH", this.buildQueryUrl("PATCH", this.bindInfos(o.name), o.guid, null));
        let result;
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    var uri = this.getResponseHeader("OData-EntityId");
                    result = { status: "Success", message: "No return data" };
                } else {
                    result = { status: "Failure", message: this.statusText }
                }
            }
        };
        req.send(JSON.stringify(this.buildObjectToSend(o)));
        return result;
    }
    /**
     * @method deleteObject
     * delete record in crm
     */
    deleteObject(o: any): any {
        let req = this.request("DELETE",
            this.buildQueryUrl("DELETE",
                this.bindInfos(o.name),
                o.guid,
                null)),
            result;

        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 204) {
                    result = { status: "Success", message: "No return data" };
                }
                else {
                    result = { status: "Failure", message: this.response }
                }
            }
        };
        req.send(JSON.stringify(this.buildObjectToSend(o)));
        return result;
    }
    /**
     * @method request
     * return XMLHttpRequest object
     * @param verb
     * @param url
     */
    request(verb: string, url: string): XMLHttpRequest {
        const req = new XMLHttpRequest();
        req.open(
            verb,
            url,
            false
        );
        req.setRequestHeader('OData-MaxVersion', '4.0');
        req.setRequestHeader('OData-Version', '4.0');
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        req.setRequestHeader('Prefer', 'odata.include-annotations="*"');
        return req;
    }
    /**
     * @param e
     * crm entity name
     * @param id
     * crm record id
     * @param p
     * predefined query
     */
    retrieveObject(e: string, id: string, p: string, f?: string): any {
        let m = this.bindInfos(e),
            res;
        if (!m) {
            this.error(this._MSG_NO_BINDING_INFO);
        }

        let r = this.request('GET', this.buildQueryUrl('GET', m, id, p, f)),
            // tslint:disable-next-line:prefer-const
            instance = this;

        // submit url to server
        r.onreadystatechange = function () {
            if (this.readyState === 4) {
                r.onreadystatechange = null;
                if (this.status === 200) {
                    // get result
                    // tslint:disable-next-line:prefer-const
                    const result = JSON.parse(this.response);
                    if (result) {
                        res = result;
                    }
                } else {
                    instance.error(this.statusText);
                }
            }
        };
        r.send();
        // parse result;
        return instance.parseRetrieveObjecResult(res, m);

    }
    /**
     * @method bindInfos
     * get bind info
     * @param {string} key
     */
    bindInfos(key: string): any {
        return this._bind_infos.filter((e) => e.SIP_OBJECT === key || e.CRM_OBJECT === key)[0];
    }
    /**
     * @param v
     * http verb
     * @param m
     * SIP and CRM binding info
     * @param id
     * record id
     * @param p
     * used to build pedefined query
     */
    buildQueryUrl(v: string, m: any, id: string, q: string, f?: string): string {
        let s = '';
        if (v === 'GET') {

            if (q !== null) {
                return this._clientUrl
                    + '/api/data/v9.0/' + this.getPluralName(m.CRM_OBJECT)
                    + '?fetchXml='
                    + encodeURIComponent(this.predefinedQuery(m, id, q, f));
            } else {
                // tslint:disable-next-line:forin
                for (let p in m.BIND['Crm.to.Sip']) {
                    s += ',' + ((m.BIND['Sip.to.Crm'][m.BIND['Crm.to.Sip'][p]].CRM_TYPE.startsWith('lookup')) ? ('_' + p + '_value') : p);
                }
                return this._clientUrl + '/api/data/v9.0/'
                    + this.getPluralName(m.CRM_OBJECT)
                    + '(' + id + ')?$select='
                    + s.slice(1, s.length);
            }
        } else {
            // Http method should be CREATE, UPDATE or Delete
            return this._clientUrl + '/api/data/v9.0/'
                + this.getPluralName(m.CRM_OBJECT) + (v === 'PATCH' || v === 'DELETE' ? '(' + id + ')' : '');
        }
    }
    /**
     * @method predefinedQuery
     * @param {object} m
     * get fetchxml
     */
    predefinedQuery(m: any, id: string, pre: string, f: string): string {

        let re = RegExp('([a-zA-Z_]+)>([a-zA-Z_]+):([a-zA-Z_]+)', 'g'),
            f1 = '',
            f2 = '',
            f3 = '',
            c = '',
            l = '',
            conditions = '',
            arr;
        // set columns for fetch xml query
        // tslint:disable-next-line:forin
        for (let p in m.BIND['Crm.to.Sip']) {
            let sipToCrm = m.BIND['Sip.to.Crm'][m.BIND['Crm.to.Sip'][p]];
            c += '<attribute name=\'' + p + '\' />';
            /*if (sipToCrm.CRM_FILTER) {
                conditions += '<condition attribute=\'' + p + '\' value=\'' + sipToCrm.CRM_FILTER + '\' operator=\'eq\'/>';
            }*/
        }
        if (pre === '') {
            return '<fetch distinct=\'false\' mapping=\'logical\' output-format=\'xml-platform\' version=\'1.0\'>'
                + '<entity name=\'' + m.CRM_OBJECT + '\'>'
                + c
                //+ (conditions.length > 0 ? '<filter type=\'and\'>' + conditions + '</filter>' : '')
                + (f && f !== '' ? '<filter type=\'and\'>' + this.evalFilter(f) + '</filter>' : '')
                + (m.JOIN_FILTER && m.JOIN_FILTER !== '' ? m.JOIN_FILTER : '') 
                + '</entity>'
                + '</fetch>';
        }
        // set link-entities for fetch xml query
        while ((arr = re.exec(pre)) !== null) {
            f1 += '<link-entity name=\'' + arr[1] + '\' to=\'' + arr[2] + '\' from=\'' + arr[3] + '\'>';
            f3 += '</link-entity>';
            l = arr[1];
        }

        // set filter for fetch xml query
        f2 = '<filter type=\'and\'>';
        f2 += '<condition attribute=\'' + l + 'id\' value=\'{' + id + '}\' operator=\'eq\' />';
        f2 += '</filter>';

        return '<fetch distinct=\'false\' mapping=\'logical\' output-format=\'xml-platform\' version=\'1.0\'>'
            + '<entity name=\'' + m.CRM_OBJECT + '\'>'
            + c
            + (f && f !== '' ? '<filter type=\'and\'>' + this.evalFilter(f) + '</filter>' : '')
            + f1
            + f2
            + f3
            + (m.JOIN_FILTER && m.JOIN_FILTER !== '' ? this.evalFilter(m.JOIN_FILTER): '') 
            + '</entity>'
            + '</fetch>';
    }

    evalFilter(filter: string) {
        return filter.replace("%today%", new Date().toJSON());
    }
    /**
     * @method parseRetrieveObjecResultparseRetrieveObjecResult
     * @param r
     * contains odata result
     * @param m
     * Contains binding info between SIP and CRM
     */
    parseRetrieveObjecResult(r, m): any {
        let v,
            instance = this;
        if (r.value && Array.isArray(r.value)) {
            v = [];
            r.value.forEach(function (i) {
                v.push(instance.parseRetrieveObjecResult(i, m));
            });
        } else {
            v = {};
            v["guid"] = r[m.CRM_OBJECT + "id"];
            // tslint:disable-next-line:forin
            for (let p in m.BIND['Sip.to.Crm']) {
                // get Crm binding infos for SiP object property
                let d = m.BIND['Sip.to.Crm'][p];
                // check crm type
                if (d.CRM_TYPE.startsWith('lookup') || d.CRM_TYPE === 'picklist') {
                    v[p] = r[d.CRM_TYPE.startsWith('lookup') && d.VAL ? '_' + d.CRM_PROP.toLowerCase() + '_value' : (d.CRM_TYPE.startsWith('picklist') ? d.CRM_PROP.toLowerCase() : '_' + d.CRM_PROP.toLowerCase() + '_value') + '@OData.Community.Display.V1.FormattedValue'];

                    /*v[p] = r[((d.CRM_TYPE.startsWith('lookup')) ? '_' + d.CRM_PROP.toLowerCase() + '_value' : d.CRM_PROP.toLowerCase())
                        + '@OData.Community.Display.V1.FormattedValue'];*/
                } else if (d.CRM_TYPE === 'array') {

                    var arr = this.retrieveObject(this.bindInfos(d.NEXT_LINK.name).CRM_OBJECT,
                        r[m.CRM_OBJECT + 'id'],
                        d.NEXT_LINK.predefined_query,
                        d.NEXT_LINK.filter || '');
                    v[p] = (d.NEXT_LINK.firstOrDefault !== undefined && d.NEXT_LINK.firstOrDefault === "true") ? arr[0] : arr;

                } else {
                    v[p] = r[d.CRM_PROP];
                }
            }
        }
        return v;
    }
    /**
     * @method buildStructure
     * get building structure
     */
    buildStructure(id: string): any {
        return this.retrieveObject('tf_asset', id || window['BNPPRE'].Crm.Extensibility.StackingPlan.CodeHelper.getIdFromUrl(), null);
    }
    getOfferId(): string {
        return window['BNPPRE'].Crm.Extensibility.StackingPlan.CodeHelper.getOfferId();
    }
    /**
     * @method xrm___clientWrapper
     * set _client
     */
    xrm___clientWrapper(): void {
        let frames = top.frames;
        for (let i = 0; i < frames.length; i++) {
            let f = frames[i];
            if (/\/form\/page.aspx/g.test(f.location.pathname)) {
               // this._xrm__clientWrapper = f.Xrm;
                //this._clientUrl = f.Xrm.Page.context.getClientUrl();
                break;
            }
        }
    }
    /**
     * @method getPluralName
     * @param name
     */
    getPluralName(name: string): string {
        name = name.toLocaleLowerCase();
        switch (name) {
            case 'tf_typeofsurfacesproperty':
                return "tf_typeofsurfacesproperties";
                break;
            case 'tf_occupancy':
                return "tf_occupancies";
                break;
            case 'tf_property':
                return "tf_properties";
                break;
            case 'tf_parkingproperty':
                return 'tf_parkingproperties';
                break;
            case 'vtf_marketablesurfaces':
                return 'tf_marketablesurfaceses';
                break;
            case 'tf_proposedsurfaces':
                return 'tf_proposedsurfaceses';
                break;
            default:
                return name + "s";
        }
    }
    /**
     * @method buildObjectToSend
     * @param target 
     */
    buildObjectToSend(target: any): any {
        let m;
        if ((m = this.bindInfos(target.name)) === null) {
            this.error(this._MSG_NO_BINDING_INFO);
        }
        let bind = m.BIND, e = {};

        for (let p in target.props) {
            if (bind['Sip.to.Crm'][p].CRM_TYPE.startsWith('lookup')) {
                let lookup = bind["Sip.to.Crm"][p].CRM_TYPE.slice(7, bind["Sip.to.Crm"][p].CRM_TYPE.length);
                e[bind['Sip.to.Crm'][p].CRM_PROP + '@odata.bind'] = this.getLookupValue(lookup, target.props[p]);
            } else if (bind['Sip.to.Crm'][p].CRM_TYPE === 'picklist') {
                e[bind["Sip.to.Crm"][p].CRM_PROP] =
                    window['BNPPRE'].Crm.Extensibility.StackingPlan.CodeHelper.getOptionsSetValue(
                        m.CRM_OBJECT,
                        bind["Sip.to.Crm"][p].CRM_PROP,
                        target.props[p]
                    );
            }
            else {
                e[bind["Sip.to.Crm"][p].CRM_PROP] = target.props[p];
            }
        }
        return e;
    }

    /**
     * @method getLookupValue
     * @param name 
     * @param value 
     */
    getLookupValue(name: string, value: string): string {
        return '/' + this.getPluralName(name) + '(' + value + ')';
    }

    /**
    * @method error
     * throw an error
     * @param err
     */
    error(err: string): void {
        throw new Error(err);
    }
}
