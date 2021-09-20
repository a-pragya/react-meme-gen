import React from 'react'

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
            topText :"",
            bottomText:"",
            randomImg : "https://i.imgflip.com/30b1gx.jpg",
            allMemeImgs : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({ allMemeImgs :memes})
            })
    }

    handleChange(event){
        console.log("change")
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        console.log("random img;", randMemeImg)
        this.setState({ randomImg: randMemeImg})

    }

    render(){
        return(
            <div>
                <h1>MemeGen</h1>
                <form>
                    <input 
                        type="text" 
                        name="topText" 
                        value={this.state.topText}
                        placeholder="top text"
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText}
                        placeholder="Bottom text"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSubmit}>Gen</button>
                </form>
                <div>
                    <img src={this.state.randomImg} alt="prob" />
                    <h2>{this.state.topText}</h2>
                    <h2>{this.state.bottomText}</h2>
                </div>
            </div>
            

        )
    }
}

export default MemeGenerator