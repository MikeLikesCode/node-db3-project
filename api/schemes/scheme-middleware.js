const Scheme = require('./scheme-model');

const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.doesSchemeExist(req.params.scheme_id);
    if (!scheme) {
      res.status(404).json({ message: `scheme with scheme_id ${req.params.scheme_id} not found`})
    }
    else {
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
  if ( !req.body.scheme_name || req.body.scheme_name === '' || typeof req.body.scheme_name !== "string"){
    next({ message: "invalid scheme_name", status: 400})
  }
  else{
    next()
  }
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
  if (!req.body.instructions || typeof req.body.instructions !== 'string' || typeof req.body.step_number !== 'number' || req.body.step_number < 1 ){
    next({ message: "invalid step", status: 400})
  } else{
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
