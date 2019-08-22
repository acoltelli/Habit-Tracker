import React, {Component} from 'react';
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import "./MainContent.scss";
import "./Dashboard.scss";


class Chart extends Component{
static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:''
  };

  render(){
    const { habits } = this.props.habits;
    let d = new Array(habits.length).fill(1);
    let chartData = {
      labels:[],
      datasets:[ { data: d, backgroundColor:[] }]
    };
    habits.sort().map(habit => (chartData.labels.push(habit.name)));
    for (var i = 0; i < habits.length; i++){
      if (habits[i].complete === false) {
        chartData.datasets[0].backgroundColor.push('LightGrey');
      }
      else {
        chartData.datasets[0].backgroundColor.push(habits[i].color);
      }
    };

    return (
      <div className="main-content">
      <div className="chart-wrapper">
        <Doughnut
          data = {chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Today',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  habits: state.habits
});

export default connect(
  mapStateToProps,
  { }
)(Chart);
