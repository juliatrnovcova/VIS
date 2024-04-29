import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { BiAward } from "react-icons/bi";

//vyskakovací detail
const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}
        className='w-[800px] max-w-full h-[600px] bg-white rounded-xl p-4 flex flex-col relative'>
        {/* Navbar */}
        <div className='w-[800px] max-w-full h-[25px]'>
          <AiOutlineClose
            className='absolute right-6 text-2xl text-red-600 cursor-pointer'
            onClick={onClose}
          />
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-red-300 text-2xl' />
            <h2 className='my-1 '><b>{book.title}</b></h2>
          </div>
        </div>
        {/* Obsah */}
        <div>
          {/* Popis */}
          <div className='float-left w-[400px] mt-10'>
            <h4 className='my-2 text-gray-500'>{book._id}</h4>

            <div className='flex justify-start items-center gap-x-2'>
              <BiUserCircle className='text-red-300 text-2xl' />
              <h2 className='my-1'>{book.author}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
              <BiAward className='text-red-300 text-2xl' />
              <h2 className='my-1'>{book.genre}</h2>
            </div>
            <h2 className='my-1 w-fit px-4 py-1 bg-red-300 rounded-lg'>
              {book.publishYear}
            </h2>
            <div>
              <p className='mt-4'>Popis:</p>
              <p className='my-1 text-gray-500'>{book.description}</p>
            </div>
          </div>

          {/* Obrázek */}
          <div className='float-left mt-10 ms-10'>
            <img src={book.image} style={{ width: 300, height: 400 }} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookModal;
