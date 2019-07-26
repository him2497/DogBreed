import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = {
    search: {
        margin: '20px',
    },
    inputInput: {
        width: '100%'
    },
    button: {
        margin: '20px'
    }
}
export default class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            search: null
        }
        this.input = React.createRef()
    }

    onSubmit = (e) => {
        if(localStorage.getItem("https://dog.ceo/api/breeds/list/all")!== null){
            let keys = JSON.parse(localStorage.getItem("https://dog.ceo/api/breeds/list/all"))
            if(keys.includes(this.state.search)){
                let idx = keys.indexOf(this.state.search)
                let breed = keys[idx]
                if(localStorage.getItem(`https://dog.ceo/api/breed/${breed}/list`)){
                    let subBreed = JSON.parse(localStorage.getItem(`https://dog.ceo/api/breed/${breed}/list`))
                    this.subBreedUpdate(subBreed, breed)
                }else{
                    fetch(`https://dog.ceo/api/breed/${breed}/list`)
                    .then(res => res.json())
                    .then(breeds => {
                        let subBreed = breeds.message
                        this.subBreedUpdate(subBreed, breed)
                        localStorage.setItem(`https://dog.ceo/api/breed/${breed}/list`, JSON.stringify(subBreed))
                    })
                }

            }else{
                alert("No Breed Found")
            }
        }
        this.input.current.value = ""
    }

    subBreedUpdate = (subBreed, breed) => {
        if(subBreed.length === 0){
            this.props.onUpdate([breed])
        }else{
            let newSubBreed = subBreed.map((value) => value + " " + breed)
            this.props.onUpdate(newSubBreed)
        }
    }


    render(){
        return (
            <div>
                <div style={styles.search}>
                    <Input
                        type="text"
                        inputRef = {this.input}
                        style={styles.inputInput} 
                        onChange={(e) => this.setState({search: e.target.value})} 
                        placeholder="Search..." 
                    />
    
                </div>
                <Button style={styles.button} variant="contained" color="primary" onClick={this.onSubmit}>
                    <p>Search</p>
                    <SearchIcon style={{paddingLeft: '10px'}} />
                </Button>
            </div>
        )
    }
}