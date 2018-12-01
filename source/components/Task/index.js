// Core
import React, { PureComponent, createRef } from 'react';

import Checbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    constructor (props) {
        super(props);
    }
    state = {
        isEditing: false,
    };
    componentDidUpdate() {
        if (this.state.isEditing) {
            this.taskNameRef.current.focus();
        }
    }
    _setTaskEditingState = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    };
    _updateNewTaskMessage = (e) => {
        const mess = e.target.value;
        this.props._updateTask(mess);
    }
    taskNameRef = createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        const shape = this._getTaskShape(this.props);
        return (
            <li className = { [Styles.task, shape.completed ? Styles.completed : ''].join(' ') } >
                <div className = { Styles.content }>
                    <Checbox className = { Styles.toggleTaskCompletedState } checked={shape.completed} />
                    <span>
                        <input
                            disabled = { !this.state.isEditing }
                            maxLength = '50'
                            ref = { this.taskNameRef }
                            type = 'text'
                            value = { this.props.message}
                            onChange= {this._updateNewTaskMessage}
                        />
                    </span>
                </div>
                <div className={Styles.actions}>
                    <Star className={[Styles.toggleTaskFavoriteState].join(' ')} inlineBlock />
                    <Edit className={Styles.updateTaskMessageOnClick} inlineBlock onClick = { this._setTaskEditingState } checked = { this.state.isEditing } />
                    <Remove inlineBlock />
                </div>
            </li>
        )
    }
}
