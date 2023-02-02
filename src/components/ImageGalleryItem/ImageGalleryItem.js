import {
  ImageGalleryItemImage,
  ImageGalleryItemWrap,
} from './ImageGalleryItem.styled';
import { Modal } from '../Modal';
import { createPortal } from 'react-dom';

import { useState } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const ImageGalleryItem = ({ smPic, lgPic, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(pS => !pS);
  };

  return (
    <>
      <ImageGalleryItemWrap onClick={toggleModal}>
        <ImageGalleryItemImage src={smPic} alt={tags} />
      </ImageGalleryItemWrap>

      {showModal &&
        createPortal(
          <Modal toggleModal={toggleModal} pic={lgPic} tags={tags} />,
          modalRoot
        )}
    </>
  );
};
