import React, { useEffect, useState } from 'react';
import PersonForm from '../components/PersonForm';
import AllProducts from '../components/AllProducts';
export default () => {
    return (
        <div>
            <PersonForm/>
            <AllProducts/>
        </div>
    )
}