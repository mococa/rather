import React from 'react';
import {FaGithub} from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer flex-hr">
            <a className="flex-hr" href="https://github.com/mococa" target="_blank" style={{placeItems:'center', gap:'10px'}}><FaGithub style={{height:'100%', width:'50px'}}/><h4>Made by Luiz Felipe Moureau</h4></a>
        </footer>
    );
}

export default Footer;
