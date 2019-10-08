import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    LineSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
} from 'react-vis';

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            estimated: [],
            min: [],
            income: [],
            priceInUSD: [],
            value: [],
        };
    }
    componentDidMount() {
        return fetch('../value.json').then(response => response.json()).then(jsondata => {
            let estimated = [];
            let min = [];
            let income = [];
            let priceInUSD = [];
            let value = [];
            let num = 0;
            for (let date in jsondata) {
                estimated.push({x: num, y: parseFloat(jsondata[date]['estimated'])});
                min.push({x: num, y: parseFloat(jsondata[date]['min'])});
                income.push({x: num, y: parseFloat(jsondata[date]['income'])});
                priceInUSD.push({x: num, y: parseFloat(jsondata[date]['priceInUSD'])});
                value.push({x: num, y: parseFloat(jsondata[date]['value'])});
                num++;
            }
            this.setState({
                estimated: estimated,
                min: min,
                income: income,
                priceInUSD: priceInUSD,
                value: value,
            });
            console.log(this.state.estimated);
        });
    }

    render() {
        return (
            <div className="App">
                <XYPlot height={200} width={1200}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="每年电力消耗值"/>
                    <YAxis title="TWh"/>
                    <LineSeries data={this.state.estimated} />
                    <LineSeries data={this.state.min} />
                </XYPlot>
                <XYPlot height={200} width={1200}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="每天的块收益加和"/>
                    <YAxis title="BTC"/>
                    <LineSeries data={this.state.income} />
                </XYPlot>
                <XYPlot height={200} width={1200}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="bitcoin每日的平均价格"/>
                    <YAxis title="BTC/USD"/>
                    <LineSeries data={this.state.priceInUSD} />
                </XYPlot>
                <XYPlot height={200} width={1200}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="计算的每日算力总价值"/>
                    <YAxis/>
                    <LineSeries data={this.state.value} />
                </XYPlot>
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
