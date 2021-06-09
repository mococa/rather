import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './styles/index.css'
import './styles/mobile_styles.css'

import App from './App'
import Question from './Question'

const style404 = {
    display: 'flex',
    flexFlow:'column',
    height: '100vh',
    placeItems: 'center',
    width: '100vw',
    placeContent: 'center',
    color: 'white'

}
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/q/:questionId" component={Question} />
                <Route path="/" render={()=>{
                    return(
                        <div style={style404}>
                            <h1>404</h1>
                            <h4>Couldn't find page</h4>
                        </div>
                    );
                    } } />
            </Switch>
        </BrowserRouter>   
    </React.StrictMode>,
  document.getElementById('root')
)
