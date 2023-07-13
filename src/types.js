export const pageTypes = {
    Home: 'home',
    Tracker: 'tracker'
}

export class User {
    constructor(email='', displayName='') {
        this.email = email 
        this.displayName = displayName
    }
}