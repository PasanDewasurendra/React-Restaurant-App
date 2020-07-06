import React, { Component } from 'react';
import Menu from './MenuComponents';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishdetailComponent from './DishdetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import {addComment, fetchDishes, fetchComments, fetchPromos} from '../redux/ActionCreators';
import { actions } from 'react-redux-form'

const mapStateToProps = state => {
    return{
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){

    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
        dishesLoading={this.props.dishes.isLoading}
        dishesErr={this.props.dishes.err}
        promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErr={this.props.promotions.err}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
        return(
         <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          err={this.props.dishes.err}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErr={this.props.comments.err}
          addComment={this.props.addComment}
         />
        )
    }

    return (
      <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
            <Route exact path="/contacts" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route path="/about" component={() => <About leaders={this.props.leaders} />} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
          
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
