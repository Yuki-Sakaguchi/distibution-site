import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import pencil from '../../assets/images/pencil.jpg';

const useStyle = makeStyles(() => createStyles({
  background: {
    backgroundImage: `url(${pencil})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    height: 'calc(100% - 68px)',
  },
  paper: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '42%',
    width: '45%',
  },
  inputbase: {
    width: '80%'
  }
}));

const TopMain: FC = () => {
  const classes = useStyle();
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = () => {
    history.push('/search/' + keyword);
  };

  return (
    <div className={classes.background}>
      <Paper className={classes.paper} onSubmit={handleSubmit} component="form">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.inputbase}
          placeholder="検索したい単語を入力してください"
          onChange={handleChange}
          value={keyword}
        />
      </Paper>
    </div>
  );
};

export default TopMain;