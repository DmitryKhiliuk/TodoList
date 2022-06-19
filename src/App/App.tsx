import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "../Components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, AppDispatch, AppRootStateType} from "./store";
import {addTodoListTC, fetchTodoListsTC} from "../Reducers/todolists-reducer";
import {ThunkDispatch} from "redux-thunk";
import {TasksStateType, TodoListDomainType} from "../types/types";
import {SuperInput} from "../Components/SuperInput";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Menu } from '@mui/icons-material';


function App() {
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    },[])

    const addItemHandler = (title: string) => {
        dispatch(addTodoListTC(title))
    }

    return (

        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <SuperInput addItem={addItemHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                        <TodoList key={tl.id}
                                  TDLid={tl.id}
                                  tasks={tasks[tl.id]}
                                  title={tl.title}
                                        />
                        </Paper>
                    </Grid>
                })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
