import React, {Component} from 'react'
import axios from 'axios';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './App.css';

export class CascadingDropdown extends Component {

    constructor(props) {

        super(props)

        this.state = {
            StateId: '',
            CountryId: '',
            CountryData: [],
            StateData: [],
            CityData: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/admin/manage-category', {
            action: "view"
        }).then(response => {
            console.log(response.data);
            this.setState({
                CountryData: response.data
            });
        });
    }

    ChangeteState = (e) => {
        this.setState({CountryId: e.target.value});

        axios.get('http://localhost:65173/Api/cascading/State?CountryId=' + e.target.value).then(response => {
            console.log(response.data);
            this.setState({
                StateData: response.data,
            });
        });
    }
    ChangeCity = (e) => {
        this.setState({StateId: e.target.value});
        axios.get('http://localhost:65173/Api/cascading/city?StateId=' + e.target.value).then(response => {
            console.log(response.data);
            this.setState({
                CityData: response.data
            });
        });
    }

    render() {
        return (
            <div className={"container bg-light mt-5 pt-5"}>
                <div className="hdr">
                    <div className="col-sm-12 btn btn-info">
                        Cascading Dropdown in ReactJS
                    </div>
                </div>

                <div className="form-group dropdn">
                    {/* category */}
                    <select className="form-control" name="country"
                        // value={this.state.CountryId}
                        // defaultValue={this.state.CountryId}
                            onChange={this.ChangeteState}>
                        <option>Select Country</option>

                        {this.state.CountryData.map((e, key) => {
                            return <option key={key}
                                // value={e.CountryId}
                                           defaultValue={e.categoryid}>
                                {e.categoryname}
                            </option>;
                        })}
                    </select>

                    {/* subcatefory */}
                    <select className="form-control slct" name="state"
                            value={this.state.StateId}
                        // defaultValue={this.state.StateId}
                            onChange={this.ChangeCity}>
                        <label htmlFor="company">State Name</label>
                        {this.state.StateData.map((e, key) => {
                            return <option key={key}
                                // value={e.StateId}
                                           defaultValue={e.StateId}
                            >{e.StateName}</option>;
                        })}
                    </select>
                    <select className="form-control slct" name="city"
                            value={this.state.CityData}>
                        {/*defaultValue={this.state.CityData}>*/}
                        {this.state.CityData.map((e, key) => {
                            return <option key={key}
                                // value={e.CityId}
                                           defaultValue={e.CityId}
                            >{e.cityName}</option>;
                        })}
                    </select>
                </div>
            </div>
        )
    }
}

export default CascadingDropdown