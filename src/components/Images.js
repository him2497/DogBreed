import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import CustomButton from './Button';

const styles = {
    row: {
        'display': 'flex',
        'flexDirection': 'row',
        'flexWrap': 'wrap',
        'width': '100%',
        'justifyContent': 'center',
        'alignItems': 'center',
    },
    column: {
        'display': 'flex',
        'flexDirection': 'column',
        'flexBasis': '100%',
        'flex': '0 0 30%',
        'justifyContent': 'center',
        'alignItems': 'center',
        'margin' : '10px'
    },
    minColumn: {
        'display': 'flex',
        'flexDirection': 'column',
        'flexBasis': '100%',
        'flex': '0 0 25%',
        'justifyContent': 'center',
        'alignItems': 'center',
        'margin' : '10px'
    }
}

export default class Images extends Component {
    constructor(){
        super()
        this.state = {
            imageUrl: []
        }
    }

    componentDidMount(){
        let breed = this.props.match.params.breed.split(" ")
        if(breed.length === 2){
            if(localStorage.getItem(`https://dog.ceo/api/breed/${breed[1]}/${breed[0]}/images`) !== null){
                let imageUrl = localStorage.getItem(`https://dog.ceo/api/breed/${breed[1]}/${breed[0]}/images`)
                imageUrl = JSON.parse(imageUrl)
                this.setState({ imageUrl })
            }else{
                fetch(`https://dog.ceo/api/breed/${breed[1]}/${breed[0]}/images`)
                .then(res => res.json())
                .then(images => {
                    this.setState({imageUrl: images.message})
                    localStorage.setItem(`https://dog.ceo/api/breed/${breed[1]}/${breed[0]}/images`, JSON.stringify(images.message))
                })
            }
        }else if(breed.length === 1){
            if(localStorage.getItem(`https://dog.ceo/api/breed/${breed[0]}/images`) !== null){
                let imageUrl = localStorage.getItem(`https://dog.ceo/api/breed/${breed[0]}/images`)
                imageUrl = JSON.parse(imageUrl)
                this.setState({ imageUrl })
            }else{
                fetch(`https://dog.ceo/api/breed/${breed[0]}/images`)
                .then(res => res.json())
                .then(images => {
                    this.setState({imageUrl: images.message})
                    localStorage.setItem(`https://dog.ceo/api/breed/${breed[0]}/images`, JSON.stringify(images.message))
                })
            }
        }
    }

    renderButton = () => {
        let breed = this.props.match.params.breed
        return  <CustomButton label={breed} link={false}/>
    }

    render() {
        let breed = this.props.match.params.breed
        return (
            <div>
                <Link to="/">Home</Link>
                <div style={{margin: "10px"}}>
                    {this.renderButton()}
                </div>
                <div style={styles.row}>
                    {this.state.imageUrl.map((val, i) => 
                        <div key={val} style={window.innerWidth < 599 ? styles.minColumn : styles.column}>
                            <img style={{width: '100%'}} src={val} alt={breed + " " + i}/> 
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
