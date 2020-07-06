import React, { Component } from 'react'
import { CardImg, CardBody, Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

export class CommentForm extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
    }
    
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(formData){
        this.toggleModal();
        this.props.addComment(this.props.dishId, formData.rating, formData.author, formData.comment)
    }

    render(){
        return(
            <>
            <Button color="outline-secondary" onClick={this.toggleModal}><span className="fa fa-pencil"> Submit Comment </span></Button> 

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>

                    <LocalForm onSubmit={(formData) => this.handleSubmit(formData)}>

                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" className="form-control" id="rating" name="rating" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" 
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} 
                                        className="form-control" 
                                        id="author" 
                                        name="author" 
                                        placeholder="Your Name" /> 
                                    <Errors className="text-danger" model=".author" show="touched" messages={{required: 'Required', minLength:'Must be greater than 2 characters', maxLength:'Must be 15 characters or less'}} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size: 10, offset:2}}>
                                    <Button type="submit" color="primary"> Submit </Button>
                                </Col>
                            </Row>

                    </LocalForm>                   

                </ModalBody>
            </Modal>
            </>
        )
    }

}


function RenderDish({dish}){
    return(
        <Card className="col-12 col-md-5 m-1">
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments, addComment, dishId}){

    console.log(comments)
    if(comments != null){
        return(
            <div className="col-12 col-md-5 m-1">
                <h2>Comments</h2> 
                <ul className="list-unstyled">
                    {
                        comments.map((comment) => {
                            return(
                                <div key={comment.id}>
                                    <li>{comment.comment}</li>
                                    <ul className="list-inline p-2">
                                        <li className="list-inline-item">-- {comment.author}</li>
                                        <li className="list-inline-item">, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                                    </ul>
                                </div>
                            )   
                        })
                    }
                </ul>

                <CommentForm dishId={dishId} addComment={addComment} />

            </div>
        )
    }else{
        return(
            <div></div>
        )
    }

}

const DishDetails = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if(props.err){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.err}</h4>
                </div>
            </div>
        )
    }
    else if(props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                </div>
            </div>
        )
    }
}

export default DishDetails
