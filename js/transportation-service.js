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

            return $http.get('https://transport.opendata.ch/v1/connections?from=8591291&to=8591218&fields[]=connections/from/departure&fields[]=connections/from/station/name&fields[]=connections/to/arrival&fields[]=connections/to/station/name&fields[]=connections/sections/journey/name&fields[]=connections/prognosis').
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
                var connection = service.forcast.data.connections[i];
                var prognosis, delay;
                //if (connection.from.prognosis.departure){
                //    prognosis = moment(connection.from.prognosis.departure);
                //    delay = (prognosis.valueOf() - departure.valueOf()) / 60000;
                //}
                var lineName = connection.sections[0].journey.name.split(' ').splice(0,2).join(' ');
                connection.sections[0].journey.name = lineName;
                connection.from.departure = moment(connection.from.departure).format('HH:mm');
                connection.to.arrival = moment(connection.to.arrival).format('HH:mm');
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

