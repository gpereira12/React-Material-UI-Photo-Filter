import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import ImagesResults from '../images-result/ImagesResults';
import { FormControl, InputLabel } from '../../../node_modules/@material-ui/core';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class Search extends Component {
  state = {
      searchText: '',
      amount: 15,
      apiUrl: 'https://pixabay.com/api/',
      apiKey: '9506964-09bf1fa99da584d94fa793d51',
      images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({[e.target.name]: val}, () => {
      if (val === '') {
        this.setState({ images: []});
      } else {
        axios.get(
          `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
            this.state.searchText
          }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
        )
        .then(res => this.setState({ images: res.data.hits }))
        .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, value, index) => this.setState({ [e.target.name] : e.target.value });

  render() {
    console.log(this.state.images);
    const { classes } = this.props;

    return (
      <div>
        <FormControl className={classes.formControl}>
          <TextField 
            name='searchText'
            value={this.state.searchText}
            onChange={this.onTextChange}
            label = 'Search for Images'
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='amount-p'>Amount</InputLabel>
          <Select
            value = {this.state.amount}
            onChange = {this.onAmountChange}
            inputProps={{
              name: 'amount',
              id: 'amount-p',
            }}
          >
            <MenuItem value=''><em>None</em></MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <br />

        {this.state.images.length > 0 ? (
          <ImagesResults  images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(Search);
