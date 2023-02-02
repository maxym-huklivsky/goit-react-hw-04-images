import styled from '@emotion/styled';

export const ImageGalleryWrap = styled.ul`
  display: flex;
  width: calc(100vw - 48px);
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;

  @media (max-width: 720px) {
    max-width: 480px;
  }
`;
