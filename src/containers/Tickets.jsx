import React from "react";
import * as ticketService from "../../services/ticketService";
import Ticket from "../../components/Ticket";
import { getEvents } from "../services/ticketService";


class Tickets extends React.Component {
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
        ticketService
            .getEvents(this.state.formData.to)
            .then(json => this.onGetTicketsSuccess(json))
            .catch(this.onGetTicketsError);
    }

    onGetTicketsSuccess = (response) => {
        console.log(response);
        const jsonResponse = response.json();
        const events = jsonResponse._embedded.events;
        const eventsSet = new Set();
        const eventsSetArray = events.filter(event => {
          const value = eventsSet.has(event.name);
          eventsSet.add(event.name);
          return !value;
        });
        const eventsArray = eventsSetArray.map(event => {
            return {
              name: event.name,
              city: event._embedded.venues[0].city.name,
              image: event.images[0].url,
              venue: event._embedded.venues[0].name,
              date: event.dates.start.localDate,
              link: event.url
              
            }
          });
          return eventsArray;
    }



    mapTicket = (ticket) => {
        return (
            <React.Fragment key={ticket.id}>
                <Ticket info={ ticket } />
            </React.Fragment>
        )

    }




}



