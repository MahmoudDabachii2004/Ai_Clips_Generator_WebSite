import React from 'react';
import { Link } from 'react-router-dom';
import BackImg from "../assets/cool-background.png";
import Sidebar from "../commun/sidebar";
import DeleteSVG from "../assets/delete.svg";
import { motion } from 'framer-motion';

const Dashboard = () => {

    const Card = () => {
        return (
            <motion.div
                initial={{ boxShadow: "0px 3px 10px rgba(13, 38, 76, 0.1)" }} // Initial shadow state
                whileHover={{
                    scale: 1.02,
                    translateY: -3,
                    boxShadow: "0px 9px 20px rgba(13, 38, 76, 0.19)",
                    transition: { duration: 0.3, ease: "easeInOut" }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }} // Transition for non-hover states
                className='box'
                style={{cursor: "pointer"}}
            >
                {/* Placeholder for video data */}
                <div className="columns is-flex is-justify-content-center is-align-items-center has-text-centered">
                    <div className="column"><img src={BackImg} alt="" style={{ objectFit: "cover", borderRadius: "0.5rem" }} /></div>
                    <div className="column">Video 1</div>
                    <div className="column">2024-01-01</div>
                    <div className="column"><motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    
                    className='button is-danger is-light'><img style={{ height: "1.5rem", width: "1.5rem", objectFit: "cover" }} src={DeleteSVG} alt="" /></motion.button></div>

                </div>

            </motion.div>
        );
    }


    return (
        <div>
            <section className="hero is-success is-fullheight" style={{ backgroundImage: `url(${BackImg})` }} >
                <div className="hero-body container is-justify-content-center">
                    <div className="section " style={{ minWidth: "100%" }}>
                        <div className="columns">
                            <Sidebar />
                            <div className="column">
                                <div className="box">
                                    <div className="haut">
                                        <h1 className='title is-4'>All Of Your Video Made By AI : </h1>
                                    </div>
                                    <hr />
                                    <div className="bas">
                                        <div className="box">
                                            <div className="box">
                                                <div className="columns is-flex is-justify-content-center is-align-items-center has-text-centered">
                                                    <div className="column has-text-weight-bold">Preview</div>
                                                    <div className="column has-text-weight-bold">Nom De La Video</div>
                                                    <div className="column has-text-weight-bold">Date De Creation</div>
                                                    <div className="column has-text-weight-bold">Supprimer</div>
                                                </div>
                                            </div>
                                            <Card />
                                            <Card />
                                            <Card />

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
