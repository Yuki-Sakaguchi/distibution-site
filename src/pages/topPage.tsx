import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopHeader from '../components/topPage/topHeader';
import TopMain from '../components/topPage/topMain';
import ResultPage from './resultPage';
import DownloadPage from './downloadPage';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => createStyles({
  root: {
    height: '100%'
  }
}))

const TopPage: FC = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <TopHeader />
      <Router>
        <Switch>
          <Route exact path="/">
            <TopMain />
          </Route>
          <Route exact path="/search/:keyword">
            <ResultPage />
          </Route>
          <Route exact path="/download/:keyword">
            <DownloadPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default TopPage;