import React from "react";
//import ResizePanel from "react-resize-panel";
import ResizePanel from "../../src/ResizePanel";
import style from './App.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(style);

export default () => (
  <div className={cx('container')}>
    <ResizePanel direction="s">
      <div className={cx('header','panel')}>
        <span>header</span>
      </div>
    </ResizePanel>
    <div className={cx('body')}>

      <ResizePanel direction="e">
        <div className={cx('sidebar','withMargin','panel')}>left panel<br /> with margin</div>
      </ResizePanel>
      <div className={cx('content','panel')}>content</div>
      <ResizePanel direction="w" handleClass={style.customHandle} borderClass={style.customResizeBorder}>
        <div className={cx('sidebar','panel')}>right panel<br /> with custom handle</div>
      </ResizePanel>

    </div>

    <ResizePanel direction="n">
      <div className={cx('footer','panel')}>
        <span >footer</span>
      </div>
    </ResizePanel>
  </div>
);
