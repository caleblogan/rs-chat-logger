import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Header } from 'semantic-ui-react';
import {fetchWordCounts, fetchWordsOverTime} from "../../actions/chartActions";

class WordsOverTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // labels: ['a', 'b', 'c'],
      labels: [
        // new Date('2018-04-12T01:04:59.128Z'),
        // new Date('2018-04-12T01:05:22.798Z'),
        // new Date('2018-04-12T01:05:25.731Z'),
        // '2018-04-12T01:05:33.012Z',
        // '2018-04-12T01:12:16.074Z',
        // '2018-04-12T01:19:04.518Z',
        // '2018-04-12T01:19:24.334Z',
        // '2018-04-12T01:22:32.408Z',
        // new Date('2018-04-12T02:25:33.984Z'),
        // new Date('2018-04-12T05:25:33.984Z'),
      ],
      // data: [[1, 4, 6], [3, 2, 1]],
      data: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.dispatch(fetchWordsOverTime())
      .then(response => {
        console.log('resp:', response);
        const { labels, words } = response.data;
        this.setState({ labels, data: words });
      });
  }

  getColor(idx) {
    const COLORS = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];
    return COLORS[idx % COLORS.length];
  }

  buildChartData() {
    const { data, labels } = this.state;
    const datasets = Object
      .keys(data)
      .map((word, idx) => ({
        data: data[word],
        label: word,
        fill: false,
        borderColor: this.getColor(idx),
        backgroundColor: this.getColor(idx),
        borderWidth: 2,
      }));
    return {
      labels,
      datasets,
    }
  }

  buildChartOptions() {
    const { labels, data } = this.state;

    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          display: true,
          // time: {
          //   unit: 'hour',
          //   displayFormats: {
          //     hour: 'MMM YYYY'
          //   },
          //   // min: 1499472000 * 1000,
          // },
          // scaleLabel: {
          //   display: true,
          //   labelString: 'Date'
          // },
          // ticks: {
          //   callback: function(dataLabel, index) {
          //     // Hide the label of every 2nd dataset. return null to hide the grid line too
          //     return index % 4 === 0 ? dataLabel : '';
          //   }
          // }
        }],
      },
    };
  }

  render() {
    return (
      <div style={{height: '600px'}}>
        <Line data={this.buildChartData()} options={this.buildChartOptions()} />
      </div>
    );
  }
}

WordsOverTime.propTypes = {};

export default connect()(WordsOverTime);
