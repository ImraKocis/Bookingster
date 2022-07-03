import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'native-base';
import PropTypes from 'prop-types';
import { ImageLoader } from 'react-native-image-fallback';
import noImage from './image.png';

function ImageWrapper({ width, height, imageSource }) {
  const [image, setImage] = useState(imageSource);

  return <ImageLoader alt="Image" style={{ width, height }} source={image} fallback={noImage} />;
}
ImageWrapper.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageSource: PropTypes.string.isRequired,
};
export default ImageWrapper;
