import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

import { useSelector } from "react-redux";

// icons
import DoneIcon from "@material-ui/icons/Done";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// hooks
import useProductCanBeShipped from "../../hooks/useProductCanBeShipped";

// components
import AuthorActions from "./Product_Actions/AuthorActions";
import UserActions from "./Product_Actions/UserActions";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import ReviewSection from "./ReviewSection";

SwiperCore.use([Navigation, Thumbs]);

const ProductInfo = () => {
  const product = useSelector((state) => state.singleProductReducer);
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const { canBeShipped, shippingCharge, shippingCountry } =
    useProductCanBeShipped(product);

  const thumbsSwiper = null;

  return (
    <div className="product_info">
      {/* the image slider at the top */}
      <div className="product_image_slider">
        <Swiper
          style={{
            "--swiper-navigation-color": "#7976fc",
            "--swiper-pagination-color": "#7976fc",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {product.images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={image.photoUrl} al={product.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* actions and desc container */}
      <div className="product_actions_and_desc">
        {/* desc */}
        <div className="product_desc">
          <h2>{product.title}</h2>
          <p className="desc">
            <span>Description:</span> {product.desc}
          </p>
          <p className="price">
            Price: <span>{product.price} $</span>
          </p>
        </div>

        {/* actions */}
        <div className="product_actions">
          <div className="some_info_before_action">
            {/* showing up some availability informations */}
            <div className="productAvailability">
              <p>
                {canBeShipped ? (
                  <span className="available">Available is your country!</span>
                ) : (
                  <span className="unavailable">
                    Unavailable in your country
                  </span>
                )}
              </p>
              <p>
                {product.max_quantity > 0 ? (
                  <span className="available">
                    <DoneIcon />
                    In Stock
                  </span>
                ) : (
                  <span className="unavailable">
                    <ReportProblemOutlinedIcon /> Out of stock
                  </span>
                )}
              </p>
            </div>
            <div className="charges">
              <p>
                Shipping Charge: <span>{shippingCharge}</span>
              </p>
              {isAuthenticated && (
                <p>
                  Shipping country: <span>{shippingCountry}</span>
                </p>
              )}
            </div>
            <div className="rating">
              <p>
                Rating:{" "}
                <span>
                  {!product.averageRating ? "N/A" : product.averageRating}{" "}
                  <StarBorderIcon />
                </span>
              </p>
            </div>
          </div>

          {/* the author and user wil have different options */}
          <div className="actions_wrapper">
            {user._id === product.user._id ? (
              // options for the author
              <AuthorActions />
            ) : (
              // options for the buyers
              <UserActions />
            )}
          </div>
        </div>
      </div>

      {/* the review section */}
      <ReviewSection />
    </div>
  );
};

export default ProductInfo;
