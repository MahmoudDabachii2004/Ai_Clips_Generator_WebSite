import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {

    const buttonsInfo = [
        { name: "DashBoard", path: "/" },
        { name: "Create Clips", path: "/createVideo" },
    ];

    return (
        <div className="column is-one-fifth">
            <div className="box">
                <div className="haut">
                    <h1 className='title is-4'>DashBoard</h1>
                </div>
                <hr />
                <div className="bas">
                    <div className="buttons">
                        {buttonsInfo.map((button, index) => (
                            <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="buttonContainer is-flex is-fullwidth" style={{width:"100%"}} key={index}>
                                <Link
                                    whileHover={{ scale: 1.05 }}
                                    to={button.path} // Ensure this points to your desired route
                                    className="button is-link is-fullwidth mt-3"
                                >
                                    {button.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Sidebar;
