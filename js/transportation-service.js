(function() {
    'use strict';

    function TransportationService($http) {
        var service = {};
        service.forcast = null;
        var geoloc = null;
        var from0 = 8591291;
        var to0   = 8591218; 

        service.init = function(geoposition) {
            geoloc = geoposition;

            return $http.get('https://transport.opendata.ch/v1/connections?from=8591291&to=8591218&fields[]=connections/from/departure&fields[]=connections/from/station/name&fields[]=connections/to/arrival&fields[]=connections/to/station/name').
                then(function(response) {
                    //return service.forcast = response.connections[0].from.station;
                    return service.forcast = response;
                });
        };

        //Returns the current forcast along with high and low tempratures for the current day 
        service.currentForcast = function() {
            if(service.forcast === null){
                return null;
            }
            return service.forcast;
        };

        service.destination0 = function(){
            if(service.forcast === null){
                return null;
            }
            // Add human readable info to info
            for (var i = 0; i < service.forcast.data.connections.length; i++) {
                service.forcast.data.connections[i].from.departure = moment(service.forcast.data.connections[i].from.departure).format('HH:mm');
                service.forcast.data.connections[i].to.arrival = moment(service.forcast.data.connections[i].to.arrival).format('HH:mm');
            };
            return service.forcast.data.connections;
        };

        service.refreshWeather = function(){
            return service.init(geoloc);
        };
        
        return service;
    }

    angular.module('SmartMirror').factory('TransportationService', TransportationService);

}());

