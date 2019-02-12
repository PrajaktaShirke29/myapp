import React, { Component } from 'react';
import ProductService from "./../../services/service.js"
class ProductUIComponent extends Component {
    constructor(props) {
        super(props);
    this.state = {
        ProdId: 0,
        ProdName: "",
        Price: 0,
        CategoryName: "",
        Manufacturer: "",
        Categories:["Electrical","Electronic","Food"],
        Manufacturers:["AB tech","CD Power", "EF Beverages"],
        Products: [
          {
            ProductId: 0,
            ProductName: "",
            Category: "",
            Manufacturer: "",
            Price: 0,
          }
        ],
        headers: [],
        SortBy: [
            "ProductId",
            "ProductName",
            "CategoryName",
            "Manufacturer",
            "Price"
    
          ]
      };
      this.generateTableHeaders();
      this.serv = new ProductService();
    }

    generateTableHeaders() {
        for (let c in this.state.Products[0]) {
          this.state.headers.push(c);
        }
      }
    // e is an event-payload raised on target element
    // we can read the payload data using 'e'
    onChangeProduct(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSortProduct(e){
        this.setState({[e.target.name]: e.target.value})
        this.sortBy({[e.target.name]: e.target.value});
    }
    
    onClickClear(e){
        this.setState({ProductId: 0});
        this.setState({ProductName: ""});
        this.setState({Price: 0});
        this.setState({Category: ""});
        this.setState({Manufacturer: ""});
    }
    onClickDelete(e){
        let id=e.ProductId;
       
        this.serv
            .deleteData(id)
            .then(res => res.json())
            .then(resp => resp.data)
            .catch(error => console.log(error.status));
    }

    onClickUpdate(e){
        let id=e.ProductId;

        let prd = {
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            Category: this.state.Category,
            Manufacturer: this.state.Manufacturer,
            Price: this.state.Price
        };
       
        this.serv
            .updateData(id, prd)
            .then(res => res.json())
            .then(resp => resp.data)
            .catch(error => console.log(error.status));
    }

    onClickSave(e){
        alert(`${this.state.ProductId} 
        ${this.state.ProductName} 
        ${this.state.Category} 
        ${this.state.Manufacturer} 
        ${this.state.Price}`);

        let prd = {
            ProductId: this.state.ProductId,
            ProductName: this.state.ProductName,
            Category: this.state.Category,
            Manufacturer: this.state.Manufacturer,
            Price: this.state.Price
        };

        this.serv
            .postData(prd)
            .then(res => res.json())
            .then(resp => resp.data)
            .catch(error => console.log(error.status));

        // //1. get the copy of the Products array using slice()
        // let tempArray= this.state.Products.slice();
        // //2. Push the new record in to the tempArray
        // tempArray.push({
        //     ProductId:this.state.ProductId,
        //     ProductName:this.state.ProductName,
        //     Category:this.state.Category,
        //     Manufacturer: this.state.Manufacturer,
        //     Price: this.state.Price
        // });
        // // 3. Copy the tempArray into Products array
        // this.setState({Products:tempArray});
    }

    getSelectedProduct(p){
        this.setState({ProductId: p.ProductId});
        this.setState({ProductName: p.ProductName});
        this.setState({Price: p.Price});
        this.setState({Category: p.Category});
        this.setState({Manufacturer: p.Manufacturer});

    }

    // method will be executed after render() complete its job
    componentDidMount(){
        let prds=this.serv
                      .getData()
                    .then(data => data.json())
                    .then(value =>{
                       // console.log(JSON.stringify(value.data));
                        this.setState({Products:value.data});
                    })
                    .catch(error =>{
                        console.log(`Error Occured ${error.status}`);
                    });
    }
    onReverse(e){
        let temp =this.state.Products;
        temp.reverse();
        this.setState({Products:temp});
    }

    sortByType(e){
        let type=e.target.value;
        let temp =this.state.Products;

        temp.sort(function(a,b){
            if(typeof a[type] == 'string' && a[type]!= undefined){
                return a[type].toLowerCase().localeCompare(b[type].toLowerCase());
            }
            else{
                return a[type] - b[type];
            }
        })
        this.setState({Products:temp});
    }

    render() { 
        return ( 
            <div className="container">
                <div className="form-group">
                    <label htmlFor="ProductId">ProductId</label>
                    <input type="text" 
                    className="form-control" 
                    name="ProductId"
                    value={this.state.ProductId}
                    onChange={this.onChangeProduct.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="ProductName">ProductName</label>
                    <input type="text"
                     className="form-control"
                     name="ProductName"
                    value={this.state.ProductName} 
                    onChange={this.onChangeProduct.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Category">Category</label>
                    <select className="form-control" 
                     name="Category"
                        value={this.state.Category}
                        onChange={this.onChangeProduct.bind(this)}
                        >
                        {this.state.Categories.map((c,i) =>(<Options key={i} data={c} />)

                        )}
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Manufacturer">Manufacturer</label>
                    <select className="form-control"
                     name="Manufacturer"
                    value={this.state.Manufacturer}
                    onChange={this.onChangeProduct.bind(this)}>
                    {this.state.Manufacturers.map((c,i) =>(<Options key={i} data={c} />))}
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Price">Price</label>
                    <input type="text" className="form-control"
                     name="Price"
                    value={this.state.Price} 
                    onChange={this.onChangeProduct.bind(this)}
                    />
                </div>
                <div className="container">
                <div className="form-group">
                 <label htmlFor="SortBy">Sort By</label>
                    <select
                        type="text"
                        className="form-control"
                         name="sortBy"
                          value={this.state.sortBy}
                        onClick={this.sortByType.bind(this)}
                    >
                    {this.state.SortBy.map((c, i) => (
                            <Options key={i} data={c} />
                     ))}
                </select>
                </div>
                <div className="form-group">
                <div className="form-check form-check-inline">
                         <input
                         className="form-check-input"
                                  type="radio"
                             name="option"
                                 id="sort"
                                  value="sort"
                             onClick={this.sortByType.bind(this)}
                         />
                        <label className="form-check-label" htmlFor="sort">
                        Sort
                    </label>
                    </div> 
                    <div className="form-check form-check-inline">
                         <input
                         className="form-check-input"
                                  type="radio"
                             name="option"
                                 id="sort"
                                  value="sort"
                             onClick={this.onReverse.bind(this)}
                         />
                        <label className="form-check-label" htmlFor="sort">
                        Reverse
                    </label>
                    </div>    
                </div>                           
                </div>
                <div>
                <table className="table ">
                    <tbody>
                        <tr>
                        <td>
                            
                            <input type="button" 
                            value="New" 
                            className="btn btn-default"
                            onClick={this.onClickClear.bind(this)} />
                        </td>

                        <td>                        
                            <input type="button" 
                            value="Save" 
                            className="btn btn-success" 
                                onClick={this.onClickSave.bind(this)}
                            />
                        </td>
                            
                        <td>                        
                            
                        </td>  
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="container">
                

                <table className="table table-bordered table-stripped">
                <thead>
                    {this.state.headers.map((h, i) => (
                         <TableHeader key={i} header={h} />
                      ))}
                </thead>
                    <tbody>
                        {this.state.Products.map((prd, idx) =>(
                            <TableRow key={idx} row={prd} 
                                selected={this.getSelectedProduct.bind(this)}
                                deleted={this.onClickDelete.bind(this)}
                                updated={this.onClickUpdate.bind(this)}
                            />
                            
                        ))}
                        
                    </tbody>
                </table>
                   
                </div>
                
            </div>
         );
    }
}
 
// Component that will render option
// the props.data is the data passed form the parent of this component
class Options extends Component{
    render(){
        return(
            <option value={this.props.data}>
                {this.props.data}
            </option>
        );

    }
}
class TableHeader extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <th>{this.props.header}</th>;
    }
  }

class TableRow extends Component{
    constructor(props){
        super(props);
    }
    onRowClick(){
        alert(`Row clicked ${JSON.stringify(this.props.row)}`);
        // a new "selected()" method is used to Passed received data
         this.props.selected(this.props.row);
         
    }
    onRowDelete() {
        // a "selected" method is used to pass received data
        this.props.deleted(this.props.row);
      }
      onRowUpdate() {
        // a "selected" method is used to pass received data
        this.props.updated(this.props.row);
      }
    render(){
        return(
            <tr onClick={this.onRowClick.bind(this)}>
            <td>{this.props.row.ProductId}</td>
            <td>{this.props.row.ProductName}</td>
            <td>{this.props.row.Category}</td>
            <td>{this.props.row.Manufacturer}</td>
            <td>{this.props.row.Price}</td>
            <td><button
            className="btn btn-danger"
            onClick={this.onRowDelete.bind(this)}
          >
            Delete
          </button></td>
            <td><input type="button" 
                        value="Update" 
                        className="btn btn-warning" 
                        onClick={this.onRowUpdate.bind(this)}
                            /></td>
            </tr>
        );
    }
}
export default ProductUIComponent;