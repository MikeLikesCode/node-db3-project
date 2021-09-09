const Scheme = require('./scheme-model');

const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.scheme_id);
    if (!scheme) {
      next({ message: `scheme with scheme_id ${req.params.scheme_id} not found `, status: 404})
    }
    else {
      res.scheme = scheme
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
