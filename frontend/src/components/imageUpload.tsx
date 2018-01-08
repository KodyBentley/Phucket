import * as React from 'react';
import { render } from 'react-dom';
import * as Dropzone from 'react-dropzone';

class ImageUpload extends React.Component<{}, {}> {
  constructor(props: React.ReactPropTypes) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);

    this.state = {
      preview: null,
      name: {}
    };
  }

  handleDrop([{ preview, name }]: any) {
    this.setState({ preview });
    let myImg = new Image();
    myImg.src = preview;
    myImg.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = myImg.width;
      canvas.height = myImg.height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(myImg, 0, 0, myImg.width, myImg.height);
      let dataUrl = canvas.toDataURL();
      fetch('/img', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ img: dataUrl, name: name }),
        redirect: 'manual'
      })
        .then((res) => {
          return res.json();
        });
    };
    // location.reload();
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.handleDrop}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Uploaded files</h2>
        </aside>
      </section>
    );
  }
}

export default ImageUpload;