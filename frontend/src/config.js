/**
 * rasa-admin frontend config
 * @module config
 */
 const NODE_ENV = process.env.NODE_ENV || 'development';
 const IS_PROD = NODE_ENV === 'production';
 
 const
    API_URL = IS_PROD ? 'http://host.docker.internal:5000' : 'http://localhost:5000'
 
 export {
    API_URL
 }
