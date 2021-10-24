import React from 'react';

const Header = (props) => {
    return (
        <div className="header">
            {props.headerName}
        </div>
    );
}

export default Header;
