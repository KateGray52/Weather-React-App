
import React from 'react';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
   this.setState({value: event.target.value});
 }


  handleSubmit(e) {
    this.props.onCityChange(e.target.value);
  }

  render() {
    const city = this.props.city;
    const scale = this.props.scale;
    return (

      <form onSubmit={this.handleSubmit}>
        <legend>Enter location:</legend>
        <textarea value={this.state.value} onChange={this.handleChange} />
        <input type="textarea" value={city}
               placeholder="City"/>
             <button>Search</button>
           </form>
    );
  }
}


export default Search;
