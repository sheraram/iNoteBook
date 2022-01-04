import React from 'react'

const Alert = (props) => {
    return (
        <div className="container my-3">
            <div className="alert alert-primary" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert
