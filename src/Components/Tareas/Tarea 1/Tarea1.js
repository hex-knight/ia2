import React, { Component } from "react";
import "./Tarea1.css";
import "antd/dist/antd.css";
import Plot from "react-plotly.js";
import { Button, InputNumber } from "antd";
const math = require("mathjs");

export default class Tarea1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChart: false,
      enableButton: false,
      w1: 1,
      w2: 1,
      b: 1.5,
      x: 1,
      y: 1,
      patrones: [],
      patronesX: [],
      xB: [],
      xR: [],
      yB: [],
      yR: [],
      line: {},
      loading: false
    };
  }

  renderChart = () => {
    return (
      <Plot
        data={!this.state.loading ?[
            this.state.line, 
            {
                x: this.state.xB,
                y: this.state.yB,
                type: "scatter",
                mode: "markers",
                marker: { color: "blue" }
            }, 
            {
                x: this.state.xR,
                y: this.state.yR,
                type: "scatter",
                mode: "markers",
                marker: { color: "red" }
            }
            ] : []}
        layout={{ width: 720, height: 480, title: "Neurona" }}
      />
    );
  };

  changeW = (e, w) => {
    switch (w) {
      case 1:
        this.setState({ w1: e });
        this.makeLine();
        break;
      case 2:
        this.setState({ w2: e });
        this.makeLine();
        break;
      case 3:
        this.setState({ b: e });
        this.makeLine();
        break;
      case 4:
        this.setState({ x: e });
        break;
      case 5:
        this.setState({ y: e });
        break;
      default:
        break;
    }
  };

  makeLine = () => {
    let xs = this.state.patronesX;
    if( xs.length < 2){
        xs = [0, 1];
    }else{
        xs = [xs[0], xs[xs.length-1]]
    }
    let w1 = this.state.w1;
    let w2 = this.state.w2;
    let b = this.state.b;
    // console.log(xs);
    let m = (w1 / w2) * -1;
    let c = b / w2;

    let polinomio = math.parse(`${m} x ${c >= 0 ? "+" : "-"} ${c}`);
    let poliSimple = math.simplify(polinomio);
    // console.log(poliSimple.evaluate({ x: xs }));

    let line = {
      x: xs,
      y: poliSimple.evaluate({ x: xs }),
    };
    this.setState({ line });
    this.evaluatePoints();
  };

  evaluatePoints = () => {
      let patrones = this.state.patrones;
      let patronesX = [];
      this.setState({xB: [], xR: [], yB: [], yR: [], patronesX: [], loading: true})
    setTimeout(() => {
        for (let i = 0; i < patrones.length; i++) {
            const point = patrones[i];
            patronesX.push(patrones[i][0])
            this.addPatterns(point);
        }
        patronesX.sort();
        this.setState({loading:false, patronesX});
    }, 50);
  }

  addPoint = () =>{
      let x = this.state.x;
      let y = this.state.y;
      let patrones = this.state.patrones;
      patrones.push([x,y])
      this.setState({patrones});
    //   console.log(patrones)
      this.evaluatePoints();
  }

  addPatterns = (point) => {
    let x = point[0]
    let y = point[1]
    let xB = this.state.xB;
    let yB = this.state.yB;
    let xR = this.state.xR;
    let yR = this.state.yR;
    let val = this.evaluatePoint([x,y])
    // console.log(val);
    if (val === 1) {
        xB.push(x);
        yB.push(y);
    } else {
        xR.push(x);
        yR.push(y);
    }
    // console.log(patronesBlue);
    setTimeout(() => {
        this.setState({xB, xR, yB, yR});
    }, 10);
  };

  evaluatePoint = (point) =>{
      //point is [x, y], 
      let w1 = this.state.w1;
      let w2 = this.state.w2;
      let w = [w1, w2];
      let b = this.state.b;
      let v = math.dot(point, w) - b;
      let y = v <= 0 ? 0 : 1;
      return y;
      //w1 and w2
  }


  componentDidMount(){
      this.makeLine();
  }
  

  render() {
    // let showChart = this.state.showChart;
    return (
        <div>
        <h2 style={{textAlign:"center"}}>Práctica 1 - Neurona Artificial</h2>
      <div className="body">
          
        <div className="inputs">
          <h4>W1</h4>
          <InputNumber defaultValue={1} onChange={(e) => this.changeW(e, 1)} />
          <h4>W1</h4>
          <InputNumber defaultValue={1} onChange={(e) => this.changeW(e, 2)} />
          <h4>Bias</h4>
          <InputNumber
            defaultValue={1.5}
            onChange={(e) => this.changeW(e, 3)}
            step={0.1}
          />
          {/* <Button
          className="button"
           onClick={() => this.makeLine()}>Run!</Button> */}
        </div>
        <div className="inputs">
        <h3>Patrones</h3>
          <h4>x</h4>
          <InputNumber
            defaultValue={1}
            onChange={(e) => this.changeW(e, 4)}
            step={0.1}
          />
          <h4>y</h4>
          <InputNumber
            defaultValue={1}
            onChange={(e) => this.changeW(e, 5)}
            step={0.1}
          />
          <Button 
          className="button"
          onClick={() => this.addPoint()}>Agregar</Button>
        </div>
        {this.renderChart()}
        
      </div>
      </div>
    );
  }
}
