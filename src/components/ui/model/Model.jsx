import "./Model.css";
import ReactDOM from 'react-dom';

const Model = ({visible = false , children , closeModel}) => {
  return (
    <>
    {visible ? 
    ReactDOM.createPortal(
    <div onClick={closeModel} className="model-overlay">
      <div className="model" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
    
     , document.getElementById('model-root'))
    : ''}
    </>
  )
};

export default Model;
