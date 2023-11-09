const URL = {
  type: String,
  match: RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  ),
  trim: true,
  lowercase: true,
};

const DEFAULT_VALIDATION_OPTIONAL = {
  type: String,
  minLength: 2,
  maxLength: 256,
  trim: true,
  lowercase: true,
  default: "000",
};

const DEFAULT_VALIDATION = {
  ...DEFAULT_VALIDATION_OPTIONAL,
  required: true,
};

exports.URL = URL;
exports.DEFAULT_VALIDATION = DEFAULT_VALIDATION;
exports.DEFAULT_VALIDATION_OPTIONAL = DEFAULT_VALIDATION_OPTIONAL;
