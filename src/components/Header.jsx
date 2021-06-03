import React from 'react';
import {FaLanguage} from 'react-icons/fa';
import {RiAddFill} from 'react-icons/ri';

function Header() {
  return (
    <header className="header flex-hr">
        <section className="logo">Woujarather</section>
        <nav>
            <a href="#"><RiAddFill style={{height:"100%", width:"30px"}}/></a>
            <a href="#"><FaLanguage style={{height:"100%", width:"40px"}}/></a>
        </nav>
    </header>
  );
}

export default Header;
