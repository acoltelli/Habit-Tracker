import React, {Component} from 'react';
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import { getToday } from "../../../actions/daysActions";
import "./MainContent.scss";
import "./Dashboard.scss";


class Chart extends Component{
    state = {
      chartData:{}
  };

static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:''
  };

// TODO: This function to get the actual data is a work in progress unfortunately.
// Need helper functions to build out the chartData object
componentWillMount(){
    this.getChartData();
    this.props.getToday();
    let labelsArr = [];
    let data = [];
    let response= this.props.days.days;
    if (response.length !== []){
    for (let i = 0; i < response.length; i++) {
      labelsArr.push(response[i].eventData.title)
    }
    // this.helper(labelsArr);
    // console.log(labelsArr)
    // console.log(this.state.labels)
}
};

// This is some fake data
  getChartData(){
     this.setState({
       chartData:{
         labels: ['Habit1', 'Habit2', 'Habit3', 'Habit4', 'Habit5', 'Habit6', 'Not Complete'],
         datasets:[
           {
             label:'',
             data:[
               1,
               1,
               1,
               1,
               1,
               0,
               1
             ],
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



    return (
      <div className="main-content">
      <div className="chart-wrapper">
        <Doughnut
          data={this.state.chartData}
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
  days: state.days
});

export default connect(
  mapStateToProps,
  { getToday }
)(Chart);
