import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "St. Louis"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="blogsearchpaper">
        <form onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            name="city"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button size="small" variant="contained" type="submit">
            <i className="material-icons">search</i>
          </Button>
        </form>
        <div className="searchError">{this.props.error}</div>
      </div>
    );
  }
}

export default Search;
