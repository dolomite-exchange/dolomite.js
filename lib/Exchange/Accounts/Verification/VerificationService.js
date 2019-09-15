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
    key: "getRecoverAccountSignatureMessage",
    /////////////////////////
    // ----------------------------------------------
    // Account Recovery
    value: function getRecoverAccountSignatureMessage() {
      var timestamp = Date.now();
      var message = "Account Recovery on Dolomite. Code: ".concat(timestamp);
      return {
        message: message,
        timestamp: timestamp
      };
    }
  }, {
    key: "recoverAccount",
    value: function recoverAccount(_ref) {
      var address = _ref.address,
          passwordHash = _ref.passwordHash,
          encryptedPrivateKey = _ref.encryptedPrivateKey,
          encryptedMnemonic = _ref.encryptedMnemonic,
          timestamp = _ref.timestamp,
          signature = _ref.signature;
      return this.post('recover', {
        password_hash: passwordHash,
        wallet_address: address,
        encrypted_private_key: encryptedPrivateKey,
        encrypted_mnemonic: encryptedMnemonic,
        timestamp: timestamp,
        auth_signature: signature
      });
    } // ----------------------------------------------
    // Account Repair

  }, {
    key: "getMissingAccountInfo",
    value: function getMissingAccountInfo(_ref2) {
      var accountId = _ref2.accountId;
      return this.requiresAuth.get('missing', {
        account_id: accountId
      }).then(function (body) {
        return body.data;
      });
    }
  }, {
    key: "prepareRepairAccount",
    value: function prepareRepairAccount(_ref3) {
      var address = _ref3.address,
          accountId = _ref3.accountId;
      return this.prepare('missing', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "repairAccount",
    value: function repairAccount(_ref4) {
      var accountId = _ref4.accountId,
          firstName = _ref4.firstName,
          lastName = _ref4.lastName,
          dateOfBirth = _ref4.dateOfBirth,
          streetAddress = _ref4.streetAddress,
          secondaryStreetAddress = _ref4.secondaryStreetAddress,
          city = _ref4.city,
          zip = _ref4.zip,
          stateCode = _ref4.stateCode,
          countryCode = _ref4.countryCode,
          ssn = _ref4.ssn,
          plaidToken = _ref4.plaidToken,
          primaryImage = _ref4.primaryImage,
          secondaryImage = _ref4.secondaryImage,
          proofOfAddress = _ref4.proofOfAddress,
          flatSignature = _ref4.flatSignature,
          prepareId = _ref4.prepareId;
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
    key: "upgradeToTier2",
    value: function upgradeToTier2(_ref5) {
      var phoneNumber = _ref5.phoneNumber,
          extensionNumber = _ref5.extensionNumber,
          verificationCode = _ref5.verificationCode,
          phoneVerificationSignature = _ref5.phoneVerificationSignature,
          streetAddress = _ref5.streetAddress,
          secondaryStreetAddress = _ref5.secondaryStreetAddress,
          city = _ref5.city,
          zip = _ref5.zip,
          stateCode = _ref5.stateCode,
          countryCode = _ref5.countryCode;
      return this.requiresWyreSession('tier2').post('tier2', {
        phone_verification_signature: phoneVerificationSignature,
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber),
        phone_code: verificationCode,
        primary_street_address: streetAddress,
        secondary_street_address: secondaryStreetAddress,
        city: city,
        state_code: stateCode,
        postal_code: zip,
        country_code: countryCode
      });
    } // ----------------------------------------------
    // Tier 3 Upgrade

  }, {
    key: "upgradeToTier3",
    value: function upgradeToTier3(_ref6) {
      var ssn = _ref6.ssn;
      return this.requiresWyreSession('tier3').post('tier3', {
        social_security_number: ssn
      });
    }
  }, {
    key: "linkExternalAccount",
    value: function linkExternalAccount(wyreSecret) {
      return this.requiresAuth.post('linkWyre', {
        wyre_secret_key: wyreSecret
      });
    } // ----------------------------------------------
    // Tier 4 Upgrade

  }, {
    key: "prepareUpgradeToTier4",
    value: function prepareUpgradeToTier4(_ref7) {
      var address = _ref7.address,
          accountId = _ref7.accountId;
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
    value: function upgradeToTier4(_ref8) {
      var accountId = _ref8.accountId,
          plaidToken = _ref8.plaidToken,
          primaryImage = _ref8.primaryImage,
          secondaryImage = _ref8.secondaryImage,
          flatSignature = _ref8.flatSignature,
          prepareId = _ref8.prepareId;
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
    value: function verifyPhoneNumber(_ref9) {
      var phoneNumber = _ref9.phoneNumber,
          extensionNumber = _ref9.extensionNumber;
      return this.post('verifyPhone', {
        phone_number: phoneNumber,
        extension_number: parseInt(extensionNumber)
      }).then(function (body) {
        return body.data;
      });
    }
  }, {
    key: "verifyPhoneNumberCode",
    value: function verifyPhoneNumberCode(_ref10) {
      var phoneNumber = _ref10.phoneNumber,
          extensionNumber = _ref10.extensionNumber,
          verificationCode = _ref10.verificationCode;
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
    key: "changeEmail",
    value: function changeEmail(email) {
      return this.requiresWyreSession('changeEmail').post('changeEmail', {
        email: email
      });
    } // ----------------------------------------------
    // Resend Email

  }, {
    key: "resendVerificationEmail",
    value: function resendVerificationEmail(_ref11) {
      var address = _ref11.address,
          accountId = _ref11.accountId;
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
  linkWyre: {
    post: '/v1/accounts/:account_id/upgrade/wyre-external/submit'
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
  },
  recover: {
    post: '/v1/accounts/recovery'
  }
});

_defineProperty(VerificationService, "exports", {
  AuthToken: _AuthToken["default"],
  PHONE_COUNTRY_CODES: _PhoneCountryCodes["default"],
  COUNTRY_REGIONS: _CountryRegions["default"]
});