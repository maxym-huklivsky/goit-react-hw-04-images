import { Component } from 'react';
import {
  ImageGalleryItemImage,
  ImageGalleryItemWrap,
} from './ImageGalleryItem.styled';
import { Modal } from '../Modal';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { smPic, lgPic, tags } = this.props;

    return (
      <>
        <ImageGalleryItemWrap onClick={this.toggleModal}>
          <ImageGalleryItemImage src={smPic} alt={tags} />
        </ImageGalleryItemWrap>

        {this.state.showModal &&
          createPortal(
            <Modal toggleModal={this.toggleModal} pic={lgPic} tags={tags} />,
            modalRoot
          )}
      </>
    );
  }
}
