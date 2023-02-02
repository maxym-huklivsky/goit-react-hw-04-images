import styled from '@emotion/styled';

export const ImageGalleryItemWrap = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  width: 100%;

  @media (min-width: 720px) {
    width: calc(50% - 8px);
  }

  @media (min-width: 1040px) {
    width: calc(25% - 12px);
  }
`;

export const ImageGalleryItemImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  object-position: center;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
