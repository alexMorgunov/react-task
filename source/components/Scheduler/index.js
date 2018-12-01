// Core
import React, { Component } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';

import Checkbox from '../../theme/assets/Checkbox';
import { BaseTaskModel } from '../../instruments';

import Task from '../Task'

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST';
import {ROOT_URL} from "../../REST/config"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksFilter: '',
            tasks: [],
            filteredTasks: [],
            newTaskMessage: '',
        };
    };
    // authOptions = () => {
    //     return {
    //         method: 'GET',
    //         url: 'https://lab.lectrum.io/hw/todo/api',
    //         headers: {
    //             'Authorization': '0iiuD02dErNMOxOr'
    //         }
    //     }
    // }

    _filterList = (e) => {
        this.setState({
            tasksFilter: e.target.value,
        });
        // const tasks = Object.assign([], this.state.tasks);
        // const filteredTasks = tasks.filter((el) => {
        //     if (e.target.value === '') {
        //         return el.isNeedToDisplay = true;
        //     }
        //     if (el.message.indexOf(e.target.value) != -1) {
        //         return el.isNeedToDisplay = false;
        //     } else {
        //         return el.isNeedToDisplay = true;
        //     }
        // });
        // this.setState({tasks: filteredTasks});
    };
    _addNewTask = (e) => {
        e.preventDefault();
        if (!this.state.newTaskMessage) return;
        const task = {
            id:        v4(),
            completed: false,
            favorite:  false,
            message:   this.state.newTaskMessage,
        };
        this.setState({
            tasks: [...this.state.tasks, task],
            newTaskMessage: '',
        });
    };

    _updateNewTaskMessage = (e) => {
        this.setState({
            newTaskMessage: e.target.value,
        });
    };
    _updateTaskMessageOnKeyDown = (id, message) => {
        const index = this.state.tasks.findIndex((el) => el.id === id);
        const task  = {...this.state.tasks[index]};
        task.message = message;
        const copytasks = [...this.state.tasks];
        copytasks[index] = task;
        this.setState({ tasks: copytasks });
    };


    // componentDidMount () {
    //     axios(this.authOptions())
    //         .then( (response) => {
    //             this.setState({
    //                 tasks: [...this.state.tasks, response.data.data],
    //             });
    //         });
    // }
    render () {
        const tasks = this.state.tasks;
        const tasksList = tasks.map((item, index) => {
            return (<Task
                _updateTask = { this._updateTaskMessageOnKeyDown.bind(this, item.id)}
                completed = { item.completed }
                favorite = { item.favorite }
                id = { item.id }
                key = { item.id }
                message = { item.message }
            />);
        })
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач!</h1>
                        <input placeholder = 'searchbar' value = { this.state.tasksFilter } onChange = { this._filterList } />
                    </header>
                    <section>
                        <form onSubmit = { this._addNewTask } >
                            <input value = { this.state.newTaskMessage } type = 'text' placeholder = 'Add task' onChange = {this._updateNewTaskMessage} />
                            <button type = 'submit' >Add</button>
                        </form>
                        <div>
                            <ul>
                                { tasksList }
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox/>
                        <span className={Styles.completeAllTasks}>completeAllTasks</span>
                    </footer>
                </main>
            </section>
        );
    }
}
