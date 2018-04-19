import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import { Header, Dimmer, Loader } from 'semantic-ui-react';
import { fetchWordCounts } from "../../actions/chartActions";

class WordCounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: [],
      isLoading: false,
    };

  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({isLoading: true});
    this.props.dispatch(fetchWordCounts())
      .then(res => {
        let counts = res.data.map(item => item[0]);
        let labels = res.data.map(item => item[1]);
        this.setState({data: counts, labels, isLoading: false});
      })
      .catch(error => {
        this.setState({isLoading: false});
      })
  }

  genBackgroundColors(n) {
    const COLORS = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ];
    const resColors = [];
    for (let i = 0; i < n; ++i) {
      resColors.push(COLORS[i % COLORS.length]);
    }
    return resColors;
  }

  genBorderColors(n) {
    const COLORS = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];
    const resColors = [];
    for (let i = 0; i < n; ++i) {
      resColors.push(COLORS[i % COLORS.length]);
    }
    return resColors;
  }

  buildChartData() {
    const { data, labels } = this.state;
    return {
      labels,
      datasets: [{
        label: 'Word Counts',
        data,
        backgroundColor: this.genBackgroundColors(data.length),
        borderColor: this.genBorderColors(data.length),
        borderWidth: 1,
      }]
    }
  }

  buildChartOptions() {
    const { labels, data } = this.state;

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          type: 'category',
          display: true,
          barPercentage: .9,
          ticks: {
            labels,
            fontSize: 12,
            autoSkip: false,
            callback: function (dataLabel, index) {
              // return index % 4 === 0 ? dataLabel : '';
              return dataLabel;
            }
          }
        }],
      },
    };
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div style={{height: '1500px'}}>
        <Dimmer page active={isLoading}><Loader active={isLoading} size='big' /></Dimmer>
        <HorizontalBar stacked data={this.buildChartData()} options={this.buildChartOptions()} />
      </div>
    );
  }
}

WordCounts.propTypes = {};

export default connect()(WordCounts);
