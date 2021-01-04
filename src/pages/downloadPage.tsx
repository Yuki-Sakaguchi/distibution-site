import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

import firebase, { db } from '../firebase';
import { TileData } from '../types/types';

const useStyle = makeStyles(() => createStyles({
  tile: {
    textAlign: 'center',
  },
  tileImage: {
    margin: '0 auto',
  },
  load: {
    margin: '100px',
    textAlign: 'center'
  }
}));

const DownloadPage: FC = () => {
  const classes = useStyle();
  const { keyword } = useParams<{ keyword: string }>();
  const [items, setItems] = useState<TileData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = async (searchWord: string | undefined) => {
    const tileDataRef = db.collection('tileData');
    const searchedData = tileDataRef.where(firebase.firestore.FieldPath.documentId(), 'in', [searchWord]);
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
      <>
        <div className={classes.load}>読み込み中</div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <div className={classes.load}>見つかりませんでした</div>
    );
  }

  const displayImage = () => {
    return (
      <div>
        {items.map(item => (
          <div className={classes.tile}>
            <img className={classes.tileImage} src={item.image} alt={item.title} width="400" height="400" />
            <h3>{item.title}</h3>
            <Button
              variant="contained"
              href={item.image}
              target="_blank"
            >
              ダウンロード
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {displayImage()}
    </div>
  );
};

export default DownloadPage;