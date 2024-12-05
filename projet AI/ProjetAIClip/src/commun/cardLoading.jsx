import React from 'react';
import imgLoading from "../assets/Animation - 1733349435367.json";

const CardLoading = ({Message}) => {
    return (
        <div>
            <div className="columns is-flex is-justify-content-center is-align-items-center has-text-centered">
                <div className="level">
                    <div className="level-left">
                        <img src={imgLoading} alt="" />
                    </div>
                    <div className="level-right">
                        <h1 className='label'>{Message}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardLoading;


