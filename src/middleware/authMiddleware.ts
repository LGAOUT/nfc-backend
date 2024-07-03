import passport from 'passport';
import '../services/JWT'; // Ensure the JWT strategy is registered with Passport

export const isAuthenticated = passport.authenticate('jwt', { session: false });
