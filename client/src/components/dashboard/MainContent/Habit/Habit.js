import React, { Component } from "react";
import { connect } from "react-redux";
import { getHabit } from "../../../../actions/habitsActions";
import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";
import "../MainContent.scss";
import "./Habit.scss";

class Habit extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    owner: {},
    date: ""
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  componentDidMount() {
    this.props.getHabit(this.props.match.params.habit);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.habit !== prevProps.match.params.habit) {
      this.props.getHabit(this.props.match.params.habit);
    }
  }

  render() {
    if (
      this.props.habit &&
      !this.props.habits.habitLoading
    ) {
      const { habit } = this.props;

      return (
        <div className="main-content">
          <h1 className="habit-header">{habit.name}</h1>
          <button
            onClick={this.toggleEditModal.bind(
              this,
              habit.name,
              habit._id,
              habit.owner
            )}
            className="main-btn center-btn"
          >
            Edit Habit
          </button>

          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="habit-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  habit: state.habits.habit,
  habits: state.habits
});

export default connect(
  mapStateToProps,
  { getHabit }
)(Habit);
