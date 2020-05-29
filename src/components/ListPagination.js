import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';
import { Link } from 'react-router-dom';
import { store } from '../store';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

const ListPagination = props => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(page));
    }else {
      props.onSetPage(page, agent.Articles.all(page))
    }
  };

  return (
    <nav>
      <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            let tabName = store.getState().articleList.tab;
            let thisPage = store.getState().articleList.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              if(v !== 0 && tabName !== null)
                {
                  setPage(v);
                }
              if(tabName === null)
                {
                  setPage(v)
                }
            };
            if (v === 0 && tabName !== null)
              {
                return (
                  <li
                    className={window.location.pathname === '/' ? 'page-item active' : 'page-item'}
                    onClick={onClick}
                    key={v.toString()}>
                    
                    <Link to='/'><a className="page-link" href="">{v + 1}</a></Link>
                  </li>
                )
              }
            if (v !==0 && tabName !== null)
              {
                return (
                  <li
                    className={ isCurrent || window.location.pathname === `/${v + 1}` ? 'page-item active' : 'page-item' }
                    onClick={onClick}
                    key={v.toString()}>
    
                    <Link to={`/${v + 1}`}><a className="page-link" href="">{v + 1}</a></Link>
                  </li>
                );
              }
            if ((thisPage === 0 && v === 0) && tabName === null)
              {
                return (
                  <li
                    className={ isCurrent || window.location.pathname === '/1' ? 'page-item active' : 'page-item' }
                    onClick={onClick}
                    key={v.toString()}>
    
                    <Link to="/1"><a className="page-link" href="">1</a></Link>
                  </li>
                );
              }
            if ((thisPage === 0 && v !== 0) && tabName === null)
              {
                return (
                  <li
                    className={ isCurrent || window.location.pathname === `/${v + 1}` ? 'page-item active' : 'page-item' }
                    onClick={onClick}
                    key={v.toString()}>
    
                    <Link to={`/${v + 1}`}><a className="page-link" href="">{v + 1}</a></Link>
                  </li>
                );
              }
            if ((thisPage !== 0 && (v !== 0 || v === 0)) && tabName === null)
              {
                return (
                  <li
                    className={ isCurrent || window.location.pathname === `/${v + 1}` ? 'page-item active' : 'page-item' }
                    onClick={onClick}
                    key={v.toString()}>
    
                    <Link to={`/${v + 1}`}><a className="page-link" href="">{v + 1}</a></Link>
                  </li>
                );
              }
          })
        }

      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
