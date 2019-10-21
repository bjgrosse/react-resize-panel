import React from 'react';
import { DraggableCore } from 'react-draggable';
import debounce from 'lodash.debounce';
import $ from 'cash-dom';

import './ResizePanel.css';

const ContainerStyleHorizontal = {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap'
}

const ContainerStyleVertical = {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column nowrap'

}

const HandleDirectionStyles = {
    w: "ResizeHandlePositionW", e: "ResizeHandlePositionE", n: "ResizeHandlePositionN", s: "ResizeHandlePositionS"
}

class ResizePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { size: 0 }

        this.validateSize = debounce(this.validateSize, 100).bind(this);
    }

    isHorizontal = () => this.props.direction === "w" || this.props.direction === "e";

    componentDidMount() {

        const { content, wrapper } = this.refs;
        const actualContent = content.children[0];
        this.setState({ size: this.isHorizontal() ? $(actualContent).outerWidth(true) : $(actualContent).outerHeight(true) });
    }

    validateSize() {
        const isHorizontal = this.isHorizontal();
        const { content, wrapper } = this.refs;
        const actualContent = content.children[0];
        let containerParent = wrapper.parentElement;

        // If our resizing has left the parent container's content overflowing
        // then we need to shrink back down to fit

        let overflow = isHorizontal ? containerParent.scrollWidth - containerParent.clientWidth : containerParent.scrollHeight - containerParent.clientHeight;

        if (overflow) {
            this.setState({
                ...this.state,
                size: isHorizontal ? actualContent.scrollWidth - overflow : actualContent.scrollHeight - overflow,
            });
        }

        // 
        // Or if our size doesn't equal the actual content size, then we
        // must have pushed past the min size of the content, so resize back
        let minSize = isHorizontal ? $(actualContent).outerWidth(true) : $(actualContent).outerHeight(true);
        if (this.state.size !== minSize) {
            this.setState({
                ...this.state,
                size: minSize,
            });
        }
    }

    handleDrag = (e, ui) => {
        const { direction } = this.props;
        const factor = direction === "e" || direction === "s" ? -1 : 1;

        const { content } = this.refs;
        const minWidth = (this.isHorizontal() ? content.children[0].scrollWidth : content.children[0].scrollheight) || 0;
        let delta = this.isHorizontal() ? ui.deltaX : ui.deltaY
        this.setState((s, p) => ({ size: Math.max(10, s.size - (delta * factor)) }))
    }

    handleDragEnd = (e, ui) => {
        this.validateSize();
    }

    render() {

        const dragHandlers = { onDrag: this.handleDrag, onStop: this.handleDragEnd };
        const { direction } = this.props;
        const isHorizontal = this.isHorizontal();

        let containerStyle = isHorizontal ? ContainerStyleHorizontal : ContainerStyleVertical;

        let handleClasses = "ResizeHandle " + HandleDirectionStyles[direction];
        handleClasses += (isHorizontal ? " ResizeHandleHorizontal " : " ResizeHandleVertical ");


        let contentStyle = isHorizontal ? { width: this.state.size + 'px' } : { height: this.state.size + 'px' };
        let contentClassName = "ResizeContent " + (isHorizontal ? "ResizeContentHorizontal" : "ResizeContentVertical");

        let content = [
            <div key="content" ref="content" className={contentClassName} style={contentStyle}>
                    {React.Children.only(this.props.children)}
            </div>
        ];

        let handle =
            <DraggableCore key="handle" {...dragHandlers}>
                <div className={handleClasses}><span /></div>
            </DraggableCore>

        if (direction === 'w' || direction === 'n') {
            content.unshift(handle)
        } else {
            content.push(handle);
        }

        return (
            <div ref="wrapper" style={containerStyle} className="ResizeContainer">
                {content}
            </div>
        );
    }
}

export default ResizePanel;