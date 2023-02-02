import { Component } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';
import { SlClose } from 'react-icons/sl';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    pic: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
  }

  closeOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  closeOnClickOnOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    const { pic, tags, toggleModal } = this.props;

    return (
      <Overlay onClick={this.closeOnClickOnOverlay}>
        <SlClose
          size="40"
          onClick={toggleModal}
          aria-label="Close big picture"
        />

        <ModalStyled>
          <img src={pic} alt={tags} />
        </ModalStyled>
      </Overlay>
    );
  }
}
