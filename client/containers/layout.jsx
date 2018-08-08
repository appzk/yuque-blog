import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as components from '../components/index.js';

import HScroll from '../widgets/hscroll/index.jsx';
import getRoute from '../routes/router.js';
import Header from './header/header.jsx';

class Layout extends Component {
  componentDidUpdate() {

  }

  componentDidMount() {

  }

  renderRouteComponent() {
    const { url } = this.props;
    const { componentName, mobileComponentName, props, routeParams } = getRoute(url);
    let Comp = components[componentName];
    if (window.isMobile && mobileComponentName) {
      Comp = components[mobileComponentName];
    }
    return (
      <Comp
        {...props}
        {...routeParams}
        ui={this.props.ui}
        url={this.props.url}
      />
    );
  }

  render() {
    const { url } = this.props;
    const { props = {} } = getRoute(url);
    const { hideHeader, hideCard } = props;
    // 博客详情页
    if (hideCard) {
      return (<div className="wrapper full-layout-wrapper">
        {
          this.renderRouteComponent()
        }
      </div>);
    }
    // 主页
    if (hideHeader && !window.isMobile) {
      return (<HScroll
        className="wrapper horizontal-wrapper home-wrapper"
      >
        {this.renderRouteComponent()}
      </HScroll>);
    }
    // 博客列表、关于我们、招聘
    return (
      <div className="wrapper horizontal-wrapper">
        <Header
          ui={this.props.ui}
          url={this.props.url}
        />
        {this.renderRouteComponent()}
      </div>
    );
  }
}

export default connect(state => ({
  ui: state.ui,
  url: state.url,
  post: state.post,
}))(Layout);