import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import Font from "react-font"

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (inputValue.length <= 3) {
      if (inputValue.length < 3) {
        defaultBooks();
      }
      IsInputEmpty();
    } 
  };

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

  function IsInputEmpty() {
    if (inputValue === "") {
      defaultBooks();
      setShowType('card')
    } else {
      shownewcards()
      console.log("provedeno")

    }
  }

  function shownewcards()
  {
      axios
        .post('http://localhost:5555/books/findbook', { title: inputValue })
        .then((response) => {
          setBooks(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  }

  function defaultBooks()
  {
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
    [];
  }

  return (
    <div>
      {/* Div navbar */}
      <div className='bg-sky-400 w-[100%] h-[50px]'>
        <div className='float-left'>
          <Font family='Helvetica'>
            <h1 className='mt-2 ms-10 text-2xl text-white'>Knihovna</h1>
          </Font>
        </div>

      </div>
      {/* Div obsah */}
      <div>
        <div className='ms-50'>
          <div className='flex'>
            <div className='flex items-center w-[50%]'>
              <h1 className='text-3xl my-8 ms-10'>Seznam knih</h1>
              <Link to='/books/create'>
                <MdOutlineAddBox className='text-yellow-800 text-4xl ms-5' />
              </Link>
            </div>
            <div className='flex justify-end items-end w-[50%]'>
              <div class="input-group input-group-sm mb- flex w-[50%] items-center gap-4">
                <input value={inputValue} onChange={handleInputChange} type="text" class="form-control border-2 border-slate-950 rounded-md px-1 bg-slate-150" placeholder="Harry potter..." aria-label="Harry potter..." aria-describedby="basic-addon2" />
                
              </div>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : showType === 'card' ? (
            <BooksCard books={books} />
          ) : (
            console.log("First")
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
