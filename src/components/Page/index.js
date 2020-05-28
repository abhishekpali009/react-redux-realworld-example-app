import Banner from './Banner';
import PageView from './PageView';
import React from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  PAGE_LOADED,
  PAGE_UNLOADED,
  APPLY_TAG_FILTER,
  SET_PAGE
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.page,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, page, payload) =>
    dispatch({ type: PAGE_LOADED, tab, pager, page, payload }),
  onUnload: () =>
    dispatch({  type: PAGE_UNLOADED }),
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

class Page extends React.Component {

  componentWillMount() {
    const tab = 'all';
    const pageNumber = Number(window.location.pathname.slice(1)) - 1;
    this.props.onLoad(tab, agent.Articles.all, pageNumber, Promise.all([agent.Tags.getAll(), agent.Articles.all(pageNumber)]) );

    window.onpopstate = () => {
      const newPage = Number(window.location.pathname.slice(1)) - 1;
      this.props.onSetPage(newPage, agent.Articles.all(newPage));
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <PageView />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} 
                  onSetPage={this.props.onSetPage}/>

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);