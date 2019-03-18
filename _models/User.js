class User {
    constructor(dataUser) {
        this._name = dataUser.name;
        this._gender = dataUser.gender;
        this._birth = dataUser.birth;
        this._country = dataUser.country;
        this._email = dataUser.email;
        this._password = dataUser.password;
        this._photo = dataUser.photo;
        this._admin = dataUser.admin;
        this._register = new Date();
    }

    loadFromJSON(json) {
        for (let name in json) {
            switch(name) {
                case "_register":
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];
            }
        }
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get birth() {
        return this._birth;
    }

    set birth(birth) {
        this._birth = birth;
    }

    get country() {
        return this._country;
    }

    set country(country) {
        this._country = country;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    get photo() {
        return this._photo;
    }

    set photo(photo) {
        this._photo = photo;
    }

    get admin() {
        return this._admin;
    }

    set admin(admin) {
        this._admin = admin;
    }

    get register() {
        return this._register;
    }

    set register(register) {
        this._register = register;
    }
}