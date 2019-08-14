import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getHabits } from "../../../actions/habitsActions";
import "./SideNav.scss";



class SideNav extends Component {
  onLogoutClick = e => {
    this.props.logoutUser();
  };


  toggleMenu = e => {
    let sideNav = document.querySelector(".side");
    sideNav.classList.add("invisibile");

    let hamburger = document.querySelector(".hamburger-top-menu");
    hamburger.classList.add("hamburger-visible");

    let rightSide = document.querySelector(".right");
    rightSide.classList.add("no-side");

    let rightSideRight = document.querySelector(".right-top");
    rightSideRight.classList.add("right-top-visibile");
  };

  render() {
    return (
      <nav className="side">
        <ul className="top">
          <li>
            <i
              onClick={this.toggleMenu}
              className="material-icons hamburger-side-menu"
            >
              menu
            </i>
          </li>
          <NavLink exact activeClassName="active-page" to="/dashboard">
            <li>
              <i className="material-icons icon">home</i>Home
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/data">
            <li>
              <i className="material-icons icon">check_circle</i>Data
            </li>
          </NavLink>
        </ul>

      </nav>
    );
  }
}

const mapStateToProps = state => ({
  habits: state.habits
});

export default withRouter(
  connect(
    mapStateToProps,
    {  }
  )(SideNav)
);
