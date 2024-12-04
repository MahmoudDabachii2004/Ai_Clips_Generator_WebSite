import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

const Auth = () => {
    // Get current location using useLocation hook
    const location = useLocation();
    const path = location.pathname.split("/").pop(); // Extract the last part of the path

    // Redirect if the path is not "login" or "register"
    if (path !== "login" && path !== "register") {
        return <Navigate to="/authentification/login" replace />;
    }

    return (
        <div>
            {path === "login" ? (
                <div className="hero is-primary is-fullheight">
                    <div className="hero-body container is-justify-content-center">
                        <div className="section" style={{ minWidth: "50%" }}>
                            <div className="box" style={{ minWidth: "100%" }}>
                                <h1 className='title'>Login</h1>
                                <form>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input className="input" type="email" placeholder="Your Email Address" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input className="input" type="password" placeholder="Your Password" />
                                        </div>
                                    </div>
                                    <button type='submit' className='button is-success'>Login</button>
                                    <div className="field mt-3">
                                        <label htmlFor="" className="label">Don't have an account?
                                            <Link to="/authentification/register"><span className='m-1'>Create Account</span></Link>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hero is-primary is-fullheight">
                    <div className="hero-body container is-justify-content-center">
                        <div className="section" style={{ minWidth: "50%" }}>
                            <div className="box" style={{ minWidth: "100%" }}>
                                <h1 className='title'>Register</h1>
                                <form>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input className="input" type="email" placeholder="Your Email Address" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input className="input" type="password" placeholder="Your Password" />
                                        </div>
                                    </div>
                                    <button type='submit' className='button is-success'>Register</button>
                                    <div className="field mt-3">
                                        <label htmlFor="" className="label">Already have an account?
                                            <Link to="/authentification/login"><span className='m-1'>Login</span></Link>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Auth;