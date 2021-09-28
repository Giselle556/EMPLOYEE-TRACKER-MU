class Employee {
    constructor(firstname, lastname, role, manager) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.manager = manager;
    }

    getFirstname() {
        return this.firstname;
    }

    getLastname() {
        return this.lastname;
    }

    getROle() {
        return this.role;
    }

    getManager(){
        return this.manager
    }
}

module.exports = Employee;