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
        for (let i = 0; i < 10; i++) {
            flightDetails.id = response.trips[i].id;
            flightDetails.legIds = response.trips[i].legIds;
            flights.push(flightDetails);
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