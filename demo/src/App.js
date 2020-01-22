import React from "react";
//import ResizePanel from "react-resize-panel";
import ResizePanel from "../../src/ResizePanel";
import style from './App.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(style);

export default () => (
  <div className={cx('container')}>
    <ResizePanel direction="s">
      <div className={cx('header', 'panel')}>
        <span>header</span>
      </div>
    </ResizePanel>
    <div className={cx('body')}>

      <ResizePanel direction="e" style={{ flexGrow: '1' }} >
        <div className={cx('sidebar', 'withMargin', 'panel')}>left panel<br /> with margin <br />default 50% of content area using flex-grow</div>
      </ResizePanel>
      <div className={cx('content', 'panel')}>content</div>
      <ResizePanel direction="w" style={{ width: '400px' }} handleClass={style.customHandle} borderClass={style.customResizeBorder}>
        <div className={cx('sidebar', 'panel')}>right panel<br /> with custom handle<br /> default 400px</div>
      </ResizePanel>

    </div>

    <ResizePanel direction="n" style={{height: '200px'}}>
      <div className={cx('footer', 'panel')}>
        <div className={cx('footerArea')}>
          <div className={cx('footerAreaContent')}>
            <span>footer area, min height: 100px</span>
          </div>
        </div>
        <div className={cx('footerBottomBar')}>
          bottom bar
        </div>
      </div>
    </ResizePanel>
  </div>
);
