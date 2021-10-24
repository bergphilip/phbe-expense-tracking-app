import React from 'react';

const BottomNavigation = ({setOpen}) => {
    return (
        <>
        <div className="bottom-navigation">
        </div>
        <div onClick={setOpen} className="add-expenses-btn"></div>
        </>
    );
}

export default BottomNavigation;
