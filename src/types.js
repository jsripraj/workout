export const pageTypes = {
    Home: 'home',
    Tracker: 'tracker',
    History: 'history',
}

export const _docNameHistory = "history";

export const _docNameCurrent = "current";

export const _startYear = 2000;

export const _months = {
    January: 0,
    February: 1,
    March: 2, 
    April: 3, 
    May: 4, 
    June: 5, 
    July: 6, 
    August: 7, 
    September: 8, 
    October: 9, 
    November: 10, 
    December: 11
  };

export class User {
    constructor(email='', displayName='') {
        this.email = email 
        this.displayName = displayName
    }
}