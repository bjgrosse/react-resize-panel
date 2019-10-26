import React from 'react';
import { DraggableCore } from 'react-draggable';
import debounce from 'lodash.debounce';
import $ from 'cash-dom';

import './ResizePanel.css';

const ContainerStyleHorizontal = {
    display: 'flex',
    alignItems: 'stretch',
    flexFlow: 'row nowrap'
}

const ContainerStyleVertical = {
    display: 'flex',
    alignItems: 'stretch',
    flexFlow: 'column nowrap'
}

const HandleDirectionClasses = {
    w: "ResizeHandlePositionW", e: "ResizeHandlePositionE", n: "ResizeHandlePositionN", s: "ResizeHandlePositionS"
}
const ResizeBarDirectionClasses = {
    w: "ResizeBarW", e: "ResizeBarE", n: "ResizeBarN", s: "ResizeBarS"
}

class ResizePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { size: 0 }

        this.validateSize = debounce(this.validateSize, 100).bind(this);
    }

    isHorizontal = () => this.props.direction === "w" || this.props.direction === "e";

    componentDidMount() {
        const { content } = this.refs;
        const actualContent = content.children[0];

        // Initialize the size value based on the content's current size
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
                size: isHorizontal ? actualContent.clientWidth - overflow : actualContent.clientHeight - overflow,
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

        // modify the size based on the drag delta
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

        let handleClasses = this.props.handleClass;

        // If we don't have custom handle classes specified, then use our default ones
        if (!handleClasses) {
            handleClasses = "ResizeHandle " + HandleDirectionClasses[direction];
            handleClasses += (isHorizontal ? " ResizeHandleHorizontal " : " ResizeHandleVertical ");
        }

        let resizeBarClasses = this.props.borderClass;

        // If we don't have custom resize bar classes specified, then use our default ones
        if (!resizeBarClasses) {
            "ResizeBar " + ResizeBarDirectionClasses[direction];
            resizeBarClasses += (isHorizontal ? " ResizeBarHorizontal " : " ResizeBarVertical ");
        }

        let contentStyle = isHorizontal ? { width: this.state.size + 'px' } : { height: this.state.size + 'px' };
        let contentClassName = "ResizeContent " + (isHorizontal ? "ResizeContentHorizontal" : "ResizeContentVertical");

        let content = [
            <div key="content" ref="content" className={contentClassName} style={contentStyle}>
                {React.Children.only(this.props.children)}
            </div>
        ];

        let handle =
            <DraggableCore key="handle" {...dragHandlers}>
                <div className={resizeBarClasses}>
                    <div className={handleClasses}><span /></div>
                </div>
            </DraggableCore>

        // Insert the handle at the beginning of the content if our directio is west or north
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