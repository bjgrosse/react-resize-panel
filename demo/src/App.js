import React from "react";
//import ResizePanel from "react-resize-panel";
import ResizePanel from "../../src/ResizePanel";
import './App.css';

export default () => (
  <div className="container">
    <ResizePanel direction="s">
      <div className="header  panel">
        <span>header</span>
      </div>
    </ResizePanel>
    <div className="body">

      <ResizePanel direction="e">
        <div className="panel sidebar withMargin">left panel<br /> with margin</div>
      </ResizePanel>
      <div className="panel content">content</div>
      <ResizePanel direction="w" handleClass="customHandle" borderClass="customResizeBorder">
        <div className="panel sidebar">right panel<br /> with custom handle</div>
      </ResizePanel> 

    </div>

    <ResizePanel direction="n">
      <div className="footer panel">
        <span >footer</span>
      </div>
    </ResizePanel>
  </div>
);
