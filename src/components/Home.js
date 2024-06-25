import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Carousels1 from '../Parts/Carousels';
import '../App.css'
import Userinterface from '../userinterface'


const Home = () => {
 

  return (
    <div>
<Carousels1/>

<Userinterface/>

    
    </div>
  );
};

export default Home;
