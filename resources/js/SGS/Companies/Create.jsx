import axios from "axios";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

class CompaniesCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            code: "",
            email: "",
            address: "",
            website: "",
            error: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    }
    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handleCodeChange(event) {
        this.setState({ code: event.target.value });
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handleAddressChange(event) {
        this.setState({ address: event.target.value });
    }
    handleWebsiteChange(event) {
        this.setState({ website: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/api/companies', {
                name: this.state.name,
                code: this.state.code,
                email: this.state.email,
                address: this.state.address,
                website: this.state.website,
            })
            .then((response) => this.props.navigate('/SGS/companies'))
            .catch((error) => this.setState({errors: error.response.data.errors}));
    };
    errorMessage(field) {
        return (
            <div className="">
                {this.state.errors?.[field]?.map((message, index) => {
                    return <div key={index}>{message}</div>
                })}
            </div>
        );
    }
    render() {
        return (
            <form className="" onSubmit={this.handleSubmit}>
                {/* ... form fields and error messages */}
                <button
                    type="submit"
                    className=""
                >
                    Create
                </button>
            </form>
        )
    }
}

export default withNavigation(CompaniesCreate);