import { loginLogout } from './tests/login-logout.spec';

module.exports = {
  runPlaywrightTests: async function (context: any, events: any, done: any, test: any) {
    const startTime = Date.now();
    const { step } = test;

    try {
      await step(
        'Login and logout', 
        async () => {
          await loginLogout();
        }
      );
      
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Log custom metrics
      events.emit('counter', `user.${context.scenario}`, 1);
      events.emit('counter', 'playwright_test_success', 1);
      events.emit('histogram', 'playwright_test_duration', duration);
    } catch (error) {
      console.error(`Test error: ${error}`);
      events.emit('counter', 'playwright_test_failure', 1);
      return done(error);
    }

    done();
  }
};

/*

const { loginLogout } = require('./tests/login-logout.spec');

module.exports = {
  runPlaywrightTests: async function (context, events, done, test) {
    const startTime = Date.now();
    const { step } = test;

    try {
      await step(
        'Login and logout', 
        async () => {
          await loginLogout();
        }
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Log custom metrics
      events.emit('counter', `user.${context.scenario}`, 1);
      events.emit('counter', 'playwright_test_success', 1);
      events.emit('histogram', 'playwright_test_duration', duration);
    } catch (error) {
      console.error(`Test error: ${error}`);
      events.emit('counter', 'playwright_test_failure', 1);
      return done(error);
    }

    done();
  }
};
*/