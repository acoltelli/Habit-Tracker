import React, { Component } from "react";
import { connect } from "react-redux";
import { Calendar,  momentLocalizer } from "react-big-calendar";
import Toolbar from 'react-big-calendar/lib/Toolbar';
import moment from "moment";
import "./react-big-calendar.scss";
import "./MainContent.scss";
import "./Dashboard.scss";

const localizer = momentLocalizer(moment);

class CustomToolbar extends Toolbar {
	render() {
		return (
			<div className="rbc-toolbar">
				<div className="rbc-btn-group">
					<button type="button" onClick={() => this.navigate('PREV')}>back</button>
          <button type="button" onClick={() => this.navigate('TODAY')}>today</button>
					<button type="button" onClick={() => this.navigate('NEXT')}>next</button>
				</div>
				<div className="rbc-toolbar-label">{this.props.label}</div>
			</div>
		);
	}
}

class Cal extends Component {
  state = {
		events: []
  };

	eventStyle= (event) => {
    var style = {
        backgroundColor: event.backgroundColor
    };
    return {
        style: style
    };
};

  render() {
    return (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          components = {{toolbar : CustomToolbar}}
					events={this.props.calendarEvents}
					eventPropGetter={(this.eventStyle)}
          style={{ height: "90vh"}}
        />
    );
  }
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
  mapStateToProps,
  { }
)(Cal);
