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
    let notComplete = 0;
    for (var i = 0; i < habits.length; i++){
      if (habits[i].complete === false) {notComplete++}
    };
    let d = new Array(habits.length - notComplete).fill(1);
    d.unshift(notComplete);
    let chartData = {
      labels:['Not yet complete'],
      datasets:[ { data: d, backgroundColor:['LightGrey'] }]
    };
    for (var j = 0; j < habits.length; j++){
      if (habits[j].complete === true) {
        chartData.labels.push(habits[j].name);
      }
    };
    for (var k = 0; k < habits.length; k++){
      if (habits[k].complete === true) {
        chartData.datasets[0].backgroundColor.push(habits[k].color);
      }
    };

    return (
      <div className="chart-wrapper">
        <Doughnut
          data = {chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Today',
              fontSize:20
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
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
