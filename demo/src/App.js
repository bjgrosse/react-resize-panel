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
        <div className="panel sidebar">left panel</div>
      </ResizePanel>
      <div className="panel content">content</div>
      <ResizePanel direction="w">
        <div className="panel sidebar">right panel</div>
      </ResizePanel> 

    </div>

    <ResizePanel direction="n">
      <div className="footer panel">
        <span >footer</span>
      </div>
    </ResizePanel>
  </div>
);
