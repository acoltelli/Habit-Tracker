import React, { Component } from "react";
import { connect } from "react-redux";
import { createHabit, updateHabit, deleteHabit } from "../../../../actions/habitsActions";
import "./Modal.scss";


class Modal extends Component {
  state = {
    habitName: "",
    editName: ""
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        habitName: nextProps.name,
      });
    }
  }

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
  };

  createHabit = () => {
    let habit = {
      habitName: this.state.habitName,
    };
    this.props.createHabit(habit);
    this.onClose();
  };

  updateHabit = async id => {
    let habit = {
      id: this.props.id,
      editName: this.state.editName
    };
    await this.props.updateHabit(habit);
    this.onClose();
  };

  deleteHabit = id => {
    this.props.deleteHabit(id);
    this.onClose();
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      habittName: "",
      editName: ""
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  render() {
    if (!this.props.modal) {
      return null;
    }

    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

    // Edit habit modal
    if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit {this.props.name}</h1>
          <p className="created-by">
            Created by {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
            <label>
              <div className="form-label">New Habit Name</div>
              <input
                onChange={this.onChange}
                value={this.state.editName}
                id="editName"
                type="text"
                className="form-input"
              />
            </label>
          </div>
          <div>
            <button
              className="main-btn update-habit"
              onClick={this.updateHabit.bind(this, this.props.id)}
            >
              Update Habit
            </button>
            {this.props.owner.id === this.props.auth.user.id ? (
              <button
                className="main-btn delete-habit"
                onClick={this.deleteHabit.bind(this, this.props.id)}
              >
                Delete Habit
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    // New habit modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create New Habit</h1>
          <div className="form-group">
            <label>
              <input
                onChange={this.onChange}
                value={this.state.habitName}
                id="habitName"
                type="text"
                placeholder="New habit"
                className="form-input"
              />
            </label>
          </div>
          <div>
            <button
              className="main-btn create-habit"
              onClick={this.createHabit}
            >
              Create Habit
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  habits: state.habits,
  days: state.days
});

export default connect(
  mapStateToProps,
  { createHabit, updateHabit, deleteHabit }
)(Modal);
