import './style.scss'
import React from 'react'
import PropTypes from "prop-types";
let prev_time = performance.now();



class Typewriter extends React.Component {
    state = {
        content: '',
        rendered_component: []
    };
    arr_index = 0;
    rafId = null;
    timeoutId = null;



    timer = duration => {
        return new Promise(resolve => {
            window.setTimeout(resolve, duration);
        });
    };


    componentDidMount() {
        this.animationManager();
    }


    componentWillUnmount() {
        if (this.rafId) cancelAnimationFrame(this.rafId)
        if (this.timeoutId) clearTimeout(this.timeoutId)
    }


    animationFrame = (callback, ...args) => {
        return new Promise(resolve => {
            window.requestAnimationFrame(time => {
                callback(time, ...args);
            });
        });
    };


    animationManager() {
        const switchHook = (time, type_data) => {
            if (this.props.is_repeat) {
                this.backspaceAnim(time, async () => {
                    await this.timer(200)
                    this.arr_index = (this.arr_index === type_data.length - 1) ? 0 : this.arr_index + 1;
                    this.animationManager()
                })
            }
            else {
                if (this.arr_index !== type_data.length - 1) {
                    this.setState({
                        content: '', 
                        rendered_component: [...this.state.rendered_component, type_data[this.arr_index]]
                    })
                    this.arr_index = (this.arr_index === type_data.length - 1) ? 0 : this.arr_index + 1;
                    this.animationManager()
                } else {
                    if (this.rafId) cancelAnimationFrame(this.rafId)
                    if (this.timeoutId) clearTimeout(this.timeoutId)
                }
            }
        }
        const typewriterHook = time => {
            const type_data = this.props.content
            if (typeof type_data[this.arr_index] === 'string' || type_data[this.arr_index] instanceof String){
                this.typewriterAnim(time, type_data[this.arr_index], async () => {
                    await this.timer(this.props.time_before_switch)
                    await this.animationFrame(switchHook, type_data);
                })      
            }else{
                this.animationFrame(switchHook, type_data);
            }
        }

        this.animationFrame(typewriterHook)
    }


    typewriterAnim(time, text, callback) {
        if (((time - prev_time) < this.props.type_speed + (this.props.type_speed_variance * Math.random()))) {
            this.rafId = requestAnimationFrame(time => {
                this.typewriterAnim(time, text, callback)
            })
            return
        }
        prev_time = time
        this.setState({
            content: text.substr(0, this.state.content.length + 1)
        })
        if (this.state.content.length < text.length) {
            this.rafId = requestAnimationFrame(time => {
                this.typewriterAnim(time, text, callback)
            })
        } else {
            return callback()
        }
    }


    backspaceAnim(time, callback) {
        if ((time - prev_time) < this.props.delete_speed) {
            this.rafId = requestAnimationFrame(time => {
                this.backspaceAnim(time, callback)
            })
            return
        }
        prev_time = time
        this.setState({
            content: this.state.content.substr(0, this.state.content.length - 1)
        })
        if (this.state.content.length !== 0) {
            this.rafId = requestAnimationFrame(time => {
                this.backspaceAnim(time, callback)
            })
        } else {
            return callback()
        }
    }


    render() {
        return (
            <>
                {this.state.rendered_component}
                {this.state.content}
            </>
        )
    }
}

Typewriter.defaultProps = {
    type_speed_variance: 100,
    type_speed: 40,
    delete_speed: 32,
    is_repeat: false,
    time_before_switch: 2000,
    content: [],
}

Typewriter.propTypes = {
    type_speed_variance: PropTypes.number,
    type_speed: PropTypes.number,
    delete_speed: PropTypes.number,
    is_repeat: PropTypes.bool,
    time_before_switch: PropTypes.number,
    content: PropTypes.array,
    className: PropTypes.string,
}



class SequentialTypewriter extends React.Component {
    timer = duration => {
        return new Promise(resolve => {
            window.setTimeout(resolve, duration);
        });
    };

    state = {
        components: [],
    }
    index = 0
    isComponentReady = true

    componentDidMount() {
        this.setState(prevState => ({
            components: [...prevState.components, this.props.content[this.index]]
        }))
        this.index++;
    }


    render() {
        return (this.state.components)
    }



}

const H1Typewriter = (props) => {
    return <h1 style={props.style} className={'typewriter h1-typewriter'}><Typewriter {...props} /></h1>
}

const H3Typewriter = (props) => {
    return <h3 className={'typewriter h3-typewriter'}><Typewriter {...props} /></h3>
}

export { H1Typewriter, H3Typewriter, SequentialTypewriter };