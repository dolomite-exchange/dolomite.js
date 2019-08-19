"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthService2 = _interopRequireDefault(require("../../../common/AuthService"));

var _Account = _interopRequireDefault(require("../Account"));

var _AuthToken = _interopRequireDefault(require("./AuthToken"));

var _SignatureData = _interopRequireDefault(require("./SignatureData"));

var _PrepareMessage = _interopRequireDefault(require("./PrepareMessage"));

var _CountryRegions = _interopRequireDefault(require("./res/CountryRegions"));

var _PhoneCountryCodes = _interopRequireDefault(require("./res/PhoneCountryCodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VerificationService =
/*#__PURE__*/
function (_AuthService) {
  _inherits(VerificationService, _AuthService);

  function VerificationService() {
    _classCallCheck(this, VerificationService);

    return _possibleConstructorReturn(this, _getPrototypeOf(VerificationService).apply(this, arguments));
  }

  _createClass(VerificationService, [{
    key: "getMissingAccountInfo",
    /////////////////////////
    // ----------------------------------------------
    // Account Repair
    value: function getMissingAccountInfo(_ref) {
      var accountId = _ref.accountId;
      return this.requiresAuth.get('missing', {
        account_id: accountId
      }).then(function (body) {
        return body.data;
      });
    }
  }, {
    key: "prepareRepairAccount",
    value: function prepareRepairAccount(_ref2) {
      var address = _ref2.address,
          accountId = _ref2.accountId;
      return this.prepare('missing', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "repairAccount",
    value: function repairAccount(_ref3) {
      var accountId = _ref3.accountId,
          firstName = _ref3.firstName,
          lastName = _ref3.lastName,
          dateOfBirth = _ref3.dateOfBirth,
          streetAddress = _ref3.streetAddress,
          secondaryStreetAddress = _ref3.secondaryStreetAddress,
          city = _ref3.city,
          zip = _ref3.zip,
          stateCode = _ref3.stateCode,
          countryCode = _ref3.countryCode,
          ssn = _ref3.ssn,
          plaidToken = _ref3.plaidToken,
          primaryImage = _ref3.primaryImage,
          secondaryImage = _ref3.secondaryImage,
          proofOfAddress = _ref3.proofOfAddress,
          flatSignature = _ref3.flatSignature,
          prepareId = _ref3.prepareId;
      return this.formDataRequest('post', 'missing', {
        account_id: accountId,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        primary_street_address: streetAddress,
        secondary_street_address: secondaryStreetAddress,
        city: city,
        state_code: zip,
        postal_code: stateCode,
        country_code: countryCode,
        social_security_number: ssn,
        plaid_public_token: plaidToken,
        primary_identification_document: primaryImage,
        secondary_identification_document: secondaryImage,
        proof_of_address_document: proofOfAddress,
        flattened_auth_signature: flatSignature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Tier 2 Upgrade

  }, {
    key: "prepareUpgradeToTier2",
    value: function prepareUpgradeToTier2(_ref4) {
      var address = _ref4.address,
          accountId = _ref4.accountId;
      return this.prepare('tier2', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "upgradeToTier2",
    value: function upgradeToTier2(_ref5) {
      var accountId = _ref5.accountId,
          phoneNumber = _ref5.phoneNumber,
          extensionNumber = _ref5.extensionNumber,
          verificationCode = _ref5.verificationCode,
          phoneVerificationSignature = _ref5.phoneVerificationSignature,
          streetAddress = _ref5.streetAddress,
          secondaryStreetAddress = _ref5.secondaryStreetAddress,
          city = _ref5.city,
          zip = _ref5.zip,
          stateCode = _ref5.stateCode,
          countryCode = _ref5.countryCode,
          signature = _ref5.signature,
          prepareId = _ref5.prepareId;
      return this.post('tier2', {
        account_id: accountId,
        phone_verification_signature: phoneVerificationSignature,
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber),
        phone_code: verificationCode,
        primary_street_address: streetAddress,
        secondary_street_address: secondaryStreetAddress,
        city: city,
        state_code: stateCode,
        postal_code: zip,
        country_code: countryCode,
        auth_signature: signature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Tier 3 Upgrade

  }, {
    key: "prepareUpgradeToTier3",
    value: function prepareUpgradeToTier3(_ref6) {
      var address = _ref6.address,
          accountId = _ref6.accountId;
      return this.prepare('tier3', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "upgradeToTier3",
    value: function upgradeToTier3(_ref7) {
      var accountId = _ref7.accountId,
          ssn = _ref7.ssn,
          signature = _ref7.signature,
          prepareId = _ref7.prepareId;
      return this.post('tier3', {
        account_id: accountId,
        social_security_number: ssn,
        auth_signature: signature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Tier 3 Upgrade

  }, {
    key: "prepareUpgradeToTier4",
    value: function prepareUpgradeToTier4(_ref8) {
      var address = _ref8.address,
          accountId = _ref8.accountId;
      return this.prepare('tier4', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
    /*
     * Unlike other routes that require a user signature, this one needs it "flattened",
     * as in not as { v, r, s } but as a single hexadecimal (0x...). This is because this
     * route uses multipart form data, and that does not support nested params
     */

  }, {
    key: "upgradeToTier4",
    value: function upgradeToTier4(_ref9) {
      var accountId = _ref9.accountId,
          plaidToken = _ref9.plaidToken,
          primaryImage = _ref9.primaryImage,
          secondaryImage = _ref9.secondaryImage,
          flatSignature = _ref9.flatSignature,
          prepareId = _ref9.prepareId;
      return this.formDataRequest('post', 'tier4', {
        account_id: accountId,
        plaid_public_token: plaidToken,
        primary_identification_document: primaryImage,
        secondary_identification_document: secondaryImage,
        flattened_auth_signature: flatSignature,
        prepare_id: prepareId
      });
    } // ----------------------------------------------
    // Phone Verification

  }, {
    key: "verifyPhoneNumber",
    value: function verifyPhoneNumber(_ref10) {
      var phoneNumber = _ref10.phoneNumber,
          extensionNumber = _ref10.extensionNumber;
      return this.post('verifyPhone', {
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber)
      }).then(function (body) {
        return body.data;
      });
    }
  }, {
    key: "verifyPhoneNumberCode",
    value: function verifyPhoneNumberCode(_ref11) {
      var phoneNumber = _ref11.phoneNumber,
          extensionNumber = _ref11.extensionNumber,
          verificationCode = _ref11.verificationCode;
      return this.post('verifyPhoneCode', {
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber),
        code: verificationCode
      }).then(function (body) {
        return body.data;
      });
    } // ----------------------------------------------
    // Change Email

  }, {
    key: "prepareChangeEmail",
    value: function prepareChangeEmail(_ref12) {
      var address = _ref12.address,
          accountId = _ref12.accountId;
      return this.prepare('changeEmail', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "changeEmail",
    value: function changeEmail(_ref13) {
      var address = _ref13.address,
          accountId = _ref13.accountId,
          email = _ref13.email,
          signature = _ref13.signature,
          prepareId = _ref13.prepareId;
      return this.post('changeEmail', {
        account_id: accountId,
        email: email,
        auth_signature: signature,
        prepare_id: prepareId,
        // TODO: remove these when backend fixes this route to remove
        // deprecated required fields
        wallet_address: '0x0000000000000000000000000000000000000000',
        timestamp: Date.now()
      });
    } // ----------------------------------------------
    // Resend Email

  }, {
    key: "resendVerificationEmail",
    value: function resendVerificationEmail(_ref14) {
      var address = _ref14.address,
          accountId = _ref14.accountId;
      return this.requiresAuth.post('resendEmail', {
        wallet_address: address,
        account_id: accountId
      });
    }
  }]);

  return VerificationService;
}(_AuthService2["default"]);

exports["default"] = VerificationService;

_defineProperty(VerificationService, "routes", {
  verifyPhone: {
    post: '/v1/accounts/verify-phone'
  },
  verifyPhoneCode: {
    post: '/v1/accounts/verify-phone/:code'
  },
  tier2: {
    post: '/v1/accounts/:account_id/upgrade/tier2',
    prepare: '/v1/accounts/:account_id/upgrade/tier2/prepare/:address'
  },
  tier3: {
    post: '/v1/accounts/:account_id/upgrade/tier3',
    prepare: '/v1/accounts/:account_id/upgrade/tier3/prepare/:address'
  },
  tier4: {
    post: '/v1/accounts/:account_id/upgrade/tier4',
    prepare: '/v1/accounts/:account_id/upgrade/tier4/prepare/:address'
  },
  resendEmail: {
    post: '/v1/accounts/:account_id/verify-email/resend'
  },
  changeEmail: {
    post: '/v1/accounts/:account_id/change-email',
    prepare: '/v1/accounts/:account_id/change-email/prepare/:address'
  },
  missing: {
    get: '/v1/accounts/:account_id/upgrade/missing-fields',
    post: '/v1/accounts/:account_id/upgrade/missing-fields',
    prepare: '/v1/accounts/:account_id/upgrade/missing-fields/prepare/:address'
  }
});

_defineProperty(VerificationService, "exports", {
  AuthToken: _AuthToken["default"],
  PHONE_COUNTRY_CODES: _PhoneCountryCodes["default"],
  COUNTRY_REGIONS: _CountryRegions["default"]
});