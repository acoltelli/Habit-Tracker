import React, { Component } from "react";
import { connect } from "react-redux";
import { createHabit, updateHabit, deleteHabit, clearErrors } from "../../../../actions/habitsActions";
import { SliderPicker } from 'react-color';
import PropTypes from "prop-types";
import "./Modal.scss";


class Modal extends Component {
  state = {
    habitName: "",
    color: "",
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        habitName: nextProps.name,
        color: nextProps.color
      });
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onChange = e => { this.setState({ [e.target.id]: e.target.value })};

  createHabit = () => {
    let habit = {
      habitName: this.state.habitName,
      color: this.state.color
    };
    this.props.createHabit(habit);
    if (this.state.habitName && this.state.color){
      this.onClose()
    };
  };

  updateHabit = async id => {
    let habit = {
      id: this.props.id,
      habitName: this.state.habitName,
      color: this.state.color
    };
    await this.props.updateHabit(habit);
    if (this.state.habitName && this.state.color){
      this.onClose()
    }
  };

  deleteHabit = id => {
    this.props.deleteHabit(id);
    this.onClose();
  };

  handleChangeColor = (color) => {
    this.setState({ color: color.hex });
  };

  onClose = e => {
    this.setState({
      habitName: "",
      color: ""
   });
    this.props.clearErrors();
    this.props.onClose && this.props.onClose(e);
  };


  render() {
    if (!this.props.modal) { return null; }
    const { errors } = this.state;
    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

    // Edit habit
    if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>&times;</span>
          <h1 className="header">Edit {this.props.name}</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Habit Name</div>
              <input id="habitName" type="text" className="form-input"
                onChange={this.onChange} value={this.state.habitName} error={errors.habitName}/>
            </label>
            <div className="auth-error">
              {errors.habitName}
            </div>
          </div>
         <div className="form-label">Color</div>
         <SliderPicker color={ this.state.color } onChangeComplete={ this.handleChangeColor } error={errors.color}/>
          <div>
          <div class='edit-buttons'>
            <button className="main-btn update-habit" onClick={this.updateHabit.bind(this, this.props.id)}>
              Update Habit
            </button>
            <button className="main-btn delete-habit" onClick={this.deleteHabit.bind(this, this.props.id)}>
              Delete Habit
            </button>
            </div>
          </div>
        </div>
      );
    }

    // New habit
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>&times;</span>
          <h1 className="header">Create New Habit</h1>
          <div className="form-group">
            <label>
              <input required id="habitName" type="text" placeholder="Habit Name" className="form-input"
                onChange={this.onChange} value={this.state.habitName} />
                <div className="auth-error">
                  {errors.habitName}
                </div>
            </label>
          </div>
          <div className="form-label">Color</div>
          <SliderPicker color={ this.state.color } onChangeComplete={ this.handleChangeColor }/>
          <div className="auth-error">
            {errors.color}
          </div>
          <div>
          <div class='edit-buttons'>
            <button className="main-btn create-habit" onClick={this.createHabit}>
              Create Habit
            </button>
            </div>
          </div>
        </div>
      );
  }
}

Modal.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  habits: state.habits,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createHabit, updateHabit, deleteHabit, clearErrors }
)(Modal);
