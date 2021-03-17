import React, { Component } from 'react'
import './Tarea1.css'
import 'antd/dist/antd.css';
import Plot from 'react-plotly.js';
import { Button } from 'antd';

export default class Tarea1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showChart : false
        }
    }

    renderChart = () => {
        return(
            <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
          }
        ]}
        layout={ {width: 720, height: 480, title: 'A Fancy Plot'} }
      />
        )
    }


    

    render() {
        let showChart = this.state.showChart
        return (
            <div className="body">
                <h2>Práctica 1 - Neurona Artificial</h2>
                <Button 
                onClick= { 
                    () => this.setState({showChart:!showChart})
                }>Run!</Button>
                {showChart ? 
                this.renderChart()
                :
                null}
            </div>
        )
    }
}
