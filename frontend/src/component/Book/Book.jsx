const Book = ({ book }) => {
  return (
    <>
      <div className="mt-10 mb-5 w-[250px] h-[500px] border text-center flex-column justify-center align-items-center rounded">
        <div className="w-full h-[60%] m-auto">
          <img src={book.Image} className="h-full w-full" alt="Course image" />
        </div>
        <div className="w-[80%] h-[60%] m-auto">
          <div className="flex-column">
            {/* <div className="rating-sect">
              <p>Veiw</p>
              <p>Rating</p>
            </div> */}
            <div className="text-xl font-bold pt-1 pb-1">
              <h3 className="course-name">{book.Name}</h3>
            </div>
            <div className="text-lg font-medium">
              <p className="faculty-name">{book.Author}</p>
            </div>
            <div className="price-sect">
              <p className="price">${book.Price}</p>
            </div>
          </div>
          <div className="mt-3">
            <button className="w-[60%] h-[35px] bg-red-400 p-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
