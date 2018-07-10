import React, { Component } from 'react'
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import Dialog from '@material-ui/core/Dialog';
import Close from '@material-ui/icons/Close';

class ImagesResults extends Component {
  state = {
    open: false,
    currentImg: ''
  };

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

   render() {
    let imageListContent;
    const { images } = this.props;

    if(images) {
      imageListContent = (
        <div>
          <GridList cols={3}>
            {images.map(img => (
              <GridTile key={img.id}>
                <img src={img.largeImageURL} alt=''/>
                <GridListTileBar
                  title={img.tags}
                  subtitle={
                    <span>
                      by <strong>{img.user}</strong>
                    </span>
                }
                  actionIcon={
                    <IconButton style={{ color: '#FFF' }} onClick={() => this.handleOpen(img.largeImageURL)}>
                      <ZoomIn  />
                    </IconButton>
                  } 
                />
              </GridTile>
            ))}
          </GridList>
        </div>
      );
    } else {
        imageListContent = null;
    }

    return (
      <div>
        {imageListContent}
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <IconButton style={{ position: 'absolute', color: '#FFF' }} primary={true} onClick={this.handleClose}>
            <Close />
          </IconButton>
          <img src={this.state.currentImg} alt='' style={{ width: '100%'}} />
        </Dialog>
      </div>
    );
 }
}

ImagesResults.PropTypes = {
    images: PropTypes.array.isRequired
}

export default ImagesResults;