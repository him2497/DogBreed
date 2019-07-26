import React from 'react'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


export default function CustomButton(props) {
        return (
            <Button variant="contained" color="secondary">
                {
                    props.link ? (<Link
                                    style={{textDecoration: "none", color: "white", wordBreak: 'break-word'}} 
                                    to={`/images/${props.label}`}>
                                    <p>{props.label}</p>
                    </Link>) : <p>{props.label}</p>
                }
                {/* <Link style={{textDecoration: "none", color: "white"}} to={`/images/${props.label}`}>{props.label}</Link> */}
            </Button>
        );
}
