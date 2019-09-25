import AuthService from '../../../common/AuthService';

import Account from '../Account';
import AuthToken from './AuthToken';
import SignatureData from './SignatureData';
import PrepareMessage from './PrepareMessage';

import CountryRegions from './res/CountryRegions';
import PhoneCountryCodes from './res/PhoneCountryCodes';

export default class VerificationService extends AuthService {

  static routes = {
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
      prepare: '/v1/accounts/:account_id/change-email/prepare/:address',
    },
    missing: {
      get: '/v1/accounts/:account_id/upgrade/missing-fields',
      post: '/v1/accounts/:account_id/upgrade/missing-fields',
      prepare: '/v1/accounts/:account_id/upgrade/missing-fields/prepare/:address'
    },
    recover: {
      post: '/v1/accounts/recovery'
    }
  };

  static exports = {
    AuthToken,
    PHONE_COUNTRY_CODES: PhoneCountryCodes,
    COUNTRY_REGIONS: CountryRegions
  };

  /////////////////////////

  // ----------------------------------------------
  // Account Recovery

  getRecoverAccountSignatureMessage() {
    const timestamp = Date.now();
    const message = `Account Recovery on Dolomite. Code: ${timestamp}`;
    return { message, timestamp };
  }

  recoverAccount({ address, passwordHash, encryptedPrivateKey, encryptedMnemonic, timestamp, signature }) {
    return this.post('recover', {
      password_hash: passwordHash,
      wallet_address: address,
      encrypted_private_key: encryptedPrivateKey,
      encrypted_mnemonic: encryptedMnemonic,
      timestamp: timestamp,
      auth_signature: signature
    });
  }

  // ----------------------------------------------
  // Account Repair

  getMissingAccountInfo({ accountId }) {
    return this.requiresAuth.get('missing', { account_id: accountId })
      .then(body => body.data);
  }

  prepareRepairAccount({ address, accountId }) {
    return this.prepare('missing', { address, account_id: accountId })
      .then(body => new PrepareMessage(body.data));
  }

  repairAccount({ accountId, firstName, lastName, dateOfBirth, streetAddress, 
    secondaryStreetAddress, city, zip, stateCode, countryCode, ssn, plaidToken, 
    primaryImage, secondaryImage, proofOfAddress, flatSignature, prepareId, prepareMessage }) {

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
      prepare_id: prepareId,
      prepare_message: prepareMessage
    });
  }

  // ----------------------------------------------
  // Tier 2 Upgrade

  upgradeToTier2({ phoneNumber, extensionNumber, verificationCode, phoneVerificationSignature,
    streetAddress, secondaryStreetAddress, city, zip, stateCode, countryCode }) {

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
      country_code: countryCode,
    });
  }

  // ----------------------------------------------
  // Tier 3 Upgrade

  upgradeToTier3({ ssn }) {
    return this.requiresWyreSession('tier3').post('tier3', {
      social_security_number: ssn,
    });
  }

  linkExternalAccount(accountId, wyreSecret) {
    return this.requiresAuth.post('linkWyre', { account_id: accountId, wyre_secret_key: wyreSecret });
  }

  // ----------------------------------------------
  // Tier 4 Upgrade

  prepareUpgradeToTier4({ address, accountId }) {
    return this.prepare('tier4', { address, account_id: accountId })
      .then(body => new PrepareMessage(body.data));
  }

  /*
   * Unlike other routes that require a user signature, this one needs it "flattened",
   * as in not as { v, r, s } but as a single hexadecimal (0x...). This is because this
   * route uses multipart form data, and that does not support nested params
   */
  upgradeToTier4({ accountId, plaidToken, primaryImage, secondaryImage, flatSignature, prepareId, prepareMessage }) {
    return this.formDataRequest('post', 'tier4', {
      account_id: accountId,
      plaid_public_token: plaidToken,
      primary_identification_document: primaryImage,
      secondary_identification_document: secondaryImage,
      flattened_auth_signature: flatSignature,
      prepare_id: prepareId,
      prepare_message: prepareMessage
    });
  }

  // ----------------------------------------------
  // Phone Verification

  verifyPhoneNumber({ phoneNumber, extensionNumber }) {
    return this.post('verifyPhone', {
      phone_number: phoneNumber,
      extension_number: parseInt(extensionNumber)
    }).then((body) => body.data)
  }

  verifyPhoneNumberCode({ phoneNumber, extensionNumber, verificationCode }) {
    return this.post('verifyPhoneCode', {
      phone_number: phoneNumber,
      extension_number: parseInt(extensionNumber),
      code: verificationCode
    }).then(body => body.data);
  }

  // ----------------------------------------------
  // Change Email

  changeEmail(email) {
    return this.requiresWyreSession('changeEmail').post('changeEmail', { email });
  }

  // ----------------------------------------------
  // Resend Email

  resendVerificationEmail({ address, accountId }) {
    return this.requiresAuth.post('resendEmail', {
      wallet_address: address,
      account_id: accountId
    });
  }

}
