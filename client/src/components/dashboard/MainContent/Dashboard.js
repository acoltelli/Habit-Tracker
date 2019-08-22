import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";
import { connect } from "react-redux";
import { getHabits, completeHabit } from "../../../actions/habitsActions";
import { createDay, getDays } from "../../../actions/daysActions";
import Cal from "./Calendar";
import Modal from "./Modal/Modal";


class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    id: "",
    color:"",
    owner: {}
  };




  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, id, color, owner, e) => {
    e.stopPropagation();
    this.setState({
      modal: !this.state.modal,
      edit: true,
      name: name,
      id: id,
      color: color,
      owner: owner
    });

  };

  createDay = (id, name, color) => {
    let day = {
      id: id,
      name: name,
      color: color
    };
    this.props.createDay(day);
    this.completeHabit(id);
  };

  completeHabit = async id => {
    let habit = {
      id: id,
      habitComplete: this.state.habitComplete
    };
    this.setState({completed:[...this.state.completed, id]})
    await this.props.completeHabit(habit);
  };


  render() {
    const { habits } = this.props.habits;
    let content;
    let habitData = habits.sort().map(habit => (
      <div
        key={habit._id}
        className="habit-icon"
        style = {habit.complete ? {backgroundColor: habit.color} : null }
      >
        <div className="habit-name">{habit.name}</div>
        { !habit.complete ?
          <div>
        <div
          className="habit-info-button"
          onClick={this.createDay.bind(this, habit._id, habit.name, habit.color)}
        >
          Mark Complete
        </div>
        <div
          className="habit-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            habit.name,
            habit._id,
            habit.color,
            habit.owner
          )}
        >
          Edit habit
        </div>
        </div>
        :
        <div
          className="habit-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            habit.name,
            habit._id,
            habit.color,
            habit.owner
          )}
        >
          Edit habit
        </div>
       }
      </div>
    ));

    if (habits.length > 0) {
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
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
              owner={this.state.owner}
            />
          </div>
          <div className="habits-wrapper">{habitData}</div>
          <div className="cal-wrapper">
          <Cal />
          </div>
        </>
      );
    }

    // No habits
    else {
      content = (
        <>
          <div className="habits">
            <div className="no-habits">
              <h1 className="header">You dont have any habits yet</h1>
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
  { getHabits, completeHabit, createDay, getDays }
)(Dashboard);
