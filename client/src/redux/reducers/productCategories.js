// I have these limited product categories
// from this reducer I am providing all my product categories to my whole app
// these categories will be unchanged

const productCategories = [
  "Tech",
  "Toys",
  "Films and Cd's",
  "Car accessories",
  "Grocery",
  "Nonfood & Pharmacy",
  "Style & Fashion",
  "Sports Accessories",
  "Electrical technologies",
  "Cosmetics and Beauty",
  "Home and furniture",
  "Cloths and fabrics",
  "Books and Educational accessories",
  "Household appliances",
  "Toys and baby products",
  "DIY garden and pet",
];

const getProductCategories = (state = productCategories, action) => {
  return state;
};

export default getProductCategories;
