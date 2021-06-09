import React, {useEffect,useState} from 'react';

//import './styles/App.css';
import './styles/default.css';
import Header from './components/Header.jsx'
import Voting from './components/Voting.jsx'
import CommentSection from './components/CommentSection.jsx'
import Footer from './components/Footer.jsx'

function App(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [vote_result, set_vote_result] = useState(null)

    const fetch_question = (async()=>{
        setLoading(true);
        const api_url = `https://api.rather.ml/q/${props.match.params.questionId}`
        const response = await fetch(api_url)
        const json = await response.json()
        console.log(json)
        setData(null)
        setData(json);
        setLoading(false);
    })
    const fetch_data = (async () =>{
        setLoading(true);
        const already_seen_raw = localStorage.getItem('already_seen') || []
        if(!already_seen_raw.length) {localStorage.setItem('already_seen', "[]");}

        const api_url = "https://api.rather.ml/?"+ 
            new URLSearchParams({
                already_shown_questions: already_seen_raw,
                language: localStorage.getItem('language')|| "pt",
            })
        const response = await fetch(api_url)
        const json = await response.json()
        console.log(json)
        setData(null)
        setData(json);
        setLoading(false);
        
    });
    
    useEffect(async()=>{
        fetch_question()
    }, [])
    
    if(loading) {
        <>
            <Header fetch_data={fetch_data}/>
            <main>
                <p className="main-message">Loading...</p>
            </main>
            <Footer/>
        </>
    }
    if(!data){
        return(
            <>
                <Header fetch_data={fetch_data}/>
                <p style={{height:"calc(100vh - 160px - 40px - 10px)"}}className="main-message">Sorry, you've either already seen all questions in the current language or there are no questions yet. Be the first!</p>
                <Footer/>
            </>
        )
    }

    return (
        <>
            <Header fetch_data={fetch_data}/>
            <main>
                <Voting set_vote_result={set_vote_result} fetch_data={fetch_data} data={data}/>
                <CommentSection vote_result={vote_result} data={data}/>
            </main>
            <Footer/>

        </>
    );
}

export default App;