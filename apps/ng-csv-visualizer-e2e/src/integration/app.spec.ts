import { getGreeting } from '../support/app.po';

describe('ng-csv-visualizer', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ng-csv-visualizer!');
  });
});
