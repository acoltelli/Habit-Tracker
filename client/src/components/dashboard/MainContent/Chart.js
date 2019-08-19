import React, {Component} from 'react';
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import { getToday } from "../../../actions/daysActions";
import { getHabits } from "../../../actions/habitsActions";
import "./MainContent.scss";
import "./Dashboard.scss";


class Chart extends Component{
    state = {
      chartData: {},
      numHabits: 0
  };

static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:''
  };

componentWillMount(){
  this.props.getToday();
  this.setState({
    numHabits: this.props.habits.habits.length
  })
};


  getChartData(){
     this.setState({
       chartData:{
         labels: ['Habit1', 'Habit2', 'Habit3', 'Habit4', 'Habit5', 'Habit6', 'Not Complete'],
         datasets:[
           {
             label:'',
             data:[1,1,1,1,1,0,1],
             backgroundColor:[
               'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(255, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
               'rgba(255, 159, 64, 0.6)',
               // 'rgba(255, 99, 132, 0.6)',
               'LightGrey'
             ]
           }
         ]
       }
     });
   }




  render(){
    const { days } = this.props.days;
    const { habits } = this.props.habits;
    let d = new Array(habits.length).fill(1);
    let chartData = {
      labels:[],
      datasets:[ { data: d, backgroundColor:[] }]
    };
    habits.sort().map(habit => (chartData.labels.push(habit.name)));
    habits.sort().map(habit => (chartData.datasets[0].backgroundColor.push(habit.color)));


    return (
      <div className="main-content">
      <div className="chart-wrapper">
        <Doughnut
          // data={this.state.chartData}
          data = {chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Completed Today',
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
  habits: state.habits,
  days: state.days
});

export default connect(
  mapStateToProps,
  { getToday, getHabits }
)(Chart);
