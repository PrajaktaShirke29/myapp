import React, { Component } from 'react';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ProductId:0,
            ProductName: "",
            Category:"",
            Manufacturer:"",
            Price: 0,
            Products:[{
                ProductId:101,
                ProductName: "Laptop",
                Category:"Electronic",
                Manufacturer:"Dell",
                Price: 19000},
                {
                    ProductId:102,
                    ProductName: "Iron",
                    Category:"Electronic",
                    Manufacturer:"Bajaj",
                    Price: 1900
                }
            ],
            Categories:["Electrical","Electronic","Food"],
            Manufacturers:["AB tech","CD Power", "EF Beverages"]
         };
    }

    // e is an event-payload raised on target element
    // we can read the payload data using 'e'
    onChangeProductId(e){
        this.setState({ProductId: e.target.value})
    }
    onChangeProductName(e){
        this.setState({ProductName: e.target.value})
    }
    onChangePrice(e){
        this.setState({Price: e.target.value})
    }
    onChangeCategory(e){
        this.setState({Category: e.target.value})
    }
    onChangeManufacturer(e){
        this.setState({Manufacturer: e.target.value})
    }
    onClickClear(e){
        this.setState({ProductId: 0});
        this.setState({ProductName: ""});
        this.setState({Price: 0});
        this.setState({Category: ""});
        this.setState({Manufacturer: ""});
    }
    onClickSave(e){
        alert(`${this.state.ProductId} 
        ${this.state.ProductName} 
        ${this.state.Category} 
        ${this.state.Manufacturer} 
        ${this.state.Price}`);

        //1. get the copy of the Products array using slice()
        let tempArray= this.state.Products.slice();
        //2. Push the new record in to the tempArray
        tempArray.push({
            ProductId:this.state.ProductId,
            ProductName:this.state.ProductName,
            Category:this.state.Category,
            Manufacturer: this.state.Manufacturer,
            Price: this.state.Price
        });
        // 3. Copy the tempArray into Products array
        this.setState({Products:tempArray});
    }

    getSelectedProduct(p){
        this.setState({ProductId: p.ProductId});
        this.setState({ProductName: p.ProductName});
        this.setState({Price: p.Price});
        this.setState({Category: p.Category});
        this.setState({Manufacturer: p.Manufacturer});

    }
    render() { 
        return ( 
            <div className="container">
                <div className="form-group">
                    <label htmlFor="ProductId">ProductId</label>
                    <input type="text" 
                    className="form-control" 
                    value={this.state.ProductId}
                    onChange={this.onChangeProductId.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="ProductName">ProductName</label>
                    <input type="text"
                     className="form-control"
                    value={this.state.ProductName} 
                    onChange={this.onChangeProductName.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Category">Category</label>
                    <select className="form-control" 
                        value={this.state.Category}
                        onChange={this.onChangeCategory.bind(this)}
                        >
                        {this.state.Categories.map((c,i) =>(<Options key={i} data={c} />)

                        )}
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Manufacturer">Manufacturer</label>
                    <select className="form-control"
                    value={this.state.Manufacturer}
                    onChange={this.onChangeManufacturer.bind(this)}>
                    {this.state.Manufacturers.map((c,i) =>(<Options key={i} data={c} />))}
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Price">Price</label>
                    <input type="text" className="form-control"
                    value={this.state.Price} 
                    onChange={this.onChangePrice.bind(this)}
                    />
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
                            
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="container">
                <table className="table table-bordered table-stripped">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>ProductName</th>
                            <th>Category</th>
                            <th>Manufacturer</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Products.map((prd, idx) =>(
                            <TableRow key={idx} row={prd} 
                                selected={this.getSelectedProduct.bind(this)}
                            />
                        ))}
                    </tbody>
                </table>
                   
                </div>





                <div className="container">
                <table className="table table-bordered table-stripped">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>ProductName</th>
                            <th>Category</th>
                            <th>Manufacturer</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Products.map((prd, idx) =>(
                            <TableRow key={idx} row={prd} 
                                selected={this.getSelectedProduct.bind(this)}
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

class TableRow extends Component{
    constructor(props){
        super(props);
    }
    onRowClick(){
        alert(`Row clicked ${JSON.stringify(this.props.row)}`);
        // a new "selected()" method is used to Passed received data
         this.props.selected(this.props.row);
    }
    render(){
        return(
            <tr onClick={this.onRowClick.bind(this)}>
            <td>{this.props.row.ProductId}</td>
            <td>{this.props.row.ProductName}</td>
            <td>{this.props.row.Category}</td>
            <td>{this.props.row.Manufacturer}</td>
            <td>{this.props.row.Price}</td>
            </tr>
        );
    }
}
export default ProductComponent;