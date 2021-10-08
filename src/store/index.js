import { createStore } from "vuex";
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
  } from 'amazon-cognito-identity-js'
  // import * as AWS from 'aws-sdk/global'
  
const poolData = {
    UserPoolId: process.env.VUE_APP_UserPoolId,//  process.env.VUE_APP_UserPoolId,
    ClientId: process.env.VUE_APP_ClientId // process.env.VUE_APP_ClientId
}
const userPool = new CognitoUserPool(poolData)
  let cognitoUser = null

export default createStore({
  state: {
    items: [],
    token: "",
    username: '',
    groups: [],
    erreur: '',
    user: null,
    confirmed: false
  },
  mutations: {
    user(state, user) {
        state.authorized =
          !!user && user.attributes && user.attributes.email_verified;
        state.user = user;
        if (user === null || user.attributes["custom:customerID"] === undefined) {
          state.customerID = "";
        } else {
          state.customerID = user.attributes["custom:customerID"];
        }
        if (user === null || user.attributes.email === undefined) {
          state.email = "";
        } else {
          state.email = user.attributes.email;
        }
      },
      FETCH_USER(state, session) {
        state.confirmed = true
        state.groups = session.getIdToken().payload['cognito:groups'] || []
        state.token = session.getIdToken().getJwtToken()
      },
      SET_USERNAME(state, username) {
        state.username = username;
      },
      SET_GROUPS(state, groups) {
        state.groups = groups;
      },
      SET_ERREUR(state, err) {
        state.erreur = err;
      },
      SIGNOUT(state) {
        state.token = ''
        state.groups = []
        state.erreur = ''
      },
  },
  actions: {
    async register({ commit }, { email, password }) {
        var attributeList = [];

        var dataEmail = {
            Name: 'email',
            Value: email,
        };

        var attributeEmail = new CognitoUserAttribute(dataEmail);

        attributeList.push(attributeEmail);

        userPool.signUp(email, password, attributeList, null, function(
            err,
            result
        ) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log(result.codeDeliveryDetails)
            console.log(result.userConfirmed)
            commit('SET_USERNAME', result.user.username)
            cognitoUser = result.user
        });
    },
    async confirmUser( { dispatch }, { email, password, code }) {
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
            dispatch('login', { email, password })
        });
    },
    async login({ commit, dispatch }, { email, password }) {
        const authenticationData = {
          Username: email,
          Password: password,
        }
        const authenticationDetails = new AuthenticationDetails(
          authenticationData,
        )
        const userData = {
          Username: email,
          Pool: userPool,
        }
        cognitoUser = new CognitoUser(userData)
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            commit('SET_USERNAME', cognitoUser.username)
            dispatch('retrieveUser')
          },
          onFailure: (err) => {
            commit('SET_ERREUR', JSON.stringify(err))
          },
        })
    },
    async retrieveUser({ commit, dispatch }) {
        cognitoUser = userPool.getCurrentUser();
        console.log(cognitoUser)
        if (cognitoUser != null) {
            commit('SET_USERNAME', cognitoUser.username)
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                commit('FETCH_USER', session)
        
                // NOTE: getSession must be called to authenticate user before calling getUserAttributes
                cognitoUser.getUserAttributes(function(err, attributes) {
                    if (err) {
                        console.log(err) // Handle error
                    } else {
                        console.log(attributes)// Do something with attributes
                    }
                });
                setTimeout(async () => {
                    console.log('Renewing Token')
                    await dispatch('retrieveUser')
                }, 1000 * (session.accessToken.payload.exp - Math.round(Date.now() / 1000)))
            });
        }
    },
    resendCode () {
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });
    },
    signout ({ commit }) {
        cognitoUser.signOut()
        commit('SIGNOUT')
    },
    forgot ({}, email) {
        const userData = {
            Username: email,
            Pool: userPool,
          }
        cognitoUser = new CognitoUser(userData)
        cognitoUser.forgotPassword({
            onSuccess: function(data) {
                // successfully initiated reset password request
                console.log('CodeDeliveryData from forgotPassword: ' + JSON.stringify(data));
                return data
            },
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            }
        });
    },
    resetPassword ({ dispatch }, { code, password, email}) {
        cognitoUser.confirmPassword(code, password, {
			onSuccess() {
				console.log('Password confirmed!');
                dispatch('login', { email, password })
			},
			onFailure(err) {
				console.log('Password not confirmed!');
			},
		});
    }
  },
});

