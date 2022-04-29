import React, { ReactChildren } from 'react';
import { useState, useEffect, useRef, CSSProperties } from 'react';

// Styles
import styles from "./styles.css";

interface ProductFeatureProps {
  children: ReactChildren
}

const ProductFeature: StorefrontFunctionComponent<ProductFeatureProps> = ({ children }) => {

  return (
    <div>{children}</div>
  )
}

ProductFeature.schema = {
  title: 'editor.productfeature.title',
  description: 'editor.productfeature.description',
  type: 'object',
  properties: {

  }
}

export default ProductFeature;
