import React from 'react';
import { useState, useEffect, useRef } from 'react';

// Styles
import styles from "./styles.css";

interface ProductFeatureProps {
  // children: ReactChildren
}

const ProductFeature: StorefrontFunctionComponent<ProductFeatureProps> = ({ }) => {
  const [allPhotos, setAllPhotos] = useState<Array<string>>([""]);
  const [allTitles, setAllTitles] = useState<Array<string>>([""]);
  const [allDescriptions, setAllDescriptions] = useState<Array<string>>([""]);
  const [active, setActive] = useState<number>(0);
  const [appActive, setAppActive] = useState<Boolean>(false);

  const containerRef: any = useRef(null);
  const sliderRef: any = useRef(null);

  useEffect(() => {
    console.clear();

    // @ts-expect-error
    const tempPhotos: Array<any> = document.getElementsByClassName("vtex-flex-layout-0-x-flexCol--imageFeatureItems");

    // @ts-expect-error
    const tempText: Array<any> = document.getElementsByClassName("vtex-flex-layout-0-x-flexCol--textFeatureItems");

    setAppActive(tempText.length ? true : false);
    if (tempText.length === 0) return;

    let allPhotos: Array<any> = [];
    let allTitles: Array<any> = [];
    let allDescriptions: Array<any> = [];

    for (let i = 0; i < tempPhotos.length; i++) {
      const imgSrc = tempPhotos[i].firstChild.src;
      allPhotos[i] = imgSrc;

      const titleText = tempText[i].firstChild.innerText;
      allTitles[i] = titleText;

      const descriptionText = tempText[i].children[1].innerText || tempText[i].children[1].nextSibling;
      allDescriptions[i] = descriptionText;
    }

    for (let i = 0; i < allDescriptions.length; i++) {
      const nodeValue = allDescriptions[i].textContent;
      if (nodeValue) allDescriptions[i] = nodeValue;
    }

    setAllPhotos(allPhotos);
    setAllTitles(allTitles);
    setAllDescriptions(allDescriptions);

    handleNavHeight();

    // @ts-expect-error
    const hideFeatures: any = document.getElementsByClassName("eriksbikeshop-product-attribute-0-x-productAttributeWrapper--pdp-features")[0];
    hideFeatures.style.display = "none";

  })

  const handleNavClick = (e: any) => {
    const sliderWidth: number = containerRef.current.offsetWidth * allTitles.length;
    const featureWidth: number = sliderWidth / allTitles.length;
    const clicked = e.target.id.split("button-")[1];

    const slideTo: number = clicked * featureWidth;
    sliderRef.current.style.left = "-" + slideTo + "px";

    setActive(clicked);
  }

  const handleNavHeight = () => {
    if (appActive) {
      // @ts-expect-error
      const allNavButtons: Array = document.getElementsByClassName("eriksbikeshop-productfeature-1-x-navButton");

      for (let i = 0; i < allNavButtons.length; i++) {
        allNavButtons[i].style.height = "0.75rem";
        allNavButtons[i].style.backgroundColor = "black";
      }

      allNavButtons[active].style.height = "1.25rem";
      allNavButtons[active].style.backgroundColor = "#ee2d25";
    }
  }

  useEffect(() => {
    if (appActive) {
      handleNavHeight();
    }
  }, [active])

  if (appActive) {
    return (
      <>
        <h4 className="vtex-rich-text-0-x-heading vtex-rich-text-0-x-heading--accessories-title t-heading-4 vtex-rich-text-0-x-headingLevel4 vtex-rich-text-0-x-headingLevel4--accessories-title vtex-rich-text-0-x-heading-level-4">FEATURES</h4>
        <div className={styles.allFeaturesContainer}>
          <div ref={containerRef} className={styles.allFeaturesWrapper}>
            <div ref={sliderRef} className={styles.allFeaturesSlider}>
              {allTitles?.map((feature, index) => (
                <div key={"feature-" + index} id={"feature-" + index} className={styles.featureContainer}>
                  <div className={styles.imageContainer}>
                    <img src={allPhotos[index]} className={styles.featureImage} />
                  </div>
                  <div className={styles.textContainer}>
                    <div className={styles.titleContainer}>{feature}</div>
                    <div className={styles.descriptionContainer}><p className={styles.description}>{allDescriptions[index]}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.navContainer}>
            {allTitles?.map((button, index) => (
              <div key={button} id={"button-" + index} onClick={handleNavClick} className={styles.navButton}></div>
            ))}
          </div>
        </div>
      </>
    )
  } else {
    return (<></>)
  }
}

ProductFeature.schema = {
  title: 'editor.productfeature.title',
  description: 'editor.productfeature.description',
  type: 'object',
  properties: {

  }
}

export default ProductFeature;
