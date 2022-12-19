import React from "react";
import * as flightService from "../services/flightService";
import Flight from "../components/Flight";

class Flights extends React.Component {
    state = {
        flightData: {},
        mappedFlights: [],
        formData: {
            from: "LAS",
            to: "DEN",
            startDate: "2023-2-11",
            endDate: "2023-2-13",
            adults: 1,
            children: 0,
            infants: 0
        }
    }

    componentDidMount() {
        flightService
            .getFlights(this.state.formData)
            .then(json => this.onGetFlightsSuccess(json))
            .catch(this.onGetFlightsError)
    
    }

    onGetFlightsSuccess = (response) => {
        console.log(response);
        let flights = [];
        let flightDetails = {};
        let flightsMap = new Map();
        let tripCount = 0;
        for (let i = 0; i < 10; i++) {
            flightDetails.id = response.trips[i].id;
            flightsMap.set(response.trips[i].id, i);
            flightDetails.legIds = response.trips[i].legIds;
            flightsMap.set(response.trips[i].legIds[0], i);
            flightsMap.set(response.trips[i].legIds[1], i);
            flights.push(flightDetails);
        }

        for (let fare of response.fares) {
            if (tripCount == 10) {
                tripCount = 0;
                break;
            }
            if (flightsMap.has(fare.tripId)) {
                let flightIndex = flightsMap.get(fare.tripId);
                flights[flightIndex].flightDetails.price = fare.price.totalAmountUsd;
                tripCount++;
            }
        }

        for (let leg of response.legs) {
            if (flightsMap.has(leg.id)) {
                let flightIndex = flightsMap.get(leg.id);
                flights[flightIndex].flightDetails.departureTime = leg.departureTime;
                flights[flightIndex].flightDetails.arrivalTime = leg.arrivalTime;
                flights[flightIndex].flightDetails.duration = leg.duration;
                flights[flightIndex].flightDetails.stopoversCount = leg.stopoversCount;
            }
        }

        this.setState(() => {
            return {
                mappedFlights: this.flights.map(this.mapFlight)
            }
        })
    }

    mapFlight = (flight) => {
        return (
            <React.Fragment key={flight.id}>
                <Flight info={ flight } />
            </React.Fragment>
        )
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Flight Times</th>
                    <th scope="col">Flight Length</th>
                    <th scope="col"># of Stops</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.mappedFlights}
                </tbody>
            </table>
        )
    }
}

export default Flights;