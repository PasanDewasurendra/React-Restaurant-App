import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Col, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             firstname: '',
             lastname: '',
             tel: '',
             email: '',
             agree: false,
             contactType: 'Tel.',
             message: '',
             touched: {
                 firstname: false,
                 lastname: false,
                 tel: false,
                 email: false
             }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;

        this.setState({
            [name]: value
        })


    }

    handleSubmit(event) {
        console.log('current state:'+ JSON.stringify(this.state))
        alert('current state:'+ JSON.stringify(this.state))
        event.preventDefault()
    }
    
    handleBlur = (field) => (e) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        })
    }

    validate(firstname, lastname, tel, email) {
        const error ={
            firstname: '',
            lastname: '',
            tel: '',
            email: '',
        }

        if(this.state.touched.firstname && firstname.length < 3){
            error.firstname = "First Name should be geater than 3 character"
        }else if(this.state.firstname && firstname.length > 10){
            error.firstname = "First Name should be less than 10 character"
        }

        if(this.state.touched.lastname && lastname.length < 3){
            error.lastname = "Last Name should be geater than 3 character"
        }else if(this.state.lastname && lastname.length > 10){
            error.lastname = "Last Name should be less than 10 character"
        }

        const reg = /^\d+$/;
        if(this.state.touched.tel && !reg.test(tel)){
            error.tel = "Tel Number should contain only Numbers"
        }

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1){
            error.email = "Email shoud contain @"
        }

        return error

    }

    render(){

        const error = this.validate(this.state.firstname, this.state.lastname, this.state.tel, this.state.email)


        return(
            <div className="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Contact Us</h3>
                            <hr />
                        </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="/"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handleInputChange} onBlur={this.handleBlur('firstname')} valid={error.firstname === ''} invalid={error.firstname !== ''} />
                                    <FormFeedback>{error.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handleInputChange} onBlur={this.handleBlur('lastname')} valid={error.lastname === ''} invalid={error.lastname !== ''}  />
                                    <FormFeedback>{error.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="tel" md={2}>Cotnact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="tel" name="tel" placeholder="Telephone No" value={this.state.tel}  onChange={this.handleInputChange}  onBlur={this.handleBlur('tel')} valid={error.tel === ''} invalid={error.tel !== ''} />
                                    <FormFeedback>{error.tel}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInputChange}  onBlur={this.handleBlur('email')} valid={error.email === ''} invalid={error.email !== ''}  />
                                    <FormFeedback>{error.email}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree}  onChange={this.handleInputChange} />
                                            {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}  >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" rows="12" value={this.state.message}  onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{size: 10, offset:2}}>
                                    <Button type="submit" color="primary"> Send Feedback </Button>
                                </Col>
                            </FormGroup>

                        </Form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Contact;