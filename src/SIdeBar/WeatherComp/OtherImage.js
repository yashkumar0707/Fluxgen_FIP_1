import React from 'react'
import './Weather.css'
import {ReactComponent as Sunny} from './sunny-color.svg';
import {ReactComponent as Rain} from './rain.svg'
import {SvgIcon, Divider} from '@material-ui/core';

class Other extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className = "Other_Weather">
                <p className = "sans-serif day_small">
                    {this.props.day}
                </p>
                <SvgIcon className = "Main_Weather_Icon">
                    <Rain />
                </SvgIcon>
            </div>
        )
    }
}

export default Other;