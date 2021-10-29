import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './app/graphql'
//import "@material-tailwind/react/tailwind.css";

ReactDOM.render(
    <React.StrictMode>


        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <App />
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)
