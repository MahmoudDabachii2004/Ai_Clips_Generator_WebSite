import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const buttonsInfo = [
        { name: "DashBoard", path: "/" },
        { name: "Create Video", path: "/createVideo" },
        { name: "Detail Video", path: "/detailVideo" },
    ];

    const Card = () => {
        return (
            <div className="box">

                {/* Placeholder for video data */}
                <div className="columns is-flex is-justify-content-center is-align-items-center has-text-centered">
                    <div className="column">Video 1</div>
                    <div className="column">2024-01-01</div>
                    <div className="column"><button className='button is-danger'>Supprimer</button></div>
                    <div className="column"><button className='button is-primary'>Voir</button></div>

                </div>

            </div>
        );
    }


    return (
        <div>
            <section className="hero is-success is-fullheight">
                <div className="hero-body container is-justify-content-center">
                    <div className="section " style={{ minWidth: "100%" }}>
                        <div className="columns">
                            <div className="column is-one-fifth">
                                <div className="box">
                                    <div className="haut">
                                        <h1 className='title is-4'>DashBoard</h1>
                                    </div>
                                    <hr />
                                    <div className="bas">
                                        <div className="buttons">
                                            {buttonsInfo.map((button, index) => (
                                                <Link
                                                    key={index}
                                                    to={button.path} // Ensure this points to your desired route
                                                    className="button is-primary is-fullwidth mt-3"
                                                >
                                                    {button.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="column">
                                <div className="box">
                                    <div className="haut">
                                        <h1 className='title is-4'>All Of Your Video: </h1>
                                    </div>
                                    <hr />
                                    <div className="bas">
                                        <div className="box">
                                            <div className="box">
                                                <div className="columns is-flex is-justify-content-center is-align-items-center has-text-centered">
                                                    <div className="column has-text-weight-bold">Nom De La Video</div>
                                                    <div className="column has-text-weight-bold">Date De Creation</div>
                                                    <div className="column has-text-weight-bold">Supprimer</div>
                                                    <div className="column has-text-weight-bold">Voir</div>
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
