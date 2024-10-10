export const generateJWTtokenRegister = (res,message,user) => {

    let token = user.JsonWebToken();


   return token;

}