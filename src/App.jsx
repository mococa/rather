import React, {useEffect,useState} from 'react';
//import './styles/App.css';
import './styles/default.css';
import Header from './components/Header.jsx'
import Voting from './components/Voting.jsx'
import CommentSection from './components/CommentSection.jsx'

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const self = this;
    
    const fetch_data = (async () =>{
        setData(null);
        setLoading(true);
        const already_seen_raw = localStorage.getItem('already_seen') || []
        if(!already_seen_raw.length) {localStorage.setItem('already_seen', "[]");}

        const api_url = "https://api.woujarather.tk/?"+ 
            new URLSearchParams({
                already_shown_questions: already_seen_raw,
                //language: localStorage.getItem('language')|| "pt",
            })
        const response = await fetch(api_url)
        const json = await response.json()
        console.log(json)
        setData(json);
        setLoading(false);
        
    });
    
    useEffect(async()=>{
        fetch_data()
    }, [])

    if(loading) {
        return <p>Loading data</p>
    }
    
    if(!Object.keys(data).length) {
        return( 
            <p>Sorry, no more questions. You've seen them all! </p>
        )
    }

    return (
        <>
            <Header/>
            <main>
                <Voting fetch_data={fetch_data} data={data?data:null}/>
                <CommentSection data={data?data:null}/>
            </main>

        </>
    );
}

export default App;