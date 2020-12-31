import React from 'react'

function ForgotPassword() {
            return (
                        <div>

                                    <h2 style={{ color: 'hotpink' }}>Forgot Password</h2>

                                    <form >
                                                <div className="form-group">
                                                            <input type="text" placeholder="Registered Email" id="emailForgot" className="form-control"></input>
                                                </div>

                                                <div className="form-group">
                                                            <input type="text" placeholder=" Enter OTP" className="form-control"></input>
                                                            <label style={{ color: 'red', display: 'none' }}>Password Mismatch</label>
                                                </div>

                                                <div className="form-group">
                                                            <button type="submit" className="form-control btn btn-primary">Submit</button>
                                                </div>
                                    </form>

                        </div>
            )
}

export default ForgotPassword
