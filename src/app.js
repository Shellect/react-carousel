import React from "react";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: 0
        }
        this.images = [
            "./media/1.jpg",
            "./media/2.jpg",
            "./media/3.jpg",
            "./media/4.jpg",
            "./media/5.jpg",
        ];
        this.len = this.images.length;
    }

    componentDidMount(){
        this.timerId = setInterval(
            () => this.prev(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    next(){
        let {active} = this.state;
        active = ++active % this.len;
        this.setState({active});
    }

    prev(){
        let {active} = this.state;
        active = (active || this.len) - 1;
        this.setState({active});
    }

    render() {
        const {active} = this.state;
        let images = this.images.map(function (el, i){
            return <img
                key={i}
                className={active === i ? "active" : undefined}
                src={el} 
            />
        });

        return (
            <div className="carousel">
                {images}
            </div>
        );
    }
}