import React, { Component } from 'react'
import Button from './Button';
import SearchBar from './SearchBar';

const styles = {
    wrapper : {
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: '25% 25% 25% 25%',
        justifyContent: 'center',
        padding: '25px'
    },
    box : {
        borderRadius: '5px',
        padding: '20px'
    }
}


export default class Home extends Component {
    constructor(){
        super()
        this.state = {
            breeds: []
        }
    }

    componentDidMount(){
        if(localStorage.getItem("https://dog.ceo/api/breeds/list/all") !== null){
            let keys = JSON.parse(localStorage.getItem("https://dog.ceo/api/breeds/list/all"))
            keys = keys.slice(0, 12)
            this.setState({breeds: keys})
        }else{
            fetch("https://dog.ceo/api/breeds/list/all")
            .then(res => res.json())
            .then(breeds => {
                let keys = Object.keys(breeds.message)
                localStorage.setItem("https://dog.ceo/api/breeds/list/all", JSON.stringify(keys))
                keys = keys.slice(0, 12)
                this.setState({breeds: keys})
            })
        }
    }

    onSearch = (breeds) => {
        this.setState({ breeds })
    }

    render() {
        let breeds = this.state.breeds
        return (
            <div>
                <SearchBar onUpdate={this.onSearch}/>
                <div style={styles.wrapper}>
                    {breeds.map((value, i) => <Button key={i} style={styles.box} link={true} label={value}/>)}
                </div>
            </div>
        )
    }
}
