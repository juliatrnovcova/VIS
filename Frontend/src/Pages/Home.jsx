import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import Font from "react-font"

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Div navbar */}
      <div className='bg-sky-400 w-[100%] h-[50px]'>
        <div className='float-left'>
          <Font family='Helvetica'>
            <h1 className='mt-2 ms-10 text-2xl text-white'>Knihovna</h1>
          </Font>

        </div>

        <div className='float-right flex justify-center items-center gap-x-4'>
          <button
            className='mt-2 ms-10 bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-white'
            onClick={() => setShowType('table')}
          >
            Karta
          </button>
          <button
            className='mt-2 ms-10 bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg me-20 text-white'
            onClick={() => setShowType('card')}
          >
            Tabulka
          </button>
        </div>

      </div>
      {/* Div obsah */}
      <div>
        <div className='ms-50'>
          <div className='flex items-center'>
            <h1 className='text-3xl my-8 ms-10'>Seznam knih</h1>
            <Link to='/books/create'>
              <MdOutlineAddBox className='text-yellow-800 text-4xl ms-5' />
            </Link>
          </div>
          {loading ? (
            <Spinner />
          ) : showType === 'card' ? (
            <BooksTable books={books} />
          ) : (
            <BooksCard books={books} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
