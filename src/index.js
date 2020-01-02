import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './data';
import axios from 'axios'

function getContent(file, loading){
  if (file) {
    return (
      <React.Fragment>
        <img alt='uploadimg' className='file-image' src={URL.createObjectURL(file)} />
        <div className='response'>
          <div className="message">{<strong>{file.name}</strong>}</div>
          <progress className="progress" value={loading}></progress>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div key='start' className='start'>
        <div>Select a file or drag here*</div>
          <span className="btn">Select a file</span>
        </div>
      </React.Fragment>
    )
  }
}

class Upload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
      loading:0,
    }
  }
  handleDrag(e){
    e.stopPropagation();
    e.preventDefault();
    if (e.type === 'dragover') {
      this.setState({
        isDrag: true
      });
    } else {
      this.setState({
        isDrag: false
      });
    }
  }

  handleChange(e){
    e.stopPropagation();
    e.preventDefault();
    const file = (e.target.files || e.dataTransfer.files)[0];
    const isGood = (/\/(?=gif|jpg|png|jpeg)/gi).test(file.type);
  
    if (isGood) {
      this.setState({
          file: file,
          isDrag: false
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    //do something
    axios({
      method: 'post',
      url: '/postdata1',
      responseType: 'json',
    })
    .then(
        (response) => {
            this.setState({
              loading:1
            })  
        }
    )
    .catch(
        (error) => {
        }
    );
  }
  render(){
    const content = getContent(this.state.file, this.state.loading);
    return (
      <>
        <h3 className='title'>React Image Preview & Upload Component</h3>
        <form className='uploader'>
          <input id='file-upload' onChange={(e)=> this.handleChange(e)} type='file' accept='image/*'/>
            <label 
              htmlFor='file-upload' 
              className={(this.state.isDrag)?'hover': ''} 
              onDragOver={(e) => this.handleDrag(e)}
              onDragLeave={(e) => this.handleDrag(e)}
              onDrop={(e) =>{this.handleChange(e)}}
            >
              {content}
            </label>
            <input className='btn-submit' type='submit' value='Submit' onClick={(e) => this.handleSubmit(e)}/>
        </form>
        <a className="home" href='/'>HOME</a>
      </>
    );
  };
}

// ========================================
  
ReactDOM.render(
  <Upload />,
  document.getElementById('root')
);