export const pageTypes = {
    Home: 'home',
    Tracker: 'tracker'
}

export const _docNameHistory = "history";
export const _docNameCurrent = "current";

export class User {
    constructor(email='', displayName='') {
        this.email = email 
        this.displayName = displayName
    }
}