import { ModalStyled, Overlay } from './Modal.styled';
import { SlClose } from 'react-icons/sl';
import PropTypes from 'prop-types';

import { useEffect } from 'react';

export const Modal = ({ toggleModal, pic, tags }) => {
  const closeOnClickOnOverlay = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  useEffect(() => {
    function closeOnEsc(e) {
      if (e.code === 'Escape') {
        toggleModal();
      }
    }

    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [toggleModal]);

  return (
    <Overlay onClick={closeOnClickOnOverlay}>
      <SlClose size="40" onClick={toggleModal} aria-label="Close big picture" />

      <ModalStyled>
        <img src={pic} alt={tags} />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  pic: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
