import { Component } from "react";
import { NavLink } from "react-router-dom";
import axios, { Axios } from "axios";

class CompaniesIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        };
    }
    fetchCompanies() {
        axios
            .get('/api/companies')
            .then((response) => this.setState({ companies: response.data.data }));
    }
    componentDidMount() {
        this.fetchCompanies();
    }
    deleteCompany = (event) => {
        if (~window.confirm('Are you sure want to delete this company?')) {
            return;
        }
        axios.delete('/api/companies/${event.target.value}')
            .then(response => this.fetchCompanies())
            .catch(error => console.log(error));
    }
    renderCompanies() {
        return this.state.companies.map((company) => (
            <tr key={company.id}>
                <td className="">{company.name}</td>
                <td className="">{company.code}</td>
                <td className="">{company.email}</td>
                <td className="">{company.address}</td>
                <td className="">{company.website}</td>
                <td className="">
                    <NavLink
                        to={'/SGS/companies/edit/${company.id}'}
                        className=""
                    >
                        Edit
                    </NavLink>
                    <button
                        value={company.id}
                        onClick={this.deleteCompany}
                        type="button"
                        className=""
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }
    render() {
        return (
            <div className="">
                <div className="">
                    <NavLink
                        to="create"
                        className=""
                    >
                        Create New
                    </NavLink>
                    <table className="">
                        <thead>
                            <tr>
                                <th className="">
                                    <span className="">Name</span>
                                </th>
                                <th className="">
                                    <span className="">Code</span>
                                </th>
                                <th className="">
                                    <span className="">Email</span>
                                </th>
                                <th className="">
                                    <span className="">Address</span>
                                </th>
                                <th className="">
                                    <span className="">Website</span>
                                </th>
                                <th className="">
                                    <span className="">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {this.renderCompanies()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CompaniesIndex;