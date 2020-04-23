import React from 'react';
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import { connect } from 'react-redux';
import { crudActions, confirmActions } from '../../_actions';

class Calender extends React.Component {
    componentDidMount() {
        this.props.getAll('tasks', 'tasks/all')
    }

    render() {
        const { events } = this.props
        return (
            <React.Fragment>
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
                    events={events}

                />
            </React.Fragment>
        )
    }
}

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const mapStateToProps = (state) => {
    const { tasks, confirm } = state;

    let events = []
    if (tasks) {
        tasks.forEach(element => {
            events.push({
                title: element.name,
                description: element.details,
                start: moment(element.start_date).format('YYYY-MM-DD'),
                end: moment(element.end_date).add(1, 'days').format('YYYY-MM-DD'),
                color: getRandomColor(),
            })
        });
    }

    return { events: events, confirm };
}

const actionCreators = {
    getAll: crudActions._getAll,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(Calender);
