import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";
import { connect } from "react-redux";
import { completeHabit } from "../../../actions/habitsActions";
import { createDay, getDays } from "../../../actions/daysActions";
import Chart from "./Chart";
import Modal from "./Modal/Modal";


class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    id: "",
    color:""
  };

toggleModal = e => { this.setState({ modal: !this.state.modal, edit: false }) };

toggleEditModal = (name, id, color, e) => {
  e.stopPropagation();
  this.setState({
    modal: !this.state.modal,
    edit: true,
    name: name,
    id: id,
    color: color
  });
};

markComplete = (id, name, color) => {
  let day = {
    id: id,
    name: name,
    color: color
  };
  this.props.createDay(day);
  this.completeHabit(id);
};

completeHabit = id => {
  let habit = {id: id};
  this.props.completeHabit(habit);
};

  render() {
    const { habits } = this.props.habits;
    var date = new Date();
    var offset = date.getTimezoneOffset()
    console.log(offset)
    let content;
    let habitData = habits.map(habit => (
      <div key={habit._id} className="habit-icon" style = {habit.complete ? {backgroundColor: habit.color} : null }>
        <div className="habit-name">{habit.name}</div>
        { !habit.complete ?
        <div>
        <div className="habit-info-button" onClick={this.markComplete.bind(this, habit._id, habit.name, habit.color)}>
          Mark Complete
        </div>
        <div className="habit-info-button" onClick={this.toggleEditModal.bind(this,habit.name,habit._id,habit.color)}>
          Edit habit
        </div>
        </div>
        :
        <div className="habit-info-button" onClick={this.toggleEditModal.bind(this, habit.name, habit._id,habit.color)}>
          Edit habit
        </div>
       }
      </div>
    ));

    if (habits.length > 0) {
      content = (
        <>
          <button className="main-btn" style={{minWidth: '200px'}} onClick={this.toggleModal}>
            New Habit
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              complete={this.state.complete}
              name={this.state.name}
              id={this.state.id}
              color={this.state.color}
            />
          </div>
          <div className="habits-wrapper">{habitData}</div>
            <Chart />
        </>
      );
    }

    // No habits
    else {
      content = (
        <>
          <div className="habits">
            <div className="no-habits">
              <h1 className="header">You don't have any habits yet</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first habit
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Your Habits</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  habits: state.habits
});

export default connect(
  mapStateToProps,
  { completeHabit, createDay, getDays }
)(Dashboard);
