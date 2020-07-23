import React, { Component } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  CardFooter,

} from 'reactstrap';

import { BsFillCaretRightFill } from "react-icons/bs"
import { WiMoonFull } from "react-icons/wi";
import { IconContext } from "react-icons"
import ChartDataLabels from 'chartjs-plugin-datalabels'; //used to display values on charts

const moment = require('moment'); //library to get todays date

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioSelected: 1,
      today: moment().format('DD-MM-YYYY'),
      date: [],
      bar_consumption: [],
      total_supply: 0,
      total_storage: 0,
      total_consumption: 0,
      total_treated: 380,
      doughnut_data: {
        labels: [
          'Washer ' + 100,
          'CIP ' + 100,
          'UHT ' + 100,
          'label ' + 100,
          'Others ' + 100
        ],
        datasets: [
          {
            data: [100, 100, 100, 100, 100],
            backgroundColor: [
              '#21748B',
              '#40A3BF',
              '#60BED9',
              '#132D34',
              '#124A5A',
              '#21748B',
            ],
            hoverBackgroundColor: [
              '#21748B',
              '#40A3BF',
              '#60BED9',
              '#132D34',
              '#124A5A',
              '#21748B',
            ],
          }
        ]
      },
      options: {
        plugins: {
          labels: {
            render: "percentage",
            fontColor: 'white',
            precision: 2
          }

        }
      }
    }

    this.doughnut_balance = this.doughnut_balance.bind(this);
    this.barGraph = this.barGraph.bind(this);
    this.mainChartOpts = this.mainChartOpts.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.borderColor = this.borderColor.bind(this);
  }

  async componentDidMount() {
    try {
      this.getfromApi()
      this.interval = setInterval(this.getfromApi, 300000);
    } catch (err) {
      console.log(err.message);
    }
  }

  //data from API updating every 5 minutes
  getfromApi = async () => {
    let myheaders = {
      //Token is added here
      "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaWQiOiI3ZWRmODRmNC03MjJiLTQ3OWEtOGY2ZS1iYjI3M2NmMTM0NGUiLCJleHAiOjE1OTAzMDc5NjN9.dLRzCBscIZkfzTcrI4BqvvDy-uJ_URcoDCm52BA1l3g"
    }


    //fetching everyday consumption
    try {
      var i;
      var date = [];
      var bar_consumption = []
      var total_consumption = 0
      await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/graph?duration=thismonth&category=Internal Source", {
        method: 'GET',
        headers: myheaders
      })
        .then(response => response.json())
        .then(bar => {
          for (i = 10; i < 20; i++) {
            date.unshift(Object.values(bar.data[i]))
          }
          for (i = 0; i < 10; i++) {
            bar_consumption.unshift(date[i][0].process_consumption / 1000)
            total_consumption = total_consumption + bar_consumption[i]
          }
        })

      this.setState({ bar_consumption: bar_consumption, total_consumption: total_consumption })
    } catch (err) {
      console.log(err.message);
    }

    //fetching total supply and total storage
    try {
      var total_supply = 0
      var total_storage = 0
      await fetch("https://api.fluxgen.in/aquagen/v1/industries/DEMO1/consumption/latest?category=Storage", {
        method: 'GET',
        headers: myheaders
      })
        .then(response => response.json())
        .then(balance => {
          total_supply = (balance.data.units[0].DEMO1SU2.process_level + balance.data.units[1].DEMO1SU1.process_level) / 1000
          total_storage = (balance.data.units[0].DEMO1SU2.max_capacity + balance.data.units[1].DEMO1SU1.max_capacity) / 1000

        })

      this.setState({ total_supply: total_supply.toFixed(2), total_storage: total_storage })
    } catch (err) {
      console.log(err.message);
    }

  };


  //doughnut chart and re-rendering to update values onClick of bar chart
  doughnut_balance(selected_date) {
    var i;
    var date = [];
    var data;
    var labels = [];

    //date array
    for (i = 0; i < 10; i++) {
      date.unshift(moment().subtract(i, 'days').format('DD-MM-YYYY'))
    }

    var data_doughnut = [[130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90], [130, 200, 240, 100, 180], [260, 190, 130, 175, 90]]

    //assigning data of the correct date to doughnut chart 
    for (i = 0; i < 10; i++) {
      if (selected_date === date[i]) {
        data = data_doughnut[i]
        break;
      }
      else {
        continue;
      }
    }

    //doughnut chart

    labels = ['Washer ' + data[0], 'CIP ' + data[1], 'UHT ' + data[2], 'label ' + data[3], 'Others ' + data[4]]

    var doughnut = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            '#21748B',
            '#40A3BF',
            '#60BED9',
            '#132D34',
            '#124A5A',
            '#21748B',
          ],
          hoverBackgroundColor: [
            '#21748B',
            '#40A3BF',
            '#60BED9',
            '#132D34',
            '#124A5A',
            '#21748B',
          ],
        }
      ],
    };

    this.setState({ doughnut_data: doughnut }) //re-rendering
  }


  //bar chart
  barGraph = () => {

    var i = 0;
    var labels;
    var data;
    var date = [];
    var month = ['Week 1', 'Week 2', 'Week 3', 'Week 4']; //dummy data for 'this month' option
    var month_10 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']; //dummy data for 'last 10 months' option
    var greatest;
    var indexOfGreatest;
    var backgroundColor = [];
    var hoverBackgroundColor = [];
    var borderColor = [];
    var hoverBorderColor = [];

    //x-axis bar graph (dates)
    for (i = 0; i < 10; i++) {
      date.unshift(moment().subtract(i, 'days').format('DD-MM-YYYY'))
    }

    //for last 10 days, this month and 10 months options and respective data
    //only last 10 days data is taken from API
    if (this.state.radioSelected === 1) {
      labels = date
      data = this.state.bar_consumption
    }
    else if (this.state.radioSelected === 2) {
      labels = month
      data = [90.4, 79.6, 68.5, 83.8]
    }
    else {
      labels = month_10
      data = [370.6, 450.3, 367.8, 380.6, 370.6, 470.3, 367.8, 380.6, 390.4, 315.4]
    }

    //obtain index of highest bar
    for (i = 0; i < data.length; i++) {
      if (!greatest || data[i] > greatest) {
        greatest = data[i];
        indexOfGreatest = i;
      }
    }

    //to change the colour of the highest bar
    for (i = 0; i < data.length; i++) {
      if (i === indexOfGreatest) {
        backgroundColor.push('rgb(255, 153, 128)')
        hoverBackgroundColor.push('rgb(255, 92, 51, 0.4)')
        borderColor.push('rgb(255, 92, 51)')
        hoverBorderColor.push('rgb(255, 92, 51)')
      }
      else {
        backgroundColor.push('rgba(204, 230, 255)')
        hoverBackgroundColor.push('rgb(51, 156, 255, 0.4)')
        borderColor.push('rgba(51, 156, 255)')
        hoverBorderColor.push('rgb(51, 156, 255)')
      }
    }

    //original bar graph code
    const bar = {
      labels: labels,
      datasets: [
        {
          label: 'Kiloliters',
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
          hoverBackgroundColor: hoverBackgroundColor,
          hoverBorderColor: hoverBorderColor,
          data: data,
        },
      ],
    };

    return bar

  };


  //options for bar chart
  mainChartOpts = () => {

    var i = 0;
    var date = [];

    //x-axis bar graph (dates)
    for (i = 0; i < 10; i++) {
      date.unshift(moment().subtract(i, 'days').format('DD-MM-YYYY'))
    }

    const mainChartOpts = {

      //manipulate x-axis and y-axis
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 0.5,
            gridLines: {
              drawOnChartArea: false,
            },
          }
        ],
        yAxes: [
          {
            ticks: {
              display: true
            },
            gridLines: {
              drawOnChartArea: true,
              drawBorder: true,
              display: true
            },
          }
        ],
      },
      tooltips: {
        xPadding: 10,
        yPadding: 10,
        //remove the colour box
        custom: function (tooltip) {
          tooltip.displayColors = false;
        },
        callbacks: {
          //use label callback to return the desired label
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel + ' kL';
          },
          //remove title
          title: function (tooltipItem, data) {
            return;
          }
        }
      },
      //Onclick function in order to change data displayed on doughnut chart
      onClick: (e, bar_index) => {
        var index = bar_index[0]._index;
        this.doughnut_balance(date[index])
      }
    }
    return mainChartOpts;
  }


  //function for 3 buttons on bar chart - last 10 days, this month and 10 months
  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  //balance chart colour range
  borderColor(value) {
    var color;
    if (value > 300) {
      color = '#ff0000' //red
    }
    else if (value > 150 && value <= 300) {
      color = '#ffff00' //yellow
    }
    else {
      color = '#00ff00' //green
    }

    return color

  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Consumption</CardTitle>
                  </Col>
                  <Col />
                  <Col>
                    <Row>
                      <Button className="btn-pill" style={{ fontSize: '10px' }} size="sm" color="ghost-info" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>LAST 10 DAYS</Button>
                      <Button className="btn-pill" style={{ fontSize: '10px' }} size="sm" color="ghost-info" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>THIS MONTH</Button>
                      <Button className="btn-pill" style={{ fontSize: '10px' }} size="sm" color="ghost-info" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>LAST 10 MONTHS</Button>
                    </Row>
                  </Col>
                  <br />
                  <br />
                </Row>
                <hr className="mt-0" />
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Bar data={this.barGraph()} options={this.mainChartOpts()} height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ height: "100%" }}>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0" style={{ fontSize: '14px' }}>Top Consumers</CardTitle>
                  </Col>
                </Row>
                <br />
                <hr className="mt-0" />
                <br />
                <div className="chart-wrapper">
                  <Doughnut
                    data={this.state.doughnut_data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: true,
                        //to postition label to the right
                        position: 'right',
                      },
                      tooltips: {
                        callbacks: {
                          //use label callback to return the desired label
                          label: function (tooltipItem, data) {
                            var indice = tooltipItem.index;
                            return data.labels[indice];
                          },
                        }
                      },
                      plugins: {
                        datalabels: {
                          color: '#ffffff',
                          formatter: function (value, context) {
                            return ((value / 1000) * 100).toFixed(2) + '%';
                          }
                        }
                      }
                    }
                    }
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card style={{ height: "100%" }}>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0" style={{ fontSize: '14px' }}>Balance Diagram</CardTitle>
                  </Col>
                </Row>
                <br />
                <hr className="mt-0" />
                <br />
                <Row style={{ margin: "0.15rem", textAlign: "center" }}>
                  <Col>
                    <Card style={{ borderBottomColor: this.borderColor(this.state.total_supply), borderBottomWidth: "thick", height: "100%", width: '110%' }}>
                      <div>
                        <br />
                        <b>TOTAL SUPPLY</b>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        <br />
                        {this.state.total_supply} kL
                      </div>
                      <div style={{ fontSize: "10px" }}>
                        <br />
                        Increased by 41%
                      </div>
                    </Card >
                  </Col>
                  <IconContext.Provider value={{ style: { fontSize: '20px', color: "rgb(105,105,105)", textAlign: "center", height: "100%" } }}>
                    <div>
                      <BsFillCaretRightFill />
                    </div>
                  </IconContext.Provider>
                  <Col>
                    <Card style={{ borderBottomColor: this.borderColor(this.state.total_storage), borderBottomWidth: "thick", height: "100%", width: '110%' }}>
                      <div>
                        <br />
                        <b>TOTAL STORAGE</b>
                        <br />
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        <br />
                        {this.state.total_storage} kL
                      </div>
                      <div style={{ fontSize: "10px" }}>
                        <br />
                        Increased by 41%
                      </div>
                    </Card>
                  </Col>
                  <IconContext.Provider value={{ style: { fontSize: '20px', color: "rgb(105,105,105)", textAlign: "center", height: "100%" } }}>
                    <div>
                      <BsFillCaretRightFill />
                    </div>
                  </IconContext.Provider>
                  <Col>
                    <Card style={{ borderBottomColor: this.borderColor(this.state.total_consumption), borderBottomWidth: "thick", height: "100%", width: '100%' }}>
                      <div>
                        <br />
                        <b>TOTAL CONSUMPTION</b>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        <br />
                        {this.state.total_consumption} kL
                      </div>
                      <div style={{ fontSize: "10px" }}>
                        <br />
                        Increased by 41%
                      </div>
                    </Card>
                  </Col>
                  <IconContext.Provider value={{ style: { fontSize: '20px', color: "rgb(105,105,105)", textAlign: "center", height: "100%" } }}>
                    <div>
                      <BsFillCaretRightFill />
                    </div>
                  </IconContext.Provider>
                  <Col>
                    <Card style={{ borderBottomColor: this.borderColor(this.state.total_treated), borderBottomWidth: "thick", height: "100%", width: '110%' }}>
                      <div>
                        <br />
                        <b>TOTAL TREATED</b>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        <br />
                        {this.state.total_treated} kL
                      </div>
                      <div style={{ fontSize: "10px" }}>
                        <br />
                        Increased by 41%
                      </div>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter style={{ backgroundColor: 'white' }}>
                <Row>
                  <IconContext.Provider value={{ style: { fontSize: '20px', color: "#00ff00" } }}>
                    <div>
                      <WiMoonFull />
                    </div>
                  </IconContext.Provider>
                  <div>
                    Safe Zone
                    </div>
                  <IconContext.Provider value={{ style: { fontSize: '20px', color: "#ffff00" } }}>
                    <div>
                      <WiMoonFull />
                    </div>
                  </IconContext.Provider>
                  <div>
                    Warning Zone
                    </div>
                  <IconContext.Provider value={{ style: { fontSize: '20px', color: "#ff0000" } }}>
                    <div>
                      <WiMoonFull />
                    </div>
                  </IconContext.Provider>
                  <div>
                    Danger Zone
                    </div>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;



