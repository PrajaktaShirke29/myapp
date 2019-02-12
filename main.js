//1. Import React DOM
 
import React, { PureComponent } from 'react';

//Import React DOM for rendering React component in DOM

import ReactDom from "react-dom";
import SimpleComponent from "./components/simpleComponent.jsx"
import "!style!css!bootstrap/dist/css/bootstrap.min.css"
//import productComponent from "./components/applications/productComponent";
import ProductComponent from './components/applications/productComponent.jsx';
import ProductUIComponent from './components/applications/productUIComponent.jsx';
import CompanyListComponent from "./hoc/companyList.jsx"
import StockListComponent from "./hoc/stockList.jsx"
import HoC from "./hoc/hoccomponent.jsx"

let companyData=[{id: 101, name:"Microsoft"}, {id: 102, name:"IBM"}];
let stockData=[{id: 201, name:"BSC"}, {id: 202, name:"NSE"}];

let CompanyDataComponent = HoC(CompanyListComponent, companyData);
let StockDataComponent = HoC(StockListComponent, stockData);

ReactDom.render(<CompanyDataComponent />, document.getElementById("app"));
