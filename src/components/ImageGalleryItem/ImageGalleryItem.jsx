import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ gallery }) {
  const { ImageGalleryItem__image } = css;
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = e => {
    console.log(e);
    if (e.code === 'Escape' || e.currentTarget === e.target)
      setShowModal(false);
  };

  const { webformatURL, tags, largeImageURL } = gallery;

  return (
    <>
      <img
        src={webformatURL}
        alt={tags}
        className={ImageGalleryItem__image}
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal onCloseModal={onCloseModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  gallery: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};
