import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./SideNav.scss";


class SideNav extends Component {
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
            <i onClick={this.toggleMenu} className="material-icons hamburger-side-menu">
              menu
            </i>
          </li>
          <NavLink exact activeClassName="active-page" to="/">
            <li>
              <i className="material-icons icon">home</i>Home
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/calendar">
            <li>
              <i className="material-icons icon">check_circle</i>Calendar
            </li>
          </NavLink>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
});

export default withRouter(
  connect(
    mapStateToProps,
    {  }
  )(SideNav)
);
