import React, { Component } from "react";
import { connect } from "react-redux";
import { createHabit, updateHabit, deleteHabit } from "../../../../actions/habitsActions";
import { SliderPicker } from 'react-color';
import PropTypes from "prop-types";
import "./Modal.scss";



class Modal extends Component {
  state = {
    habitName: "",
    color: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        habitName: nextProps.name,
        color: nextProps.color
      });
    }
  }

  onChange = e => { this.setState({ habitName: e.target.value })};

  createHabit = () => {
    let habit = {
      habitName: this.state.habitName,
      color: this.state.color
    };
    this.props.createHabit(habit);
    this.onClose();
  };

  updateHabit = async id => {
    let habit = {
      id: this.props.id,
      habitName: this.state.habitName,
      color: this.state.color
    };
    await this.props.updateHabit(habit);
    this.onClose();
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
    this.props.onClose && this.props.onClose(e);
  };


  render() {
    const { errors } = this.state;
    if (!this.props.modal) { return null; }

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
                onChange={e => this.setState({ habitName: e.target.value })} value={this.state.habitName}/>
            </label>
          </div>
         <div className="form-label">Color</div>
         <SliderPicker color={ this.state.color } onChangeComplete={ this.handleChangeColor }/>
          <div>
            <button className="main-btn update-habit" onClick={this.updateHabit.bind(this, this.props.id)}>
              Update Habit
            </button>
            <button className="main-btn delete-habit" onClick={this.deleteHabit.bind(this, this.props.id)}>
              Delete Habit
            </button>
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

              <input id="habitName" type="text" placeholder="Habit Name" className="form-input"
                onChange={this.onChange} value={this.state.habitName} error={errors.password}/>
                <div className="auth-error">
                  {errors.password}
                  {errors.passwordincorrect}
                </div>

                
            </label>
          </div>
          <div className="form-label">Color</div>
          <SliderPicker color={ this.state.color } onChangeComplete={ this.handleChangeColor }/>
          <div>
            <button className="main-btn create-habit" onClick={this.createHabit}>
              Create Habit
            </button>
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
  errors:state.errors
});

export default connect(
  mapStateToProps,
  { createHabit, updateHabit, deleteHabit }
)(Modal);
