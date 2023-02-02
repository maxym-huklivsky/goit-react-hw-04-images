import { ImageGalleryItemWrap } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import 'react-loading-skeleton/dist/skeleton.css';
import { ImageGalleryWrap } from 'components/ImageGallery/ImageGallery.styled';
import { ImageSkeleton } from './GallerySkeleton.styled';
import { params } from 'api/const';

export const GallerySkeleton = () => {
  let arraySkeleton = [];

  for (let i = 0; i < params.per_page; i++) {
    arraySkeleton.push(
      <ImageGalleryItemWrap key={i}>
        <ImageSkeleton />
      </ImageGalleryItemWrap>
    );
  }

  return <ImageGalleryWrap>{arraySkeleton}</ImageGalleryWrap>;
};
