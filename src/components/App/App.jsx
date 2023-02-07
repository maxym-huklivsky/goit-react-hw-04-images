import { AppStyled, FirstMessage } from './App.styled';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import { Button } from 'components/Button';
import { fetchPic } from 'api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { GallerySkeleton } from 'components/GallerySkeleton';

import { useState, useEffect } from 'react';
import { useRef } from 'react';

export const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(0);
  const [status, setStatus] = useState('idle');

  const ulRef = useRef(null);

  useEffect(() => {
    ulRef.current = document.querySelector('#scroll');
  }, []);

  useEffect(() => {
    if (searchInput === '') {
      return;
    }

    ulRef.current.scrollIntoView({ behavior: 'smooth' });

    async function reset() {
      await setPage(1);
      await setPictures([]);
    }

    console.log('search');
    reset();
    requestForPic();
  }, [searchInput]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    console.log('load more');
    requestForPic();
  }, [page]);

  function changePage() {
    setPage(pS => pS + 1);
  }

  function requestForPic() {
    setStatus('pending');

    fetchPic({ query: searchInput, page })
      .then(({ hits, totalHits }) => {
        console.log(hits);
        console.log(totalHits);

        if (hits.length === 0) {
          return Promise.reject(
            new Error('По вашему запросу не найдено картинок')
          );
        }

        setPictures(pS => [...pS, ...hits]);
        setTotalPictures(totalHits);
        setStatus('resolved');

        if (page === 1) {
          toast.success(`По вашему запросу найдено ${totalHits} картинок`);
        }
      })
      .catch(({ message }) => {
        setStatus('rejected');
        toast.error(message);
      });
  }

  function changeSearchInput(e) {
    e.preventDefault();

    const { value } = e.currentTarget.elements.search;

    const inputValue = value.trim();

    if (inputValue) {
      setSearchInput(inputValue);
      return;
    }

    toast.warn('Пожалуйста, введите что-то!!!');
  }

  return (
    <SkeletonTheme baseColor="#2c2c2c" highlightColor="#3d3d3d">
      <AppStyled>
        <Searchbar onSubmit={changeSearchInput} />

        {status === 'idle' && (
          <FirstMessage>Enter key words for image search!</FirstMessage>
        )}

        <ImageGallery pictures={pictures} />

        {status === 'pending' && <GallerySkeleton />}

        {status === 'resolved' && pictures.length < totalPictures && (
          <Button onClick={changePage}>Load more</Button>
        )}

        <ToastContainer autoClose={3000} theme="colored" />
      </AppStyled>
    </SkeletonTheme>
  );
};
