import React from "react";
import { NavLink } from "react-router-dom";

const Details = (props) => {
    const { Username, Email, City, Phone } =
        (props.location && props.location.state) || {};
    return (
        <div>
            <NavLink to="/" activeClassName="active">
                Go Back
      </NavLink>
            <div className="form-details">
                <div>
                    <strong>Username:</strong> {Username}
                </div>
                <div>
                    <strong>Email:</strong> {Email}
                </div>
                <div>
                    <strong>City:</strong> {City}
                </div>
                <div>
                    <strong>Phone:</strong> {Phone}
                </div>
            </div>
        </div>
    );
};

export default Details;
