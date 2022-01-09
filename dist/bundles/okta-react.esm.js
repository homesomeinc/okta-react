/*!
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import * as React from 'react';
import { AuthSdkError } from '@okta/okta-auth-js';
import _defineProperty from '@babel/runtime/helpers/defineProperty';

var OktaContext = /*#__PURE__*/React.createContext(null);
var useOktaAuth = function useOktaAuth() {
  return React.useContext(OktaContext);
};

var OktaError = function OktaError(_ref) {
  var error = _ref.error;

  if (error.name && error.message) {
    return /*#__PURE__*/React.createElement("p", null, error.name, ": ", error.message);
  }

  return /*#__PURE__*/React.createElement("p", null, "Error: ", error.toString());
};

var Security = function Security(_ref) {
  var oktaAuth = _ref.oktaAuth,
      restoreOriginalUri = _ref.restoreOriginalUri,
      onAuthRequired = _ref.onAuthRequired,
      children = _ref.children;

  var _React$useState = React.useState(function () {
    if (!oktaAuth) {
      return null;
    }

    return oktaAuth.authStateManager.getAuthState();
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      authState = _React$useState2[0],
      setAuthState = _React$useState2[1];

  var _React$useState3 = React.useState(function () {
    if (!oktaAuth || !oktaAuth._oktaUserAgent) {
      return null;
    }

    var oktaAuthVersion = oktaAuth._oktaUserAgent.getVersion();

    var majorVersion = oktaAuthVersion === null || oktaAuthVersion === void 0 ? void 0 : oktaAuthVersion.split('.')[0];
    return majorVersion;
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 1),
      oktaAuthMajorVersion = _React$useState4[0];

  React.useEffect(function () {
    if (!oktaAuth || !restoreOriginalUri) {
      return;
    }

    if (oktaAuth.options.restoreOriginalUri && restoreOriginalUri) ;

    oktaAuth.options.restoreOriginalUri = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(oktaAuth, originalUri) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                restoreOriginalUri(oktaAuth, originalUri);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    if (oktaAuth._oktaUserAgent) {
      oktaAuth._oktaUserAgent.addEnvironment("@okta/okta-react".concat("/", "6.4.0"));
    } else {
      console.warn('_oktaUserAgent is not available on auth SDK instance. Please use okta-auth-js@^5.3.1 .');
    }

    var handler = function handler(authState) {
      setAuthState(authState);
    };

    oktaAuth.authStateManager.subscribe(handler);
    oktaAuth.start();
    return function () {
      oktaAuth.authStateManager.unsubscribe(handler);
      oktaAuth.stop();
    };
  }, [oktaAuth, restoreOriginalUri]);

  if (!oktaAuth) {
    var err = new AuthSdkError('No oktaAuth instance passed to Security Component.');
    return /*#__PURE__*/React.createElement(OktaError, {
      error: err
    });
  }

  if (!restoreOriginalUri) {
    var _err = new AuthSdkError('No restoreOriginalUri callback passed to Security Component.');

    return /*#__PURE__*/React.createElement(OktaError, {
      error: _err
    });
  }

  if (oktaAuthMajorVersion !== "5" && process.env.SKIP_VERSION_CHECK !== '1') {
    var _err2 = new AuthSdkError("Passed in oktaAuth is not compatible with the SDK, okta-auth-js version ".concat("5", ".x is the current supported version."));

    return /*#__PURE__*/React.createElement(OktaError, {
      error: _err2
    });
  }

  return /*#__PURE__*/React.createElement(OktaContext.Provider, {
    value: {
      oktaAuth: oktaAuth,
      authState: authState,
      _onAuthRequired: onAuthRequired
    }
  }, children);
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var withOktaAuth = function withOktaAuth(ComponentToWrap) {
  var WrappedComponent = function WrappedComponent(props) {
    var oktaAuthProps = useOktaAuth();
    return /*#__PURE__*/React.createElement(ComponentToWrap, _objectSpread(_objectSpread({}, oktaAuthProps), props));
  };

  WrappedComponent.displayName = 'withOktaAuth_' + (ComponentToWrap.displayName || ComponentToWrap.name);
  return WrappedComponent;
};

var LoginCallback = function LoginCallback(_ref) {
  var errorComponent = _ref.errorComponent,
      _ref$loadingElement = _ref.loadingElement,
      loadingElement = _ref$loadingElement === void 0 ? null : _ref$loadingElement,
      onAuthResume = _ref.onAuthResume;

  var _useOktaAuth = useOktaAuth(),
      oktaAuth = _useOktaAuth.oktaAuth,
      authState = _useOktaAuth.authState;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      callbackError = _React$useState2[0],
      setCallbackError = _React$useState2[1];

  var ErrorReporter = errorComponent || OktaError;
  React.useEffect(function () {
    var _a;

    if (onAuthResume && ((_a = oktaAuth.isInteractionRequired) === null || _a === void 0 ? void 0 : _a.call(oktaAuth))) {
      onAuthResume();
      return;
    }

    oktaAuth.handleLoginRedirect().then(function () {
      oktaAuth.start();
    })["catch"](function (e) {
      setCallbackError(e);
    });
  }, [oktaAuth]);
  var authError = authState === null || authState === void 0 ? void 0 : authState.error;
  var displayError = callbackError || authError;

  if (displayError) {
    return /*#__PURE__*/React.createElement(ErrorReporter, {
      error: displayError
    });
  }

  return loadingElement;
};

export { LoginCallback, OktaContext, Security, useOktaAuth, withOktaAuth };
//# sourceMappingURL=okta-react.esm.js.map
