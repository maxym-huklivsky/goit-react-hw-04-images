import { ImageGalleryWrap } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures }) => {
  return (
    <ImageGalleryWrap id="scroll">
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smPic={webformatURL}
          lgPic={largeImageURL}
          tags={tags}
        />
      ))}
    </ImageGalleryWrap>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
