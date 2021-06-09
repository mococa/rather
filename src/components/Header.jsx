import React, { useState } from 'react';
import {FaLanguage} from 'react-icons/fa';
import {RiAddFill} from 'react-icons/ri';
import AddForm from './AddForm';
import LanguageSelect from './LanguageSelect';

function Header(props) {
    const [addForm, setAddForm] = useState(false);
    const [lan, setLan] = useState(false);
    function toggleAddForm(){
        setAddForm(!addForm)
    }
    function toggleSetLan(){
        setLan(!lan)
    }
    return (
        <header className="header flex-hr">
            <section className="logo">Rather</section>
            <nav>
                <a href="#"><RiAddFill onClick={()=>{toggleAddForm();setLan(false)}} style={{height:"100%", width:"30px"}}/></a>
                <a href="#"><FaLanguage onClick={()=>{toggleSetLan();setAddForm(false)}} style={{height:"100%", width:"40px"}}/></a>
            </nav>
            
            {addForm?<AddForm/>:null}
            {lan?<LanguageSelect setLan={setLan} fetch_data={props.fetch_data}/>:null}
            
        </header>
    );
}

export default Header;
