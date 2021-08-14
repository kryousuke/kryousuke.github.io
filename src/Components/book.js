import React from "react";

function range(start, end, reverse=false) {
    if(reverse) {
        return Array(end - start + 1).fill().map((_, idx) => end - idx)
    }
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export class Book extends React.Component {
    constructor(props) {
        super(props)

        this.page_num = props.children.length;
        this.page_num += (this.page_num % 2);
        this.paper_num = this.page_num / 2;
        this.zIndexes = range(0, this.props.children.length - 1, true);
        this.flipped_zIndexes = range(0, this.props.children.length - 1, false)

        console.log(this.zIndexes, this.flipped_zIndexes)
        this.state = {
            flipped: Array(this.paper_num).fill(false),
            next: 1,
            current: 0,
            prev: -1
        }
    }

    goToNextPage() {
        let flipped = this.state.flipped;
        let next = this.state.next + 1;
        let current = this.state.next;
        let prev = this.state.current;

        if (current > this.paper_num) {
            next = this.state.next;
            prev = this.state.prev;
            current = this.state.current;
        }

        flipped[this.state.current] = true;
        this.setState({
            flipped: flipped,
            next: next,
            current: current,
            prev: prev
        })
    }

    goToPrevPage() {
        let flipped = this.state.flipped;
        let next = this.state.current;
        let current = this.state.prev;
        let prev = this.state.prev - 1;

        if(current < 0) {
            next = this.state.next;
            current = this.state.current;
            prev = this.state.prev;
        }

        flipped[current] = false;
        this.setState({
            flipped: flipped,
            next: next,
            current: current,
            prev: prev
        })
    }

    render() {
        let pages = [];

        for (let n=0;n < this.page_num; n+=2) {
            let c_name = "page";
    
            let front_style = {
                zIndex: this.zIndexes[n]
            }
            
            let back_style = {
                zIndex: this.zIndexes[n + 1]
            }
            if(this.state.flipped[n / 2]) {
                c_name = "page flipped";
                front_style.zIndex = this.flipped_zIndexes[n];
                back_style.zIndex = this.flipped_zIndexes[n + 1];
            }
    
            pages.push(
                <div className={c_name}>
                    <div className="front" style={front_style}>{this.props.children[n]}</div>
                    
                    <div className="back" style={back_style}>{this.props.children[n + 1]}</div>
                </div>
            )
        }

        return (
            <div className="book">
                <button className="btn-prev"  onClick={() => this.goToPrevPage()}>prev</button>
                {pages}
                <button className="btn-next" onClick={() => this.goToNextPage()}>next</button>
            </div>
        )
    }
}

    
