import React, { FC, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { db } from '../../firebase';
import { TileData } from '../../types/types';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '80%',
    textAlign: 'center',
    marginTop: '2%',
  },
  tileImage: {
    height: '218px',
    width: '218px',
  },
  load: {
    margin: '100px',
    textAlign: 'center'
  }
}));
 
const ImageItemList: FC = () => {
  const classes = useStyle();
  const [items, setItems] = useState<TileData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { keyword } = useParams<{ keyword: string }>();
  const history = useHistory();

  const getData = async (searchWord: string | undefined) => {
    const tileDataRef = db.collection('tileData');
    const searchedData = tileDataRef.where('keyword', 'array-contains', searchWord);
    const snapshot = await searchedData.get();
    const data = snapshot.docs.map(doc => doc.data());
    setItems(data as TileData[]);
    setIsLoaded(true);
  };

  useEffect(() => {
    getData(keyword);
  }, []);

  if (!isLoaded) {
    return (
      <div className={classes.load}>読み込み中</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={classes.load}>見つかりませんでした</div>
    );
  }

  return (
    <div className={classes.root}>
      {items.map((item) => (
        <div key={item.image}>
          <Button onClick={() => history.push('/download/' + item.title)}>
            <img className={classes.tileImage} src={item.image} alt={item.title} /> 
          </Button>
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ImageItemList;