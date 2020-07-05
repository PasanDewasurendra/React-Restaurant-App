import React from 'react'
import { CardImg, CardBody, Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Link } from 'react-router-dom'

function RenderDish({dish}){
    return(
        <Card className="col-12 col-md-5 m-1">
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments}){

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
                
                <Button color="outline-secondary"><span className="fa fa-pencil"> Submit Comment </span></Button> 

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        

                    </ModalBody>
                </Modal>

            </div>
        )
    }else{
        return(
            <div></div>
        )
    }

}

const DishDetails = (props) => {
    if(props.dish != null){
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )
    }
}

export default DishDetails
