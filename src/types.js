export const pageTypes = {
    Home: 'home',
    Tracker: 'tracker'
}

export class Workout {
  constructor(name) {
    this.name = name
    this.date = ''
    this.description = "Sample description describes the workout and any notes the user wants to include"
    this.exercises = []
  }
}

export class Exercise {
  constructor(name) {
    this.name = name
    this.sets = []
  }
}

export class Set {
  constructor(name) {
    this.name = name
    this.weight = null
    this.reps = null
  }
}

export class User {
    constructor(email='', displayName='') {
        this.email = email 
        this.displayName = displayName
    }
}