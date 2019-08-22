import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHabits } from "../../actions/habitsActions";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";
import Chart from "./MainContent/Chart";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import NotFound from "../404/404";
import "./Layout.scss";



class Layout extends Component {
  componentWillMount() {
    this.props.getHabits();
  };


  render() {
    const { habits, habitsLoading } = this.props.habits;
    let dashboardContent;
    if (habits === null || habitsLoading) {
      dashboardContent = <Spinner />;
    } else if (habits.length > 0) {
      dashboardContent = (
        <>
          <SideNav/>
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                component={Dashboard}
              />
              <Route
                exact
                path="/data"
                component={Chart}
                />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav/>
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                component={Dashboard}
              />
              <Route
                exact
                path="/data"
                component={Chart}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">
        {dashboardContent}
        </div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  habits: state.habits
});

export default withRouter(
  connect(
    mapStateToProps,
    { getHabits }
  )(Layout)
);
