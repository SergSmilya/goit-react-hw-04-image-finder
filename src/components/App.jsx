import { useState, useEffect } from 'react';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GalleryApi from '../Utils/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const requestApi = new GalleryApi();

const notify = () => {
  toast('Not found', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default function App() {
  const [value, setValue] = useState('');
  const [visibleSpinerBool, setVisibleSpinerBool] = useState(false);
  const [gallerys, setGallerys] = useState([]);
  const [totalHits, setTotalHits] = useState(0);

  const handleWriteValueInStateOfSubmit = valueString => {
    setValue(valueString);
    requestApi.resetPage();
  };

  useEffect(() => {
    if (value === '') return;

    setVisibleSpinerBool(true);
    requestApi.writeValue = value;

    requestApi
      .search()
      .then(({ data: { totalHits, hits } }) => {
        if (totalHits > 0) {
          // hits це масив
          // console.log(totalHits, total);
          setGallerys(hits);
          setTotalHits(totalHits);
        } else {
          notify();
        }
      })
      .catch(console.log)
      .finally(setVisibleSpinerBool(false));
  }, [value]);

  const handleLoadMore = () => {
    setVisibleSpinerBool(true);

    requestApi
      .search()
      .then(({ data: { hits } }) => {
        setGallerys(prevGal => [...prevGal, ...hits]);
      })
      .catch(console.log)
      .finally(setVisibleSpinerBool(false));
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmited={handleWriteValueInStateOfSubmit} />

      {visibleSpinerBool ? (
        <Loader visibleSpinerBool={visibleSpinerBool} />
      ) : (
        <ImageGallery gallerys={gallerys} />
      )}

      {gallerys.length !== totalHits && (
        <Button
          handleLoadMore={handleLoadMore}
          visibleSpinerBool={visibleSpinerBool}
        >
          Load More
        </Button>
      )}
      <ToastContainer />
    </div>
  );
}
