
     import React from "react";
     import Style from "./components/style";
     import Search from "./components/search";
     import Img from "./components/img";
     import Display from "./components/display";
     import Header from "./components/header";


     import PropTypes from 'prop-types';
    import { withStyles } from '@material-ui/core/styles';
    import CssBaseline from '@material-ui/core/CssBaseline';
    import Toolbar from '@material-ui/core/Toolbar';
    import IconButton from '@material-ui/core/IconButton';
    import Paper from '@material-ui/core/Paper';
    import Typography from '@material-ui/core/Typography';
    import Grid from '@material-ui/core/Grid';
    import Card from '@material-ui/core/Card';
    import CardContent from '@material-ui/core/CardContent';
    import CardMedia from '@material-ui/core/CardMedia';
    import Hidden from '@material-ui/core/Hidden';


     let Api_Key = process.env.REACT_APP_API_KEY;

     const styles = {
       layout: {
         width: 'auto',
         marginLeft: this.spacing.unit * 3,
         marginRight: this.spacing.unit * 3,
         [this.breakpoints.up(1100 + this.spacing.unit * 3 * 2)]: {
           width: 1100,
           marginLeft: 'auto',
           marginRight: 'auto',
         },
       },
       toolbarMain: {
         borderBottom: `1px solid ${this.palette.grey[300]}`,
       },
       toolbarTitle: {
         flex: 1,
       },
       toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: this.palette.grey[800],
    color: this.palette.common.white,
    marginBottom: this.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${this.spacing.unit * 6}px`,
    [this.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: this.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    padding: `${this.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: this.spacing.unit * 2,
    backgroundColor: this.palette.grey[200],
  },
  sidebarSection: {
    marginTop: this.spacing.unit * 3,
  },
  footer: {
    backgroundColor: this.palette.background.paper,
    marginTop: this.spacing.unit * 8,
    padding: `${this.spacing.unit * 6}px 0`,
  },
};




     class Apps extends React.Component {
       constructor(props) {
         super(props);


         this.state = {
           data: '',
           city: "St. Louis",
           currentTemp: " ",
           currentWeather: " ",
           hiTemp:"",
           loTemp:"",
           isLoaded: false,
           error: null
         };
         this.onCityChange = this.onCityChange.bind(this);
       }








       handleDataChange() {

         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},us&units=imperial&appid=${Api_Key}`)
         .then(res => res.json())
               .then(
                 (result) => {
                   this.setState({
                     currentTemp:  parseInt(result.main.temp, 10),
                     isLoaded: true,
                     city: result.name,
                     data: result,
                     currentWeather: (result.weather[0].description),
                     hiTemp: parseInt(result.main.temp_max, 10),
                     loTemp: parseInt(result.main.temp_min, 10)
                   });
                   console.log(this.state.data);
                 },
                 (error) => {
                   this.setState({
                     isLoaded: true,
                     error
                   });
                 }
               )
             };


       onCityChange(e) {
         e.preventDefault();
         this.setState({
        city: e.target.city.value
       });

       };


       componentDidMount() {
         this.handleDataChange();
        };


        componentDidUpdate(prevProps, prevState) {
      if (this.state.city !== prevState.city) {
        this.handleDataChange();
      }
    }

       render() {
         const city = this.state.city;
         const temp = this.state.currentTemp ;
         const hightemp = this.state.hiTemp ;
         const lowtemp = this.state.loTemp ;
         const currentWeather = this.state.currentWeather ;

         const { classes } = this.props;

         return (
           <div className="App">
             <React.Fragment>
               <Toolbar className="mainFeaturedPost">

             <Header />


                      </Toolbar>
            </React.Fragment>
                  <main>
                    <Paper className={classes.mainFeaturedPost}>
                      <Grid container>
                        <Grid item md={6}>
                    <Search handleSubmit={this.onCityChange} />
                    </Grid>
                    <Grid item md={6}>
                    <Display
                      city={city}
                      currentTemp={temp}
                      currentWeather={currentWeather}
                      hiTemp={hightemp}
                      loTemp={lowtemp}
                       />
                     </Grid>
                   </Grid>
                     </Paper>
                    <Paper className="mainFeaturedPost">
                      <Grid container>
                        <Grid item md={6}>
                          <Style currentTemp={temp}
                                city={city}
                          />
                      </Grid>
                        <Grid item md={6}>
                          <Img currentTemp={temp} />
                        </Grid>

                  </Grid>
                  </Paper>
                  </main>
           </div>
         );
       }
     }


     export default withStyles(styles)(Apps);
