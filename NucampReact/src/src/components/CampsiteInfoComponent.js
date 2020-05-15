import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, Row, Label, Card, CardImg,
  CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>

  )
}


function RenderComments({comments, postComment, campsiteId}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>
          Comments
                   </h4>
                   <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>{comment.text}<br />
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })}
                </Stagger>
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    )
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    console.log("click")
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil" /> Submit Comment
            </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <div className="form-group">

                <Label htmlFor="author">Your Name</Label>
                <Control.author model="author" id="author" name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}


                />


                <Errors
                  className="text-Calibri"
                  model="author"
                  show="touched"
                  component="div"
                  messages={{
                    minLength: "Should have at minimum two letters",
                    maxLength: "Should have at maximum fifteen letters"
                  }}
                />

              </div>
              <div className="form-group">
                <Label htmlFor="comments">Your Comments</Label>
                <Control.text model="comments" id="comments" name="comments"
                  placeholder="Your Comments"
                  className="Comments"
                  validators={{
                    minLength: minLength(30),
                    maxLength: maxLength(200),
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="Text">Your Text</Label>
                <Control.author model="Text" id="Text" name="Text"
                  placeholder="Your Text"
                  className="form-control"
                />
              </div>

            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;