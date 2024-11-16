import myImage from '../../../public/'
const Notfound = () => {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <img className="h-[50%] object-cover" src={myImage} alt="Not Found" />
      </div>
    );
  };
  
  export default Notfound;
  