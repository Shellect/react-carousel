import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prev: 1,
            active: 2,
            next: 3
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

    componentDidMount() {
        this.timerId = setInterval(
            () => this.next(),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    next() {
        let { prev, active, next } = this.state;
        prev = active;
        active = next;
        next = (next + 1) % this.len;
        this.setState({ prev, active, next });
    }

    prev() {
        let { prev, active, next } = this.state;
        next = active;
        active = prev;
        prev = (prev || this.len) - 1;
        this.setState({ prev, active, next });
    }

    render() {
        const { prev, active, next } = this.state;
        let images = this.images.map(function (el, i) {
            let className = "slide";
            switch (true) {
                case (i === prev):
                    className += " prev";
                    break;
                case (i === active):
                    className += " active";
                    break;
                case (i === next):
                    className += " next";
                    break;
            }
            return <img key={i} className={className} src={el} />
        });

        return (
            <div className="carousel">
                <img onClick={() => this.prev()} className="arrow arrow-back" src="./media/arrow_back.png" />
                {images}
                <img onClick={() => this.next()} className="arrow arrow-next" src="./media/arrow_next.png" />
            </div>
        );
    }
}