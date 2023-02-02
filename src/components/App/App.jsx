import { Component } from 'react';
import { AppStyled, FirstMessage } from './App.styled';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import { Button } from 'components/Button';
import { fetchPic } from 'api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { GallerySkeleton } from 'components/GallerySkeleton';

const root = document.querySelector('#root');

export class App extends Component {
  state = {
    searchInput: '',
    pictures: [],
    page: 1,
    totalPictures: 0,
    status: 'idle',
  };

  async componentDidUpdate(_, pS) {
    // Пошук
    if (pS.searchInput !== this.state.searchInput) {
      console.log('search');
      await this.setState({ page: 1, pictures: [] });
      this.requestForPic();
      root.scrollIntoView({ behavior: 'smooth' });
    }

    // Пагінація
    if (pS.page !== this.state.page && this.state.page > 1) {
      console.log('load more');
      this.requestForPic();
    }
  }

  changePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  requestForPic = () => {
    const { page, searchInput } = this.state;
    this.setState({ status: 'pending' });

    fetchPic({ query: searchInput, page })
      .then(({ hits, totalHits }) => {
        console.log(hits);
        console.log(totalHits);

        if (hits.length === 0) {
          return Promise.reject(
            new Error('По вашему запросу не найдено картинок')
          );
        }

        this.setState(({ pictures }) => ({
          status: 'resolved',
          pictures: [...pictures, ...hits],
          totalPictures: totalHits,
        }));

        if (page === 1) {
          toast.success(`По вашему запросу найдено ${totalHits} картинок`);
        }
      })
      .catch(({ message }) => {
        this.setState({ status: 'rejected' });
        toast.error(message);
      });
  };

  changeSearchInput = e => {
    e.preventDefault();

    const { value } = e.currentTarget.elements.search;

    const inputValue = value.trim();

    if (inputValue) {
      this.setState({ searchInput: inputValue });
      return;
    }

    toast.warn('Пожалуйста, введите что-то!!!');
  };

  render() {
    const { pictures, totalPictures, status } = this.state;

    return (
      <SkeletonTheme baseColor="#2c2c2c" highlightColor="#3d3d3d">
        <AppStyled>
          <Searchbar onSubmit={this.changeSearchInput} />

          {status === 'idle' && (
            <FirstMessage>Enter key words for image search!</FirstMessage>
          )}

          <ImageGallery pictures={pictures} />

          {status === 'pending' && <GallerySkeleton />}

          {status === 'resolved' && pictures.length < totalPictures && (
            <Button onClick={this.changePage}>Load more</Button>
          )}

          <ToastContainer autoClose={3000} theme="colored" />
        </AppStyled>
      </SkeletonTheme>
    );
  }
}
