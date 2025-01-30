import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    nameLang: { type: String, required: [true, "Language name is required"] },
    name: { type: String, required: [true, "Name is required"] },
    title: { type: String, required: [true, "Title is required"] },
    cart: { type: String, required: [true, "Cart label is required"] },
    cartEmpty: {
      type: String,
      required: [true, "Empty cart message is required"],
    },
    removee: {
      type: String,
      required: [true, "Remove button label is required"],
    },
    orderNow: {
      type: String,
      required: [true, "Order now button label is required"],
    },
    total: { type: String, required: [true, "Total price label is required"] },
    login: { type: String, required: [true, "Login button label is required"] },
    registerNow: {
      type: String,
      required: [true, "Register now button label is required"],
    },
    email: { type: String, required: [true, "Email label is required"] },
    password: { type: String, required: [true, "Password label is required"] },
    dontHaveAccount: {
      type: String,
      required: [true, "Don't have an account message is required"],
    },
    order: { type: String, required: [true, "Order label is required"] },
    price: { type: String, required: [true, "Price label is required"] },
    qty: { type: String, required: [true, "Quantity is required"] },
    shipping: { type: String, required: [true, "Shipping label is required"] },
    noOrder: {
      type: String,
      required: [true, "No orders message is required"],
    },
    orderDate: {
      type: String,
      required: [true, "Order date label is required"],
    },
    address: { type: String, required: [true, "Address label is required"] },
    phone: { type: String, required: [true, "Phone number is required"] },
    street: { type: String, required: [true, "Street label is required"] },
    zipCode: { type: String, required: [true, "ZIP code is required"] },
    city: { type: String, required: [true, "City label is required"] },
    state: { type: String, required: [true, "State label is required"] },
    country: { type: String, required: [true, "Country label is required"] },
    submit: {
      type: String,
      required: [true, "Submit button label is required"],
    },
    profile: { type: String, required: [true, "Profile label is required"] },
    personalInformation: {
      type: String,
      required: [true, "Personal information label is required"],
    },
    logout: {
      type: String,
      required: [true, "Logout button label is required"],
    },
    edit: { type: String, required: [true, "Edit button label is required"] },
    cancel: {
      type: String,
      required: [true, "Cancel button label is required"],
    },
    cp: { type: String, required: [true, "Change password label is required"] },
    savee: { type: String, required: [true, "Save button label is required"] },
    finish: {
      type: String,
      required: [true, "Finish button label is required"],
    },
    items: { type: String, required: [true, "Items label is required"] },
    orderSummary: {
      type: String,
      required: [true, "Order summary label is required"],
    },
    register: { type: String, required: [true, "Register label is required"] },
    goToCart: {
      type: String,
      required: [true, "Go to cart button label is required"],
    },
    addToCart: {
      type: String,
      required: [true, "Add to cart button label is required"],
    },
    man: { type: String, required: [true, "Man category label is required"] },
    woman: {
      type: String,
      required: [true, "Woman category label is required"],
    },
    boy: { type: String, required: [true, "Boy category label is required"] },
    girl: { type: String, required: [true, "Girl category label is required"] },
    baby: { type: String, required: [true, "Baby category label is required"] },
    pageNotFound: {
      type: String,
      required: [true, "Page not found message is required"],
    },
    goBack: {
      type: String,
      required: [true, "Go back button label is required"],
    },
    description: {
      type: String,
      required: [true, "Description label is required"],
    },
    color: { type: String, required: [true, "Color label is required"] },
    size: { type: String, required: [true, "Size label is required"] },
  },
  {
    timestamps: true,
  }
);

const Language =
  mongoose.models.Language || mongoose.model("Language", languageSchema);
export default Language;
