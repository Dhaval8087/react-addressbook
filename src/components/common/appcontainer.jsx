import './appcontainer.scss';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import ErrorBoundary from './errorboundary';
import Header from './header';

export default class AppContainer extends Component {
  
    render() {
        return (
            <ErrorBoundary>
                <Header />
                <div className="navchild">
                    {this.props.isload ? <Loader
                        type="Watch"
                        color="#00BFFF"
                        height="100"
                        width="100"
                    /> : this.props.children}

                </div>
            </ErrorBoundary>
        )
    }
}
AppContainer.contextTypes = {
    router: PropTypes.object.isRequired
  };
  
