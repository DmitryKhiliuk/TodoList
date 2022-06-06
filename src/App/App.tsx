import React from 'react';
import './App.css';
import {TodoList} from "../Components/TodoList";
import {SuperInput} from "../Components/Input";


function App() {
    return <div>
        <SuperInput/>
        <TodoList/>
    </div>
}

export default App;
