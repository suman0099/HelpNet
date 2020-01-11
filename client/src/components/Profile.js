import React, { useState } from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBIcon,
    MDBBtn
} from "mdbreact";

import EditProfile from "./EditProfile";

const TeamPage = () => {
    const [editMode, setEditMode] = useState(false);
    return (
        <div>
            <MDBCard className="my-5 px-5 pb-1 text-center">
                <MDBCardBody>
                    <h2 className="h1-responsive font-weight-bold my-5">
                        Welcome to HelpNet - The Real Use of Internet
                    </h2>
                    <p className="grey-text w-responsive mx-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Fugit, error amet numquam iure provident voluptate
                        esse quasi, veritatis totam voluptas nostrum quisquam
                        eum porro a pariatur veniam.
                    </p>
                    <MDBRow className="text-md-left">
                        <MDBCol lg="6" md="12" className="mb-5">
                            <MDBCol md="4" lg="6" className="float-left">
                                <MDBCardImage
                                    className="img-fluid"
                                    src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                                    waves
                                />
                            </MDBCol>
                            <MDBCol md="8" lg="6" className="float-right">
                                <h4 className="font-weight-bold mb-3">
                                    John Doe
                                </h4>
                                <h6 className="font-weight-bold grey-text mb-3">
                                    Web Designer
                                </h6>
                                <p className="grey-text">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quod eos id officiis hic
                                    tenetur.
                                </p>
                                <a href="#!" className="p-2 fa-lg fb-ic">
                                    <MDBIcon fab icon="facebook-f" />
                                </a>
                                <a href="#!" className="p-2 fa-lg tw-ic">
                                    <MDBIcon fab icon="twitter" />
                                </a>
                                <a href="#!" className="p-2 fa-lg dribbble-ic">
                                    <MDBIcon fab icon="dribbble" />
                                </a>
                            </MDBCol>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
            <MDBBtn color="primary" onClick={() => setEditMode(!editMode)}>
                <MDBIcon icon="pencil-alt" /> &nbsp; Edit
            </MDBBtn>
            {editMode ? <EditProfile /> : null}
        </div>
    );
};

export default TeamPage;
